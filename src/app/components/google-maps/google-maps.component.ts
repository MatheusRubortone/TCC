import { Component, OnInit, ViewChild } from '@angular/core';
import { google } from "google-maps";

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss'],
})
export class GoogleMapsComponent implements OnInit {

  @ViewChild("map") mapElement;
  map: any;
  constructor() { }

  ngOnInit() {
    this.initMap();
  }

  initMap(){
    let coords = new google.maps.LatLng(45,100);
    let mapOptions: google.maps.mapOptions = {
      center: coords,
      zoom: 14,
      mapTypeId: google.maps.mapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions)
  }

  

}
