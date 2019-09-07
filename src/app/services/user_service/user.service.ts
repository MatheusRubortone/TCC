import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private uId: string;

  constructor() { }

  public setUId(id: string){
    this.uId = id;
  }

  public getUId(){
    return this.uId;
  }

}
