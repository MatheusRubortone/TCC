import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    private authService: AuthService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  register(form: NgForm) {
    console.log(form.value.name + ' ' + form.value.email + ' ' + form.value.password + ' ' + form.value.dtNascimento);

    this.authService.register(form.value.name, form.value.email, form.value.password, form.value.dtNascimento).subscribe(
      data => {
        this.alertService.presentToast("Registered");
      },
      error => {
        console.log(error);
      },
      () => {
        //this.navCtrl.navigateRoot('/dashboard');
      }
    );
  }

}
