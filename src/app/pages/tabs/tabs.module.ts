import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsPageRoutingModule } from './tabs.router.module';
import { TabsPage } from './tabs.page';
import { Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path:'events',
        loadChildren: './pages/events/events.module#EventsPageModule'
      },
      {
        path:'home',
        loadChildren: './pages/home/home.module#HomePageModule'
      },
      {
        path:'friends',
        loadChildren: './pages/friends/friends.module#FriendsPageModule'
      },
      {
        path:'chats',
        loadChildren: '.pages/chats/chats.module#ChatsPageModule'
      },
      {
        path:'user-profile',
        loadChildren: './pages/user-profile/user-profile.module#UserProfilePageModule'
      }
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/(home:home)',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule { }
