import { Component, OnInit, ViewChild } from '@angular/core';
import { EnvService } from 'src/app/services/env_service/env.service';
import { EventService } from 'src/app/services/event_service/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Evento } from 'src/app/models/event';
import { UserService } from 'src/app/services/user_service/user.service';
import { DataService } from 'src/app/services/data_service/data.service';
import { UtilService } from 'src/app/services/util_service/util.service';
import { LoadingService } from 'src/app/services/loading_service/loading.service';
declare var google;

@Component({
  selector: 'app-event-desc',
  templateUrl: './event-desc.page.html',
  styleUrls: ['./event-desc.page.scss'],
})
export class EventDescPage implements OnInit {
  map;
  lat: number;
  long: number;
  isOwner = false;

  event: Evento;

  mesEvento;
  diaEvento;
  ruaEvento;
  numEvento;
  bairroEvento;
  cidadeEvento;
  estadoEvento;
  dtInicioFormatada;
  dtFimFormatada;

  @ViewChild('mapElement') mapElement;
  constructor(private envSvc: EnvService,
    private eventSvc: EventService,
    private route: ActivatedRoute,
    private router: Router,
    private uSvc: UserService,
    private dataService: DataService,
    private evSvc: EventService,
    private utilService: UtilService,
    private loadSvc: LoadingService) { }

  ngOnInit() {
    if (this.route.snapshot.data['special']) {
      this.event = this.route.snapshot.data['special'];
    }

    if (this.uSvc.getUId() == this.event.ownerId) this.isOwner = true;

    var end = this.event.address.split(",");
    this.ruaEvento = end[0];
    this.numEvento = end[1];
    this.bairroEvento = end[2];
    this.cidadeEvento = end[3];
    this.estadoEvento = end[4];
  }

  ngAfterContentInit() {
    this.getLatLong(this.event.address);
  }

  ionViewWillEnter() {
    this.refresh();
  }

  refresh() {
    this.loadSvc.presentLoading();
    this.evSvc.getEvent(this.event.id).subscribe(data => {
      console.log(data.json());
      let retorno = data.json();
      this.event = new Evento(
        retorno._idEvent,
        retorno._title,
        retorno._idOwner,
        retorno._description,
        retorno._startDate,
        retorno._endDate,
        retorno._place,
        retorno._address,
        retorno._cep,
        this.utilService);

      var end = this.event.address.split(",");
      this.ruaEvento = end[0];
      this.numEvento = end[1];
      this.bairroEvento = end[2];
      this.cidadeEvento = end[3];
      this.estadoEvento = end[4];

      this.getLatLong(this.event.address);

      this.loadSvc.dismiss();
    });
  }

  getLatLong(address: string) {
    this.eventSvc.getCoordenadas(address).subscribe(data => {
      var response = data.json();
      console.log(response);
      var lat = response.results['0'].geometry.location.lat;
      var long = response.results['0'].geometry.location.lng;

      var myLatLng = { lat: lat, lng: long };

      this.map = new google.maps.Map(this.mapElement.nativeElement,
        {
          center: myLatLng,
          zoom: 15,
          mapTypeId: 'roadmap'
        });

      var marker = new google.maps.Marker({
        position: myLatLng,
        map: this.map
      });
    })
  }

  navigateToEvent() {
    this.dataService.setData(this.event.id, this.event);
    this.router.navigateByUrl('/edit-event/' + this.event.id);
  }

  async doRefresh(event) {
    setTimeout(() => {
      this.refresh();
      event.target.complete();
    }, 1000);
  }

}
