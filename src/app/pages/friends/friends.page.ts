import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, AlertController } from '@ionic/angular';
import { TabsService } from 'src/app/services/tabs_service/tabs.service';
import { SolicitacaoAmizade } from 'src/app/models/solicitacaoAmizade';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user_service/user.service';
import { AlertService } from 'src/app/services/alert_service/alert.service';
import { DataService } from 'src/app/services/data_service/data.service';
import { Router } from '@angular/router';
import { Amigo } from 'src/app/models/amigo';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
})
export class FriendsPage implements OnInit {

  @ViewChild('slides') slider: IonSlides;

  segment = this.tabsSvc.getSegment();
  convites: SolicitacaoAmizade[] = [];
  amigos: Amigo[] = [];
  selection: boolean = false;

  constructor(private tabsSvc: TabsService,
    private userService: UserService,
    private alertService: AlertService,
    private dataService: DataService,
    private router: Router,
    public alertController: AlertController) { }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    if (await this.slider.getActiveIndex() == 0) {
      this.getAmigos();
    }
    else if (await this.slider.getActiveIndex() == 1) {
      this.getSolicitacoes();
    }
  }

  async segmentChanged() {
    await this.slider.slideTo(this.segment);
    this.tabsSvc.setSegment(this.segment);
  }

  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
    this.tabsSvc.setSegment(await this.slider.getActiveIndex());

    if (await this.slider.getActiveIndex() == 0) {
      if (this.amigos.length == 0) this.getAmigos();
    }
    else if (await this.slider.getActiveIndex() == 1) {
      if (this.convites.length == 0) this.getSolicitacoes();
    }
  }

  acceptRequest(request: SolicitacaoAmizade) {
    this.userService.respondInvitation(request.fromUser, request.toUser, "E").subscribe(data => {
      this.alertService.presentToast("Solicitação aceita!");
      this.convites.splice(this.convites.indexOf(request), 1);
    });
  }

  denyRequest(request: SolicitacaoAmizade) {
    this.userService.respondInvitation(request.fromUser, request.toUser, "D").subscribe(data => {
      this.alertService.presentToast("Solicitação recusada.");
      this.convites.splice(this.convites.indexOf(request), 1);
    });
  }

  async doRefresh(event) {
    if (await this.slider.getActiveIndex() == 0) {
      setTimeout(() => {
        this.getAmigos();
        event.target.complete();
      }, 1000);
    }
    else if (await this.slider.getActiveIndex() == 1) {
      console.log("entrou 1");
      setTimeout(() => {
        this.getSolicitacoes();
        event.target.complete();
      }, 1000);
    }
  }

  openProfile(userId) {
    this.dataService.setData(userId, userId);
    this.router.navigateByUrl('user-profile/' + userId);
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

  getSolicitacoes() {
    this.convites = [];
    this.userService.getFriendshipRequests(this.userService.getUId()).subscribe(data => {
      var resultado = data.json();
      resultado.forEach(element => {
        var solicitacao = new SolicitacaoAmizade(element._idPerson,
          +this.userService.getUId(),
          element._idFriendship,
          element._name);

        this.convites.push(solicitacao);
      });
    });
  }

  public selectItem(index: number, amigo: Amigo) {
    this.selection = true;
  }

  public unselectAll() {
    this.selection = false;
  }

  excluirAmigo(amigo: Amigo){
    this.userService.respondInvitation(this.userService.getUId(), amigo.id, "D").subscribe(data => {
      this.alertService.presentToast("Amizade excluída.");
      this.amigos.splice(this.amigos.indexOf(amigo), 1);
    });
  }

  async presentAlertConfirm(amigo: Amigo) {
    const alert = await this.alertController.create({
      header: 'Excluir Amizade',
      message: 'Tem certeza que quer excluir essa amizade?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Excluir',
          handler: () => {
            this.excluirAmigo(amigo);
          }
        }
      ]
    });

    await alert.present();
  }
}
