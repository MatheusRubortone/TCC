import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

  constructor(private authService:AuthService,
              private nav: NavController) { }

  ngOnInit() {
  }

  sair(){
    this.authService.logout();
    this.nav.navigateRoot('login');
  }

}
