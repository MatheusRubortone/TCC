import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { EventService } from 'src/app/services/event_service/event.service';
import { UserService } from 'src/app/services/user_service/user.service';
import { AlertService } from 'src/app/services/alert_service/alert.service';
import { LoadingService } from 'src/app/services/loading_service/loading.service';
import { NavController, AlertController } from '@ionic/angular';
import { CreateEventPage } from '../create-event/create-event.page';
import { ActivatedRoute, Router } from '@angular/router';
import { Evento } from 'src/app/models/event';
import { DataService } from 'src/app/services/data_service/data.service';
import { UtilService } from 'src/app/services/util_service/util.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.page.html',
  styleUrls: ['./edit-event.page.scss'],
})
export class EditEventPage implements OnInit {

  evento: Evento;

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
  dtInicio;
  dtFim;

  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private userSvc: UserService,
    private alertSvc: AlertService,
    private loadSvc: LoadingService,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    public alertController: AlertController,
    private dataService: DataService,
    private router: Router,
    private utilService: UtilService
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
    if (this.route.snapshot.data['special']) {
      this.evento = this.route.snapshot.data['special'];
    }

    this.dtInicio = this.evento.startDate;
    this.dtFim = this.evento.endDate;
  }

  ngAfterViewInit() {
    this.formGroup.get("eventName").setValue(this.evento.title);
    this.formGroup.get("eventCep").setValue(this.evento.cep);
    this.formGroup.get("eventAddress").setValue(this.evento.address.split(",")[0]);
    this.formGroup.get("eventAddNumber").setValue(this.evento.address.split(",")[1]);
    this.formGroup.get("eventCity").setValue(this.evento.address.split(",")[3]);
    this.formGroup.get("eventUf").setValue(this.evento.address.split(",")[4]);
    this.formGroup.get("eventNbhd").setValue(this.evento.address.split(",")[2]);
    this.formGroup.get("eventDesc").setValue(this.evento.description);
    this.formGroup.get("eventPlace").setValue(this.evento.place);
  }

  async getEndereco(ev) {
    if (this.formGroup.get("eventCep").valid) {
      let cep = ev.target.value;
      await this.eventService.getEnderecoPorCep(cep).subscribe((res) => {
        this.popularEndereco(res);
      });
    }
  }

  async getEnderecoManualEEditar(cep, form: NgForm) {
    if (this.formGroup.get("eventCep").valid) {
      await this.eventService.getEnderecoPorCep(cep).subscribe((res) => {
        this.popularEndereco(res);
        this.editarEvento(form);
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

  compararDatas(start: string, end: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let startHour = new Date(group.controls[start].value);
      let endHour = new Date(group.controls[end].value);

      if (startHour >= endHour) {
        return {
          horaInvalida: true
        };
      }
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

  async excluirClick() {
    const alert = await this.alertController.create({
      header: 'Excluir Evento?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Excluir',
          handler: () => {
            this.eventService.excludeEvent(this.evento.id).subscribe(data => {
              this.alertSvc.presentToast("Evento excluído.");
              this.navCtrl.navigateBack("/tabs/events");
            });
          }
        }
      ]
    });

    await alert.present();
  }

  editarEvento(form: NgForm){
    var dtHrInicioFormat = this.formatDate(form.value.eventStartDate.toLocaleString());
    var dtHrFimFormat = this.formatDate(form.value.eventEndDate.toLocaleString());

    var evtAddress = this.formGroup.get("eventAddress").value + "," + this.formGroup.get("eventAddNumber").value + "," + this.formGroup.get("eventNbhd").value + "," + this.formGroup.get("eventCity").value + "," + this.formGroup.get("eventUf").value;

    this.eventService.editEvent(this.evento.id, form.value.eventName, this.userSvc.getUId(), form.value.eventDesc, dtHrInicioFormat, dtHrFimFormat, form.value.eventPlace, evtAddress, form.value.eventCep)
      .subscribe(data => {
        let response = data.json();
        if (response._codRetRequest == 1) {
          this.alertSvc.presentToast("Evento '" + form.value.eventName + "' atualizado com sucesso!");
          this.loadSvc.dismiss();
          this.navCtrl.back();
        }
        else this.alertSvc.presentToast("Erro na edição do evento. Tente novamente");
      });
  }

  async editarEventoClick(form: NgForm) {
    this.loadSvc.presentLoading();

    if(this.formGroup.get("eventCep").touched){
      await this.getEnderecoManualEEditar(this.formGroup.get("eventCep").value, form);
    }
    else 
    this.editarEvento(form);

  }

  formatDate(date: string){
    var dataHora: string[] = date.split("T");
    //2019-09-11T21:34:00-03:00
    if(dataHora.length > 1){
      var data = dataHora[0].split("-");
      var hora = dataHora[1].split(":");

      var horaFormat = data[2]+"/"+data[1]+"/"+data[0]+" "+hora[0]+":"+hora[1]+":00";

      return horaFormat;
    }
    else return date;
  }

}
