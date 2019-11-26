import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event_service/event.service';
import { Amigo } from 'src/app/models/amigo';
import { UserService } from 'src/app/services/user_service/user.service';
import { DataService } from 'src/app/services/data_service/data.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-find-people',
  templateUrl: './find-people.page.html',
  styleUrls: ['./find-people.page.scss'],
})
export class FindPeoplePage implements OnInit {

  amigos: Amigo[] = [];

  constructor(private eventService: EventService,
    private userService: UserService,
    private dataService: DataService,
    private router: Router) { }

  ngOnInit() {
    this.getPeople();
  }

  getPeople(){
    this.amigos = [];
    this.eventService.FindPepopleIn(this.userService.getUId()).subscribe(
      data=>{
        var response = data.json();
        response.forEach(element => {
          this.amigos.push(
            new Amigo(element._userID, element._userName)
          )
        });
      }
    );
  }

  openProfile(userId) {
    this.dataService.setData(userId, userId);
    this.router.navigateByUrl('user-profile/' + userId);
  }

}
