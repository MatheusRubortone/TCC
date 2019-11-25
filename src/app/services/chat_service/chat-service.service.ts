import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { EnvService } from '../env_service/env.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: Http,
    private env: EnvService,) { }

  getConversations(userId){
    return this.http.post(this.env.API_URL + '/Chat/ShowList', { userID: userId });
  }

  openChat(person1, person2){
    return this.http.post(this.env.API_URL + '/Chat/Chat/Open',{user1: person1, user2: person2});
  }
}
