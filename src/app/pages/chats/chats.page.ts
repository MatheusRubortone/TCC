import { Component, OnInit } from '@angular/core';
import { Chat } from 'src/app/models/chat';
import { ChatService } from 'src/app/services/chat_service/chat-service.service';
import { UserService } from 'src/app/services/user_service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {

  conversas: Chat[] = [];

  constructor(private chatService: ChatService,
    private userService: UserService,
    private router: Router) { }

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
                element._personID1,
                element._personID2,
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

}
