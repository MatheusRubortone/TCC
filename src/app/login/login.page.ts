import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { RegisterPage } from '../register/register.page';
import { NgForm, AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formGroup: FormGroup;
  email: AbstractControl;
  password: AbstractControl;

  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService,
    private formBuilder: FormBuilder
  ) { 

    this.formGroup = formBuilder.group({
      email:['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      password:['', Validators.required]
    });

    this.email = this.formGroup.controls['email'];
    this.password = this.formGroup.controls['password'];
    
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.authService.getToken().then(() => {
      if(this.authService.isLoggedIn) {
        this.navCtrl.navigateRoot('/home');
      }
    });
  }

  login(form: NgForm) {
    this.authService.login(form.value.email, form.value.password).subscribe(
      data => {
        console.log(data);
        let response = data.json();
        if(response._codRetRequest == 1) this.navCtrl.navigateRoot('/home');
        else this.alertService.presentToast("Falha no login. Usuário ou senha inválidos.");
      },
      error => {
        console.log(error);
      },
      () => {
        //this.navCtrl.navigateRoot('/home');
      }
    );
  }
}
