import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth_service/auth.service';
import { NgForm, FormGroup, AbstractControl, AbstractControlDirective, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert_service/alert.service';
import { validateConfig } from '@angular/router/src/config';
import { NavController } from '@ionic/angular';
import { LoadingService } from 'src/app/services/loading_service/loading.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {

  formGroup: FormGroup;
  name: AbstractControl;
  birthDate: AbstractControl;
  email: AbstractControl;
  password: AbstractControl;
  passwordConf: AbstractControl;
  genero: AbstractControl;
  erroEmail: boolean;

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private lodingService: LoadingService
  ) {

    this.formGroup = formBuilder.group({
      name: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^([a-zA-Z]{1,}\\s[a-zA-z]{1,}\'?-?[a-zA-Z]{1,}\\s?([a-zA-Z]{1,})?\\s?([a-zA-Z]{1,})?)')
      ])],
      birthDate: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      password: ['', Validators.required],
      genero: ['', Validators.required],
      passwordConf: ['', Validators.required]
    }, { validator: this.matchingPasswords('password', 'passwordConf') });

    this.name = this.formGroup.controls['name'];
    this.birthDate = this.formGroup.controls['birthDate'];
    this.genero = this.formGroup.controls['genero'];
    this.email = this.formGroup.controls['email'];
    this.password = this.formGroup.controls['password'];
    this.passwordConf = this.formGroup.controls['passwordConf'];

    this.erroEmail = false;
  }

  ngOnInit() {
  }

  async register(form: NgForm) {
    await this.lodingService.presentLoading();
    const response = await this.authService.register(form.value.name, form.value.email, form.value.password, form.value.birthDate, form.value.genero)
    this.alertService.presentToast(response.status + " | " + response.data);
    if(response.status == 200) this.navCtrl.navigateRoot('/tabs');
    // .subscribe(
    //   data => {
    //     let response = data.json();
    //     console.log(response);
    //     if (response['_codRetRequest'] == 1)
    //       this.authService.login(form.value.email, form.value.password).subscribe(
    //       data => {
    //         let response = data.json();
    //         this.lodingService.dismiss();
    //         if (response._codRetRequest > 0) this.navCtrl.navigateRoot('/tabs');
    //         else this.alertService.presentToast("Falha no login. Usuário ou senha inválidos.");
    //       },
    //       error => {
    //         this.lodingService.dismiss();
    //         this.alertService.presentToast("Falha no login. Tente Novamente. 1 " + error);
    //         console.log(error);
    //       }
    //     );
    //     else if(response['_codRetRequest'] == 888)
    //       this.lodingService.dismiss();
    //       this.erroEmail = true;
    //   },
    //   error => {
    //     this.lodingService.dismiss();
    //     this.alertService.presentToast("Falha no cadastro. Tente Novamente. 2 " + error);
    //     console.log(error);
    //   }
    // );
  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }

  limparErroEmail(){
    this.erroEmail = false;
  }
}
