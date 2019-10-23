import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { EnvService } from '../env_service/env.service';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private uId: string;

  constructor(private http: Http,
    private env: EnvService) { }

  public setUId(id: string) {
    this.uId = id;
  }

  public getUId() {
    return this.uId;
  }

  public getUserProfile(userId) {
    return this.http.post(this.env.API_URL + '/User/GetProfile', { id: userId });
  }

  updateUserProfile(user: User) {
    return this.http.post(this.env.API_URL + '/User/SetProfile',
      { idPerson: user.id, name: user.name, birthDate: user.dtnascimento, civilState: user.siglaEstadoCivil, biography: user.bio });
  }

  addInteresses(interessesArray){
    return this.http.post(this.env.API_URL + '/User/ActionGenres',
      interessesArray);
  }

  getEstadoCivil(siglaEC): string {
    switch (siglaEC) {
      case "S": return "Solteiro(a)";
      case "C": return "Casado(a)";
      case "N": return "Namorando";
      case "E": return "Enrolado(a)";
    }
  }

}