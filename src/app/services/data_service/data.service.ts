import { Injectable } from '@angular/core';
import { Evento } from 'src/app/models/event';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private data = [];

  constructor() { }

  setData(id, data) {
    this.data[id] = data;
  }
 
  getData(id) {
    return this.data[id];
  }
}
