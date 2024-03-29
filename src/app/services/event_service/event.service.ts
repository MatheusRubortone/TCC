import { Injectable } from '@angular/core';
import { Evento } from 'src/app/models/event';
import { Http } from '@angular/http';
import { EnvService } from '../env_service/env.service';
import { tap } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { UserService } from '../user_service/user.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(
    private http: Http,
    private storage: NativeStorage,
    private env: EnvService,
    private uSvc: UserService
  ) { }

  registerEvent(title: string, idOwner: string, description: string, startDate: string, endDate: string, place: string, address: string, cep: string) {
    return this.http.post(this.env.API_URL + '/event/register',
      { title: title, idOwner: idOwner, description: description, startDate: startDate, endDate: endDate, place: place, address: address, cep: cep }
    )
  }

  getEvent(idEvento: string, user: string){
    return this.http.post(this.env.API_URL + '/event/get', { idEvent: idEvento, idUser: user})
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

  flagEvent(idEvent: string, personId: string, checkIn: string, flag: string,){
    return this.http.post(this.env.API_URL + '/EventXUser/AddUserEvent', { idEvent: idEvent, personIdEvent: personId, personcheckInEvent: checkIn, personStateEvent: flag});
  }

  alterarSaveEvento(evento: Evento, tipo){
    if(tipo == "I")
      var flag = evento.saved ? tipo : 'X';
    else if(tipo == "C")
    var flag = evento.confirmed ? tipo : 'X';
    this.flagEvent(evento.id, this.uSvc.getUId(), 'N', flag).subscribe((data)=>{
      console.log(data.json());
    });
  }

  getFilteredEvents(userId, keyString){
    return this.http.post(this.env.API_URL+'/Event/EventsWithFilter', {key: keyString, value: userId});
  }

  getAttendees(eventId){
    return this.http.post(this.env.API_URL+'/Event/getUsersConfirmed', {id: eventId});  
  }

  searchEvent(search: string){
    return this.http.post(this.env.API_URL+'/Event/EventsWithFilter', {key: "texto", value: search});
  }

  inviteToEvent(sender: string, receiver: string, event: string){
    return this.http.post(this.env.API_URL + '/Event/InviteTo', { senderID: sender, receiverID: receiver, eventID: event });
  }

  listPendingInvitations(userid: string){
    return this.http.post(this.env.API_URL + '/Event/ShowPendingInvites', {userID: userid});
  }

  listPeopleToInvite(sender: string, event: string){
    return this.http.post(this.env.API_URL + '/Event/ListPeopleToInvite', { senderID: sender, eventID: event });
  }

  respondInvitation(user, event, action){
    return this.http.post(this.env.API_URL + '/Event/InviteResponse',{userID: user,eventID: event , action: action});
  }

  checkIsHappening(userid: string){
    return this.http.post(this.env.API_URL + '/Event/CheckIsHappening', {userID: userid});
  }

  FindPepopleIn(userid: string){
    return this.http.post(this.env.API_URL + '/Event/FindPepopleIn', {userID: userid});
  }
}
