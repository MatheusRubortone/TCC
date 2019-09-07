import { Component, OnInit, ViewChild } from '@angular/core';
import { EnvService } from 'src/app/services/env_service/env.service';
import { EventService } from 'src/app/services/event_service/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Evento } from 'src/app/models/event';
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
    private router: Router) { }

  ngOnInit() {
    if (this.route.snapshot.data['special']) {
      this.event = this.route.snapshot.data['special'];
    }
    
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

}
