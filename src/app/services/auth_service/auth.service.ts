import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Component } from '@angular/core';
import { tap } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { EnvService } from '../env_service/env.service';
import { User } from '../../models/user';
import { AlertService } from '../alert_service/alert.service';
import { DatePipe } from '@angular/common';
import { Http } from '@angular/http';
import * as moment from 'moment';
import { UserService } from '../user_service/user.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isLoggedIn = false;
  token: any;

  data: JSON;
  us: User;

  constructor(
    private http: Http,
    private storage: NativeStorage,
    private env: EnvService,
    private alertService: AlertService,
    public datepipe: DatePipe,
    public userService: UserService
  ) { }

  login(email: String, password: String) {
    return this.http.post(this.env.API_URL + '/user/login',
      { email: email, password: password }
    ).pipe(
      tap(token => {
        console.log(token["_body"]);
        let id = JSON.parse(token["_body"]);
        console.log("id: " + id._codRetRequest);
        this.userService.setUId(id._codRetRequest);
        this.storage.setItem('token', id._codRetRequest)
          .then(
            () => {
              console.log('Token Stored');
            },
            error => console.error('Error storing item', error)
          );
        this.token = token;
        this.isLoggedIn = true;
        return token;
      })
    );
  }

  register(name: String, email: String, password: String, dtNascimento: String) {
    console.log(dtNascimento.toString());
    return this.http.post(this.env.API_URL + '/user/register/',
      { user: name, password: password, email: email, birthdate: dtNascimento.toString() }
    )
  }

  logout() {
    // const headers = new HttpHeaders({
    //   'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    // });
    // return this.http.get(this.env.API_URL + 'auth/logout', { headers: headers })
    // .pipe(
    //   tap(data => {
    //     this.storage.remove("token");
    //     this.isLoggedIn = false;
    //     delete this.token;
    //     return data;
    //   })
    // )
    this.storage.remove("token");
    this.isLoggedIn = false;
    delete this.token;
  }

  // user() {
  //   const headers = new HttpHeaders({
  //     'Authorization': this.token["token_type"]+" "+this.token["access_token"]
  //   });
  //   return this.http.get<User>(this.env.API_URL + 'auth/user', { headers: headers })
  //   .pipe(
  //     tap(user => {
  //       return user;
  //     })
  //   )
  // }

  getToken() {
    return this.storage.getItem('token').then(
      data => {
        this.token = data;
        if (this.token != null) {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      },
      error => {
        this.token = null;
        this.isLoggedIn = false;
      }
    );
  }

  getDate(dateF: string) {
    let date = new Date(dateF);
    let latest_date = this.datepipe.transform(date, 'dd-MM-yyyy');
    return date.toString();
  }
}
