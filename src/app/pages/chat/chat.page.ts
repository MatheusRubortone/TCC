import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, NavController } from '@ionic/angular';
import { UserService } from 'src/app/services/user_service/user.service';
import { ActivatedRoute } from '@angular/router';
import { Chat } from 'src/app/models/chat';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  messages;
  currentUser = this.userService.getUId();
  newMsg;
  @ViewChild(IonContent) content: IonContent;

  constructor(private navCtrl: NavController,
    private userService: UserService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    if (this.route.snapshot.data['special']) {
      this.messages = this.route.snapshot.data['special'];
    }
    this.content.scrollToBottom(200);
  }

  ionViewWillLeave(){
    this.navCtrl.navigateRoot('/tabs/chats');
  }

  sendMessage(){
    this.messages.push({
      user: 'simon',
      createdAt: new Date().getTime(),
      msg: this.newMsg.toString().trim(),
    });

    this.newMsg = "";

    setTimeout(()=>{
      this.content.scrollToBottom(200);
    });
    
  }
}
