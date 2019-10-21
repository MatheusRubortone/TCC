import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Evento } from 'src/app/models/event';
import { EventService } from 'src/app/services/event_service/event.service';
import { UtilService } from 'src/app/services/util_service/util.service';
import { UserService } from 'src/app/services/user_service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  events;
  dataFormatada: string;

  constructor(private router: Router,
              private eventService: EventService,
              private utilService: UtilService,
              private userService: UserService) { 
                this.events = [{
                  starDateExtenso: "20 de Outubro de 2019, 12:42",
                  title: "Teste",
                  place: "Local Teste",
                  saved: false
                },
                {
                  starDateExtenso: "20 de Outubro de 2019, 12:42",
                  title: "Teste",
                  place: "Local Teste",
                  saved: false
                },
              ];
              }

  ngOnInit() {
    // this.events = this.eventService.mockEvents();
    // this.events.forEach(element => {
    //   element.dataEvento = this.utilService.montarDataExtenso(element.dataEvento);
    // console.log(this.userService.getUId());
    // });
  }



}
