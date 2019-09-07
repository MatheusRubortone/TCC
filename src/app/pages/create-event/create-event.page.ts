import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, NgForm } from '@angular/forms';
import { EventService } from 'src/app/services/event_service/event.service';
import { UserService } from 'src/app/services/user_service/user.service';
import { AlertService } from 'src/app/services/alert_service/alert.service';
import { LoadingService } from 'src/app/services/loading_service/loading.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
})
export class CreateEventPage implements OnInit {

  formGroup: FormGroup;
  eventName: AbstractControl;
  eventStartDate: AbstractControl;
  eventEndDate: AbstractControl;
  eventCep: AbstractControl;
  eventAddress: AbstractControl;
  eventAddNumber: AbstractControl;
  eventCity: AbstractControl;
  eventUf: AbstractControl;
  eventDesc: AbstractControl;
  eventNbhd: AbstractControl;
  eventPlace: AbstractControl;
  descLength: string = "";
  data: String;

  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private userSvc: UserService,
    private alertSvc: AlertService,
    private loadSvc: LoadingService,
    private navCtrl: NavController
  ) {

    this.formGroup = formBuilder.group({
      eventName: ['', Validators.required],
      eventEndDate: ['', Validators.required],
      eventStartDate: ['', Validators.required],
      eventCep: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]{6}[\\d]{2}')
      ])],
      eventAddress: ['', Validators.required],
      eventAddNumber: ['', Validators.required],
      eventCity: ['', Validators.required],
      eventUf: ['', Validators.required],
      eventDesc: ['', Validators.required],
      eventNbhd: ['', Validators.required],
      eventPlace: ['', Validators.required]
    }, { validator: this.compararDatas('eventStartDate', 'eventEndDate') });

    this.eventName = this.formGroup.controls['eventName'];
    this.eventStartDate = this.formGroup.controls['eventStartDate'];
    this.eventEndDate = this.formGroup.controls['eventEndDate'];
    this.eventCep = this.formGroup.controls['eventCep'];
    this.eventAddress = this.formGroup.controls['eventAddress'];
    this.eventAddNumber = this.formGroup.controls['eventAddNumber'];
    this.eventCity = this.formGroup.controls['eventCity'];
    this.eventUf = this.formGroup.controls['eventUf'];
    this.eventDesc = this.formGroup.controls['eventDesc'];
    this.eventNbhd = this.formGroup.controls['eventNbhd'];
    this.eventPlace = this.formGroup.controls['eventPlace'];

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    this.data = yyyy + '-' + mm + '-' + dd;
  }

  ngOnInit() {
  }

  createEvent(form: NgForm) {
    this.loadSvc.presentLoading();

    var dtInicioEvento: string = form.value.eventStartDate.toLocaleString().split("T");
    var dtFimEvento: string = form.value.eventEndDate.toLocaleString().split("T");

    var dtHrInicioFormat = dtInicioEvento[0] + " " + dtInicioEvento[1].substring(0, 5);
    var dtHrFimFormat = dtFimEvento[0] + " " + dtFimEvento[1].substring(0, 5);

    var evtAddress = form.value.eventAddress + "," + form.value.eventAddNumber + "," + form.value.eventNbhd + "," + form.value.eventCity + "," + form.value.eventUf;

    this.eventService.registerEvent(form.value.eventName, this.userSvc.getUId(), form.value.eventDesc, dtHrInicioFormat, dtHrFimFormat, form.value.eventPlace, evtAddress, form.value.eventCep)
      .subscribe(data => {
        console.log(data);
        let response = data.json();
        this.loadSvc.dismiss();
        if (response._codRetRequest == 1) {
          this.alertSvc.presentToast("Evento '" + form.value.eventName + "' criado com sucesso!");
          this.navCtrl.back();
        }
        else this.alertSvc.presentToast("Erro na criação do evento. Tente novamente");
      });
  }

  async getEndereco(ev) {
    if (this.formGroup.get("eventCep").valid) {
      let cep = ev.target.value;
      await this.eventService.getEnderecoPorCep(cep).subscribe((res) => {
        this.popularEndereco(res);
      });
    }
  }

  popularEndereco(res) {
    if (res != "erro") {
      this.formGroup.get("eventAddress").setValue(res.logradouro);
      this.formGroup.get("eventAddress").disable;

      this.formGroup.get("eventNbhd").setValue(res.bairro);
      this.formGroup.get("eventNbhd").disable;


      this.formGroup.get("eventCity").setValue(res.localidade);
      this.formGroup.get("eventCity").disable;


      this.formGroup.get("eventUf").setValue(res.uf);
      this.formGroup.get("eventUf").disable;
    }
    else {
      this.formGroup.get("eventAddress").enable;
      this.formGroup.get("eventNbhd").enable;
      this.formGroup.get("eventCity").enable;
      this.formGroup.get("eventCity").enable;
    }
  }

  public onKeyUp(event) {
    let newValue = event.target.value;
    let regExp = new RegExp('^[0-9?]+$');
    if (!regExp.test(newValue)) {
      event.target.value = newValue.slice(0, -1);
    }
  }

  goBack() {
    this.navCtrl.back();
  }

  compararDatas(start: string, end: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let startHour = group.controls[start];
      let endHour = group.controls[end];

      if (startHour.value >= endHour.value) {
        return {
          horaInvalida: true
        };
      }
    }
  }

}
