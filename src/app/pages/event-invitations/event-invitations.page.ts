import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event_service/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user_service/user.service';
import { Amigo } from 'src/app/models/amigo';
import { AlertService } from 'src/app/services/alert_service/alert.service';
import { DataService } from 'src/app/services/data_service/data.service';

@Component({
  selector: 'app-event-invitations',
  templateUrl: './event-invitations.page.html',
  styleUrls: ['./event-invitations.page.scss'],
})
export class EventInvitationsPage implements OnInit {

  idEvento;
  amigos: Amigo[] = [];
  amigosBkp: Amigo[] = [];
  busca;

  constructor(private eventService: EventService,
    private route: ActivatedRoute,
    private userService: UserService,
    private alertService: AlertService,
    private dataService: DataService,
    private router: Router) {

  }

  ngOnInit() {
    if (this.route.snapshot.data['special']) {
      this.idEvento = this.route.snapshot.data['special'];
      console.log(this.idEvento);
      this.listarAmigosParaConvite();
    }
  }

  listarAmigosParaConvite() {
    console.log('entrou');
    console.log(this.idEvento);
    this.amigos = [];
    this.eventService.listPeopleToInvite(this.userService.getUId(), this.idEvento).subscribe(
      data => {
        var result = data.json();
        console.log(result);
        result.forEach(element => {
          var amigo = new Amigo(element._idPerson, element._name);
          amigo.convidado = false;
          this.amigos.push(amigo);
        });
      });
      
      this.amigos = this.amigos.sort((a, b) => {
        const name1 = a.nome.toLowerCase();
        const name2 = b.nome.toLowerCase();
        if (name1 > name2) { return 1; }
        if (name1 < name2) { return -1; }
        return 0;
      });

      this.amigosBkp = this.amigos;
  }

  async doRefresh(event) {
    setTimeout(() => {
      this.listarAmigosParaConvite();
      event.target.complete();
    }, 1000);
  }

  filterItems(searchTerm) {
    this.amigos = this.amigos.filter(amigo => {
      return amigo.nome.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

  convidarAmigo(amigo: Amigo) {
    this.eventService.inviteToEvent(this.userService.getUId(), amigo.id.toString(), this.idEvento).subscribe(
      data => {
        this.alertService.presentToast("Convite enviado!");
        amigo.convidado = true;
      },
      error=>{
        this.alertService.presentToast("Houe um erro. Tente novamente.");
      }
    );
  }

  cancelarConvite(amigo: Amigo){
    this.eventService.respondInvitation(amigo.id, this.idEvento, "R").subscribe(
      data=>{
        this.alertService.presentToast("Convite cancelado.");
        amigo.convidado = false;
      },
      error=>{
        this.alertService.presentToast("Houe um erro. Tente novamente.");
      }
    );
  }

  searchOnInput(ev: any) {
    console.log(ev.target.value);
    var busca = ev.target.value;
    this.amigos = this.amigosBkp;

    if (busca != "") { 
      this.filterItems(busca);
    }
  }

  openProfile(userId) {
    this.dataService.setData(userId, userId);
    this.router.navigateByUrl('user-profile/' + userId);
  }

}
