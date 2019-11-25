import { Component, OnInit } from '@angular/core';
import { Amigo } from 'src/app/models/amigo';
import { UserService } from 'src/app/services/user_service/user.service';
import { ChatService } from 'src/app/services/chat_service/chat-service.service';
import { DataService } from 'src/app/services/data_service/data.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-chat-friend-list',
  templateUrl: './chat-friend-list.page.html',
  styleUrls: ['./chat-friend-list.page.scss'],
})
export class ChatFriendListPage implements OnInit {

  amigos: Amigo[] = [];

  constructor(private userService: UserService,
    private chatService: ChatService,
    private dataService: DataService,
    private navCtrl: NavController) { }

  ngOnInit() {
    this.getAmigos();
  }

  getAmigos() {
    this.amigos = [];
    this.userService.getFriends(this.userService.getUId()).subscribe(data => {
      var resultado = data.json();
      resultado.forEach(element => {
        var amigo = new Amigo(element._idPerson, element._name);
        this.amigos.push(amigo);
      });
    });
  }

  abrirConversa(amigoId){
    this.chatService.openChat(this.userService.getUId(), amigoId).subscribe(
      data=>{
        var result = data.json();
        this.dataService.setData(amigoId, result);
        this.navCtrl.navigateRoot('/chat/' + amigoId);
      }
    );
  }

}
