import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChatFriendListPage } from './chat-friend-list.page';

const routes: Routes = [
  {
    path: '',
    component: ChatFriendListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ChatFriendListPage]
})
export class ChatFriendListPageModule {}
