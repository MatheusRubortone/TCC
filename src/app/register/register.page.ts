import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NgForm, FormGroup, AbstractControl, AbstractControlDirective, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../services/alert.service';
import { validateConfig } from '@angular/router/src/config';

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

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private formBuilder: FormBuilder
  ) {

    this.formGroup = formBuilder.group({
      name:['', Validators.compose([
        Validators.required,
        Validators.pattern('^([a-zA-Z]{2,}\\s[a-zA-z]{1,}\'?-?[a-zA-Z]{2,}\\s?([a-zA-Z]{1,})?)')
      ])],
      birthDate:['', Validators.required],
      email:['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      password:['', Validators.required],
      passwordConf:['', Validators.required]
    }, {validator: this.matchingPasswords('password', 'passwordConf')});

    this.name = this.formGroup.controls['name'];
    this.birthDate = this.formGroup.controls['birthDate'];
    this.email = this.formGroup.controls['email'];
    this.password = this.formGroup.controls['password'];
    this.passwordConf = this.formGroup.controls['passwordConf'];
   }

  ngOnInit() {
  }

  register(form: NgForm) {
    console.log(form.value.name + ' ' + form.value.email + ' ' + form.value.password + ' ' + form.value.birthDate);

    this.authService.register(form.value.name, form.value.email, form.value.password, form.value.birthDate).subscribe(
      data => {
        this.alertService.presentToast("Registered");
      },
      error => {
        console.log(error);
      },
      () => {
        //this.navCtrl.navigateRoot('/home');
      }
    );
  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }

  
}
