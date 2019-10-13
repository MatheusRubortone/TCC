import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, NavController } from '@ionic/angular';
import { Evento } from 'src/app/models/event';
import { EventService } from 'src/app/services/event_service/event.service';
import { UtilService } from 'src/app/services/util_service/util.service';
import { TabsService } from 'src/app/services/tabs_service/tabs.service';
import { UserService } from 'src/app/services/user_service/user.service';
import { DataService } from 'src/app/services/data_service/data.service';
import { Router } from '@angular/router';
import { utils } from 'protractor';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {

  confirmedEvents: Evento[];
  savedEvents: Evento[];
  createdEvents: Evento[];
  isLoading: Boolean = true;
  isOwnEvent: Boolean;
  isSavedEvent: Boolean;
  isConfirmedEvent: Boolean;

  @ViewChild('slides') slider: IonSlides;

  segment = this.tabsSvc.getSegment();

  constructor(private eventService: EventService,
    private utilService: UtilService,
    private tabsSvc: TabsService,
    private uSvc: UserService,
    private dataService: DataService,
    private router: Router,
    private navCtrl: NavController) {
    this.createdEvents = [];
    this.savedEvents = [];
    this.confirmedEvents = [];
  }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    if (await this.slider.getActiveIndex() == 0) {
      if (this.savedEvents.length == 0) this.getEventosSalvos();
    }
    else if (await this.slider.getActiveIndex() == 1) {
      if (this.confirmedEvents.length == 0) this.getEventosConfirmados();
    }
    else if (await this.slider.getActiveIndex() == 3) {
      if (this.createdEvents.length == 0) this.getEventosByOwner();
    }
  }

  async segmentChanged() {
    await this.slider.slideTo(this.segment);
    this.tabsSvc.setSegment(this.segment);
  }

  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
    this.tabsSvc.setSegment(await this.slider.getActiveIndex());

    if (await this.slider.getActiveIndex() == 0) {
      if (this.savedEvents.length == 0) this.getEventosSalvos();
    }
    else if (await this.slider.getActiveIndex() == 1) {
      if (this.savedEvents.length == 0) this.getEventosConfirmados();
    }
    else if (await this.slider.getActiveIndex() == 3) {
      if (this.createdEvents.length == 0) this.getEventosByOwner();
    }
  }

  eventOnClick(event) {
    this.navigateToEvent(event.id, event);
  }

  async getEventosByOwner() {
    this.isLoading = true;
    this.createdEvents = [];
    await this.eventService.getEventsByOwner(this.uSvc.getUId())
      .subscribe(data => {
        let results = data.json();
        console.log(results);
        console.log(results.status);
        if (results.status == 404) this.isOwnEvent = false;
        else {
          this.isOwnEvent = true;
          results.forEach(element => {
            this.createdEvents.push(
              new Evento(element._idEvent,
                element._title,
                element._idOwner,
                element._description,
                element._startDate,
                element._endDate,
                element._place,
                element._address,
                element._cep,
                element._state,
                this.utilService)
            )
          });
        }
      });
    this.isLoading = false;
  }

  async getEventosSalvos() {
    this.isLoading = true;
    this.savedEvents = [];
    await this.eventService.getFilteredEvents(this.uSvc.getUId(), "interesse").subscribe((data) => {
      console.log("data: " + data);
      let results = data.json();
      console.log(results);
      if (results.status == 404) this.isSavedEvent = false;
      else {
        this.isSavedEvent = true;
        results.forEach(element => {
          this.savedEvents.push(
            new Evento(element._idEvent,
              element._title,
              element._idOwner,
              element._description,
              element._startDate,
              element._endDate,
              element._place,
              element._address,
              element._cep,
              element._state,
              this.utilService
            )
          )
        });
      }
    });
    this.isLoading = false;
  }

  async getEventosConfirmados() {
    this.isLoading = true;
    this.confirmedEvents = [];
    await this.eventService.getFilteredEvents(this.uSvc.getUId(), "confirmado").subscribe((data) => {
      let results = data.json();
      console.log(results);
      console.log(results.status);
      if (results.status == 404) this.isConfirmedEvent = false;
      else {
        this.isConfirmedEvent = true;
        results.forEach(element => {
          this.confirmedEvents.push(
            new Evento(element._idEvent,
              element._title,
              element._idOwner,
              element._description,
              element._startDate,
              element._endDate,
              element._place,
              element._address,
              element._cep,
              element._state,
              this.utilService
            )
          )
        });
      }
    });
    this.isLoading = false;
  }


  navigateToEvent(id, evento: Evento) {
    this.dataService.setData(id, evento);
    this.navCtrl.navigateRoot('/event-desc/' + id);
  }

  async doRefresh(event) {
    if (await this.slider.getActiveIndex() == 0) {
      setTimeout(() => {
        this.getEventosSalvos();
        event.target.complete();
      }, 1000);
    }
    else if (await this.slider.getActiveIndex() == 1) {
      setTimeout(() => {
        this.getEventosConfirmados();
        event.target.complete();
      }, 1000);
    }
    else if (await this.slider.getActiveIndex() == 3) {
      setTimeout(() => {
        this.getEventosByOwner();
        event.target.complete();
      }, 1000);
    }
    else
      event.target.complete();
  }

  heartClick(evento: Evento) {
    evento.saved = !evento.saved;
    this.isSavedEvent = evento.saved;
    this.eventService.alterarSaveEvento(evento, "I");
  }

}