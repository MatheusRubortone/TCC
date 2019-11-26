import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DataResolverService } from './resolver/data-resolver.service';

const routes: Routes = [
  //{ path: '', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
  { path: '', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'tabs', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: '', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
  { path: 'create-event', loadChildren: './pages/create-event/create-event.module#CreateEventPageModule' },
  { path: 'event-desc/:id', resolve:{special: DataResolverService}, loadChildren: './pages/event-desc/event-desc.module#EventDescPageModule' },
  { path: 'edit-event/:id', resolve:{special: DataResolverService}, loadChildren: './pages/edit-event/edit-event.module#EditEventPageModule' },
  { path: 'event-attendance/:id', resolve:{special: DataResolverService}, loadChildren: './pages/event-attendance/event-attendance.module#EventAttendancePageModule' },
  { path: 'user-profile/:id', resolve:{special: DataResolverService}, loadChildren: './pages/user-profile/user-profile.module#UserProfilePageModule' },
  { path: 'modal-interesses', loadChildren: './pages/modal-interesses/modal-interesses.module#ModalInteressesPageModule' },
  { path: 'chat/:id', resolve:{special: DataResolverService}, loadChildren: './pages/chat/chat.module#ChatPageModule' },
  { path: 'event-invitations/:id',  resolve:{special: DataResolverService}, loadChildren: './pages/event-invitations/event-invitations.module#EventInvitationsPageModule' },
  { path: 'chat-friend-list', loadChildren: './pages/chat-friend-list/chat-friend-list.module#ChatFriendListPageModule' },
  { path: 'find-people', loadChildren: './pages/find-people/find-people.module#FindPeoplePageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
