import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth_service/auth.service';
import { NavController, ModalController } from '@ionic/angular';
import { LoadingService } from 'src/app/services/loading_service/loading.service';
import { UserService } from 'src/app/services/user_service/user.service';
import { User } from 'src/app/models/user';
import { Interesse } from 'src/app/models/interesses';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data_service/data.service';
import { UtilService } from 'src/app/services/util_service/util.service';
import { Evento } from 'src/app/models/event';
import { EventService } from 'src/app/services/event_service/event.service';
import { Select, Alert } from 'ionic-angular';
import { AlertService } from 'src/app/services/alert_service/alert.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})

export class UserProfilePage implements OnInit {
  
  @ViewChild('mySelect') selectRef: Select;

  userId;
  user: User;
  interesses: Interesse[];
  events: EventBrief[];
  userProfile: boolean;
  editMode: boolean = false;
  interessesUsuario = [];
  interesseEditMode: boolean = false;
  interessesList = [];
  hideEvents: boolean = false;
  hideInteresses: boolean = false;

  constructor(private authService: AuthService,
    private nav: NavController,
    private loadSvc: LoadingService,
    private uSvc: UserService,
    private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router,
    private utilSvc: UtilService,
    public modalController: ModalController,
    private navCtrl: NavController,
    private evSvc: EventService,
    private utilService: UtilService,
    private alertService: AlertService) {

    this.user = new User("", "", "", "", "", this.interesses, uSvc);

    if (this.route.snapshot.data['special']) {
      this.userId = this.route.snapshot.data['special'];
    }
    else {
      this.userId = this.uSvc.getUId();
    }
    console.log(this.userId);
    this.getUserInfo(this.userId);
    this.events = [];
    this.interesses = [];
    this.user.interesses = this.interesses;
    this.interessesUsuario = [];
    

    this.interessesList = [
      "Festa e Show",
      "Arte e Cultura",
      "Esporte",
      "Congresso e Seminário",
      "Gastronômico",
      "Tecnologia",
      "Moda e Beleza",
      "Infantil",
      "Games e Geek",
      "Outros",
    ];
  }

  ngOnInit() {

  }

  sair() {
    this.authService.logout();
    this.nav.navigateRoot('login');
  }

  getUserInfo(userId) {
    this.loadSvc.presentLoading();
    this.uSvc.getUserProfile(userId).subscribe(data => {
      console.log(data.json());
      let retorno = data.json();
      this.interesses = [];
      retorno.evenGenre.forEach(element => {
        this.interesses.push(new Interesse(element._idGenre, element._descriptionGenre))
        this.interessesUsuario.push(element._descriptionGenre);
      });
      this.events = [];
      retorno.evenConfirmed.forEach(element => {
        this.events.push(new EventBrief(element._idEvent,
          element._title, element._startDate, element._place, this.utilSvc));
      });

      console.log(this.interesses);
      this.user = new User(
        retorno._idPerson,
        retorno._name,
        retorno._birthdate,
        retorno._biography,
        retorno._civilState,
        this.interesses,
        this.uSvc
      );

      this.events.length > 0 ? this.hideEvents = false : this.hideEvents = true;
      this.interessesUsuario.length > 0 ? this.hideInteresses = false : this.hideInteresses = true;

      this.loadSvc.dismiss();
      this.userProfile = (userId == this.uSvc.getUId());
    });
  }

  salvarPerfil() {
    this.user.estadoCivil = this.uSvc.getEstadoCivil(this.user.siglaEstadoCivil);
    this.uSvc.updateUserProfile(this.user).subscribe(data => {
      console.log(data);
    });
    this.editMode = false;
  }

  turnEditModeOn() {
    this.editMode = true;
  }

  eventOnClick(event) {
    this.evSvc.getEvent(event.eventId).subscribe(data=>{
      let retorno = data.json();
      var evento = new Evento(
        retorno._idEvent,
        retorno._title,
        retorno._idOwner,
        retorno._description,
        retorno._startDate,
        retorno._endDate,
        retorno._place,
        retorno._address,
        retorno._cep,
        retorno._state,
        this.utilService);

        this.navigateToEvent(event.id, evento);
    })
  }

  navigateToEvent(id, evento: Evento) {
    this.dataService.setData(id, evento);
    this.navCtrl.navigateRoot('/event-desc/' + id);
  }

  getInteresseId(int: string){
    switch(int){
      case "Festa e Show":
        return "1";
      case "Arte e Cultura":
        return "2";
      case "Esporte":
        return "3"
      case "Congresso e Seminário":
        return "4";
      case "Gastronômico":
        return "5"
      case "Tecnologia":
        return "6";
      case "Moda e Beleza":
        return "7";
      case "Infantil":
        return "8";
      case "Games e Geek":
        return "9";
      case "Outros":
        return "10";
    }
  }

  abrirSelect(){
    console.log("entrou");
    this.selectRef.open();
  }

  onChange(){
    console.log("entrou on change");
    this.uSvc.addInteresses(this.montarObjetoChamada()).subscribe(data=>{
      console.log(data);
    });
  }

  montarObjetoChamada(){
    var genero = this.montarGenero();
    var objeto = {
      idPerson: this.userId,
      genre: genero
    }
    console.log(objeto);
    return objeto;
  }

  montarGenero(){
    var genre = [];
    this.interessesList.forEach(element=>{
      if(this.interessesUsuario.includes(element))
        genre.push({action: "include", id: this.getInteresseId(element)});
      else
      genre.push({action: "exclude", id: this.getInteresseId(element)});
    });
    return genre;
  }

  onConvidarClick(){
    console.log(this.uSvc.getUId(), this.userId);
    this.uSvc.addFriend(this.uSvc.getUId(), this.userId).subscribe(data=>{
      this.alertService.presentToast("Solicitação de amizade enviada!");
    },
    error=>{
      this.alertService.presentToast("Houve um erro. Tente novamente.");
    })
  }
}

class EventBrief {
  eventId: string;
  title: string;
  startDate: string;
  place: string;
  starDateExtenso: string;

  constructor(id, title, date, place, utilSvc: UtilService) {
    this.eventId = id;
    this.title = title;
    this.startDate = date;
    this.place = place;
    this.starDateExtenso = utilSvc.montarDataExtenso(this.startDate);
  }
};