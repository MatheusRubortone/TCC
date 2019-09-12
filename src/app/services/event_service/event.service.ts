import { Injectable } from '@angular/core';
import { Evento } from 'src/app/models/event';
import { Http } from '@angular/http';
import { EnvService } from '../env_service/env.service';
import { tap } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(
    private http: Http,
    private storage: NativeStorage,
    private env: EnvService
  ) { }

  registerEvent(title: string, idOwner: string, description: string, startDate: string, endDate: string, place: string, address: string, cep: string) {
    return this.http.post(this.env.API_URL + '/event/register',
      { title: title, idOwner: idOwner, description: description, startDate: startDate, endDate: endDate, place: place, address: address, cep: cep }
    )
  }

  getEvent(idEvento: string){
    return this.http.post(this.env.API_URL + '/event/get', { idEvent: idEvento })
  }

  editEvent(idEvento: string,title: string, idOwner: string, description: string, startDate: string, endDate: string, place: string, address: string, cep: string) {
    console.log(startDate + ", "+ endDate);
    return this.http.post(this.env.API_URL + '/event/update',
      {idEvent: idEvento, title: title, idOwner: idOwner, description: description, startDate: startDate, endDate: endDate, place: place, address: address, cep: cep }
    )
  }

  excludeEvent(idEvento: string){
    return this.http.post(this.env.API_URL+'/Event/Delete', {idEvent: idEvento});
  }

  // mockEvents() {
  //   let eventos = []
  //   for (var i = 1; i < 6; i++) {
  //     eventos.push(new Evento("Evento teste abcde 12345 " + i, "0" + i + "/08/2019", "Bar Exemplo, São Paulo, SP"))
  //   }

  //   return eventos;
  // }

  getEnderecoPorCep(cep: string) {
    return this.http.get(this.env.API_CPF_URL.replace("{cep}", cep)).map(res => {
      return res.json();
    },
      err => {
        return "erro";
      })
  }

  getCoordenadas(cep: string){
    return this.http.get(this.env.API_GEO_URL.replace("{cep}", cep));
  }

  getEventsByOwner(idUsuario: string){
    return this.http.post(this.env.API_URL+'/Event/EventsByOwner', {userID: idUsuario});
  }
}
