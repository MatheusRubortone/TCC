import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Evento } from 'src/app/models/event';
import { EventService } from 'src/app/services/event_service/event.service';
import { UtilService } from 'src/app/services/util_service/util.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {

  events: Evento[];

  @ViewChild('slides') slider: IonSlides;

  segment = 0;

  constructor(private eventService: EventService,
              private utilService: UtilService) { }

  ngOnInit() {
    this.events = this.eventService.mockEvents();
    this.events.forEach(element => {
      element.dataEvento = this.utilService.montarDataExtenso(element.dataEvento);
    });
  }

  async segmentChanged() {
    await this.slider.slideTo(this.segment);
  }

  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
  }

  goToEventReg(){

  }

}