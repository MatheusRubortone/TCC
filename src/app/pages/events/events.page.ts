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
import { SolicitacaoEvento } from 'src/app/models/solicitacaoEvento';
import { AlertService } from 'src/app/services/alert_service/alert.service';

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
  convites: SolicitacaoEvento[] = [];

  @ViewChild('slides') slider: IonSlides;

  segment = this.tabsSvc.getSegment();

  constructor(private eventService: EventService,
    private utilService: UtilService,
    private tabsSvc: TabsService,
    private uSvc: UserService,
    private dataService: DataService,
    private router: Router,
    private navCtrl: NavController,
    private alertService: AlertService) {
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
    else if (await this.slider.getActiveIndex() == 2) {
      if (this.convites.length == 0) this.getConvitesPendentes();
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
      if (this.confirmedEvents.length == 0) this.getEventosConfirmados();
    }
    else if (await this.slider.getActiveIndex() == 2) {
      if (this.convites.length == 0) this.getConvitesPendentes();
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

  async getConvitesPendentes() {
    this.isLoading = true;
    this.convites = [];
    this.eventService.listPendingInvitations(this.uSvc.getUId()).subscribe(
      data => {
        var results = data.json();
        results.forEach(element => {
          this.convites.push(
            new SolicitacaoEvento(element._idPerson,
              element._Person,
              +this.uSvc.getUId(),
              element._idEvent,
              element._title,
              element._startDate,
              element._place,
              this.utilService)
          );
        });
        this.isLoading = false;
      }
    );
  }

  respondRequest(convite: SolicitacaoEvento, acao: string) {
    this.eventService.respondInvitation(this.uSvc.getUId(), convite.eventId, acao).subscribe(
      data => {
        if (acao == 'A')
          this.alertService.presentToast("Convite aceito!");
        else if (acao == 'R')
          this.alertService.presentToast("Convite recusado.");

        this.convites.splice(this.convites.indexOf(convite), 1);
      }
    );
  }

  navegarEventoConvite(idEvento) {
    console.log(idEvento +' | '+ this.uSvc.getUId());
    this.eventService.getEvent(idEvento, this.uSvc.getUId()).subscribe(
      data => {
        console.log(data.json());
        let retorno = data.json();
        var evento = new Evento(
          retorno._idEvent,
          retorno._title,
          retorno._idOwner,
          retorno._description,
          retorno._startDate,
          retorno._endDate,
          retorno._place,
          retorno._address,
          retorno._cep,
          retorno._state,
          this.utilService);

          this.navigateToEvent(evento.id, evento);
        } 
    );
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
    else if (await this.slider.getActiveIndex() == 2) {
      setTimeout(() => {
        this.getConvitesPendentes();
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

  openProfile(userId) {
    this.dataService.setData(userId, userId);
    this.router.navigateByUrl('user-profile/' + userId);
  }

}