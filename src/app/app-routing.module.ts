import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  //{ path: '', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
  { path: '', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'tabs', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: '', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
  { path: 'saved-events', loadChildren: './pages/saved-events/saved-events.module#SavedEventsPageModule' },
  { path: 'confirmed-events', loadChildren: './pages/confirmed-events/confirmed-events.module#ConfirmedEventsPageModule' },
  { path: 'created-events', loadChildren: './pages/created-events/created-events.module#CreatedEventsPageModule' },
  { path: 'create-event', loadChildren: './pages/create-event/create-event.module#CreateEventPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
