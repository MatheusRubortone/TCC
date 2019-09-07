import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TabsService {

  private segment;

  constructor() {
    this.segment = 0;
  }

  public setSegment(segment) {
    this.segment = segment;
  }

  public getSegment() {
    return this.segment;
  }
}
