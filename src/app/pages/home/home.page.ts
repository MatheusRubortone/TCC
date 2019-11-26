import { Component, OnInit } from '@angular/core';
import { Router, Data } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Evento } from 'src/app/models/event';
import { EventService } from 'src/app/services/event_service/event.service';
import { UtilService } from 'src/app/services/util_service/util.service';
import { UserService } from 'src/app/services/user_service/user.service';
import { DataService } from 'src/app/services/data_service/data.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  events;
  dataFormatada: string;
  modoBusca: boolean;
  busca: string;
  resultadoBusca: Evento[] = [];
  loading: boolean;
  achouEventos: boolean;
  eventoAcontecendo = false;

  constructor(private router: Router,
    private eventService: EventService,
    private utilService: UtilService,
    private userService: UserService,
    private dataService: DataService,
    private navCtrl: NavController) {
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
    this.getEventoAcontecendo();
  }

  searchOnInput(ev: any) {
    console.log(ev.target.value);
    var busca = ev.target.value;

    if (busca != "") {
      this.modoBusca = true
      this.loading = true;
      this.resultadoBusca = [];
      this.pesquisarEventos(busca);
    }

    else this.modoBusca = false
  }

  pesquisarEventos(busca) {
    setTimeout(() => {
      this.resultadoBusca = [];
      this.eventService.searchEvent(busca).subscribe(data => {
        var resultado = data.json();
        resultado.forEach(element => {
          var ev = new Evento(element._idEvent,
            element._title,
            element._idOwner,
            element._description,
            element._startDate,
            element._endDate,
            element._place,
            element._address,
            element._cep,
            element._state,
            this.utilService);

          this.resultadoBusca.push(ev);
        });

        this.loading = false;
        this.achouEventos = this.resultadoBusca.length > 0 ? true : false;
      },
        error => {
          this.loading = false;
          this.achouEventos = this.resultadoBusca.length > 0 ? true : false;
        })
    },
      400);
  }

  eventOnClick(event) {
    this.navigateToEvent(event.id, event);
  }

  navigateToEvent(id, evento: Evento) {
    this.dataService.setData(id, evento);
    this.navCtrl.navigateRoot('/event-desc/' + id);
  }

  getEventoAcontecendo(){
    this.eventService.checkIsHappening(this.userService.getUId()).subscribe(
      data=>{
        var result = data.json();
        console.log(result);
        if(result == "TRUE") this.eventoAcontecendo = true;
      }
    )
  }

  async doRefresh(event) {
    setTimeout(() => {
      this.getEventoAcontecendo();
      event.target.complete();
    }, 500);
  }

  abrirListaPessoas(){
    this.router.navigateByUrl('find-people');
  }

}
