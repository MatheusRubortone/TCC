import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EventInvitationsPage } from './event-invitations.page';

const routes: Routes = [
  {
    path: '',
    component: EventInvitationsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EventInvitationsPage]
})
export class EventInvitationsPageModule {}
