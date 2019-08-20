import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


  items = [
    {
      title:"Festa 1"
    },
    {
      title:"Festa 2"
    }
  ];

  constructor(private router: Router) { }

  ngOnInit() {
  }


}
