import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, NavController, IonInfiniteScroll } from '@ionic/angular';
import { UserService } from 'src/app/services/user_service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Chat } from 'src/app/models/chat';
import { ChatService } from 'src/app/services/chat_service/chat-service.service';
import { DataService } from 'src/app/services/data_service/data.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  messages = [];
  conversaObj;
  currentUser = this.userService.getUId();
  newMsg;
  nomeConversa;
  chatId;
  amigoId;
  @ViewChild(IonContent) content: IonContent;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(private navCtrl: NavController,
    private userService: UserService,
    private route: ActivatedRoute,
    private chatService: ChatService,
    private dataService: DataService,
    private router: Router) { }

  ngOnInit() {
    if (this.route.snapshot.data['special']) {
      this.conversaObj = this.route.snapshot.data['special'];
      console.log(this.conversaObj);
      this.messages = this.conversaObj.result._messageList;
      this.chatId = this.conversaObj.result._chatID;
      this.nomeConversa = this.conversaObj.nome;
      this.amigoId = this.conversaObj.amigoId;
    }
    this.currentUser = this.userService.getUId();
    this.content.scrollToBottom(200);
  }

  ionViewWillLeave() {
    this.navCtrl.navigateRoot('/tabs/chats');
  }

  sendMessage() {
    this.chatService.addMessage(this.chatId, this.userService.getUId(), this.newMsg.toString().trim()).subscribe(
      data => {
        this.messages.push({
          _personID: this.userService.getUId(),
          _name: "User",
          _messageID: 'x',
          _message: this.newMsg.toString().trim(),
          _datetime: new Date().getTime()
        });

        this.newMsg = "";

        setTimeout(() => {
          this.content.scrollToBottom(200);
        });
      }
    )
  }

  carregarMensagens() {
    this.chatService.openChat(this.userService.getUId(), this.amigoId).subscribe(
      data => {
        var result = data.json();
        var resMessages = result._messageList;

        this.messages.forEach(element => {
          if(element._messageID == 'x')
            this.messages.splice(this.messages.indexOf(element), 1);
        });

        resMessages.forEach(msg => {
          if(!this.messages.find(x => x._messageID == msg._messageID)){
            this.messages.push(msg);
          }
        });
      }
    )
  }

  loadData(event) {
    setTimeout(() => {

      this.carregarMensagens();
      event.target.complete();
      this.content.scrollToBottom(200);
    }, 500);
  }

  openProfile() {
    this.dataService.setData(this.amigoId, this.amigoId);
    this.router.navigateByUrl('user-profile/' + this.amigoId);
  }
}
