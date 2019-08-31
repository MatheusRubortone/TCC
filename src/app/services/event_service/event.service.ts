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

  mockEvents() {
    let eventos = []
    for (var i = 1; i < 6; i++) {
      eventos.push(new Evento("Evento teste abcde 12345 " + i, "0" + i + "/08/2019", "Bar Exemplo, São Paulo, SP"))
    }

    return eventos;
  }

  getEnderecoPorCep(cep: string) {
    return this.http.get(this.env.API_CPF_URL.replace("{cep}", cep)).map(res => {
        return res.json();
    },
    err=>{
        return "erro";
    })
  }
}
