import { Component, OnInit } from '@angular/core';
import { Chat } from 'src/app/models/chat';
import { ChatService } from 'src/app/services/chat_service/chat-service.service';
import { UserService } from 'src/app/services/user_service/user.service';
import { Router } from '@angular/router';
import { Amigo } from 'src/app/models/amigo';
import { DataService } from 'src/app/services/data_service/data.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {

  conversas: Chat[] = [];

  constructor(private chatService: ChatService,
    private userService: UserService,
    private router: Router,
    private dataService: DataService,
    private navCtrl: NavController) { }

  ngOnInit() {
    this.getConversas();
  }

  getConversas() {
    this.conversas = []

    this.chatService.getConversations(this.userService.getUId()).subscribe(
      data => {
        var result = data.json();
        console.log(result)
        if (result) {
          result.forEach(element => {
            this.conversas.push(
              new Chat(
                element._callerID,
                element._calledID,
                element._chatID,
                element._name
              )
            )
          });
        }
      }
    );
  }

  async doRefresh(event) {
    setTimeout(() => {
      this.getConversas();
      event.target.complete();
    }, 1000);
  }

  selectFriend(){
    this.router.navigateByUrl('chat-friend-list');
  }

  abrirConversa(conversa: Chat){
    this.chatService.openChat(this.userService.getUId(), conversa._calledID).subscribe(
      data=>{
        var result = data.json();
        var conversaObj = { nome: conversa.chatName, amigoId:conversa._calledID,  result: result}
        this.dataService.setData(conversa.chatId, conversaObj);
        this.router.navigateByUrl('/chat/' + conversa.chatId);
      }
    );
  }

}
