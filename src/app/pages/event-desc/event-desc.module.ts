import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EventDescPage } from './event-desc.page';
import { GoogleMapsComponent } from 'src/app/components/google-maps/google-maps.component';

const routes: Routes = [
  {
    path: '',
    component: EventDescPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [EventDescPage,
    GoogleMapsComponent]
})
export class EventDescPageModule {}
