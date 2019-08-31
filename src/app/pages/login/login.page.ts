import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { NgForm, AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth_service/auth.service';
import { AlertService } from 'src/app/services/alert_service/alert.service';
import { LoadingService } from 'src/app/services/loading_service/loading.service';

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
    private formBuilder: FormBuilder,
    private loadingService: LoadingService
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
        this.navCtrl.navigateRoot('/tabs');
      }
    });
  }

  async login(form: NgForm) {
    await this.loadingService.presentLoading();
    this.authService.login(form.value.email, form.value.password).subscribe(
      data => {
        console.log(data);
        let response = data.json();
        this.loadingService.dismiss();
        if(response._codRetRequest == 1) this.navCtrl.navigateRoot('/tabs');
        if(response._codRetRequest == 0) this.alertService.presentToast("Usuário ou senha incorretos, tente novamente.");
        else if(response._codRetRequest == 999) this.alertService.presentToast("Ocorreu um erro no login. Tente novamente.");

      },
      error => {
        this.loadingService.dismiss();
        console.log(error);
      }
    );
  }
}