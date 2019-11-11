import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/services/event_service/event.service';
import { DataService } from 'src/app/services/data_service/data.service';
import { UserService } from 'src/app/services/user_service/user.service';

@Component({
  selector: 'app-event-attendance',
  templateUrl: './event-attendance.page.html',
  styleUrls: ['./event-attendance.page.scss'],
})
export class EventAttendancePage implements OnInit {

  idEvento;
  presencas: Atendee[] = [];
  uId;

  constructor(private route: ActivatedRoute,
    private evtSvc: EventService,
    private dataService: DataService,
    private router: Router, 
    private uSvc: UserService) {
      this.uId = uSvc.getUId();
  }

  ngOnInit() {
    if (this.route.snapshot.data['special']) {
      this.idEvento = this.route.snapshot.data['special'];
    }

    this.getEventAttendees(this.idEvento);
  }

  getEventAttendees(eventId) {
    this.evtSvc.getAttendees(eventId).subscribe(data => {
      console.log(data.json());
      let retorno = data.json();
      this.presencas = [];
      retorno.forEach(element => {
        if(element._idPerson != this.uId) this.presencas.push(new Atendee(element._idPerson, element._name))
      });
    });
  }

  openProfile(userId) {
    this.dataService.setData(userId, userId);
    this.router.navigateByUrl('user-profile/' + userId);
  }
}

class Atendee {

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  id: string;
  name: string;
}
