import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, NgForm } from '@angular/forms';
import { EventService } from 'src/app/services/event_service/event.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
})
export class CreateEventPage implements OnInit {

  formGroup: FormGroup;
  eventName: AbstractControl;
  eventDate: AbstractControl;
  eventStart: AbstractControl;
  eventEnd: AbstractControl;
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
    private eventService: EventService
  ) {

    this.formGroup = formBuilder.group({
      eventName: ['', Validators.required],
      eventDate: ['', Validators.required],
      eventStart: ['', Validators.required],
      eventEnd: ['', Validators.required],
      eventCep: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]{5}[\\d]{2}')
      ])],
      eventAddress: ['', Validators.required],
      eventAddNumber: ['', Validators.required],
      eventCity: ['', Validators.required],
      eventUf: ['', Validators.required],
      eventDesc: ['', Validators.required],
      eventNbhd: ['', Validators.required],
      eventPlace: ['', Validators.required]
    });

    this.eventName = this.formGroup.controls['eventName'];
    this.eventDate = this.formGroup.controls['eventDate'];
    this.eventStart = this.formGroup.controls['eventStart'];
    this.eventEnd = this.formGroup.controls['eventEnd'];
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
    alert(form.value.eventDesc);
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

}
