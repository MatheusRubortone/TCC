import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth_service/auth.service';
import { NavController } from '@ionic/angular';
import { LoadingService } from 'src/app/services/loading_service/loading.service';
import { UserService } from 'src/app/services/user_service/user.service';
import { User } from 'src/app/models/user';
import { Interesse } from 'src/app/models/interesses';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data_service/data.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})

export class UserProfilePage implements OnInit {

  userId;
  user: User;
  interesses: Interesse[];
  events;
  userProfile: boolean;
  editMode: boolean = false;

  constructor(private authService: AuthService,
    private nav: NavController,
    private loadSvc: LoadingService,
    private uSvc: UserService,
    private route: ActivatedRoute, 
    private dataService: DataService,
    private router: Router) {

      this.user = new User("", "","","","", this.interesses, uSvc);

    if (this.route.snapshot.data['special']) {
      this.userId = this.route.snapshot.data['special'];
    }
    else {
      this.userId = this.uSvc.getUId();
    }
    console.log(this.userId);
    this.getUserInfo(this.userId);
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
      this.loadSvc.dismiss();
      this.userProfile = (userId == this.uSvc.getUId());
    });
  }

  salvarPerfil(){
    this.user.estadoCivil = this.uSvc.getEstadoCivil(this.user.siglaEstadoCivil);
    this.uSvc.updateUserProfile(this.user).subscribe(data=>{
      console.log(data);
    });
    this.editMode = false;
    //this.getUserInfo(this.userId);
  }

  turnEditModeOn(){
    this.editMode = true;
  }

}
