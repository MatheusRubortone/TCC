import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule }    from '@angular/common/http';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { DatePipe } from '@angular/common';
import { Http, HttpModule } from '@angular/http';
import { Moment } from 'moment';
import { FormsModule } from '@angular/forms'; 
import { ModalInteressesPageModule } from './pages/modal-interesses/modal-interesses.module';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { HTTP } from '@ionic-native/http/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
            IonicModule.forRoot(), 
            AppRoutingModule,
            HttpClientModule,
            HttpModule,
            BrowserModule,
            FormsModule],
  providers: [
    StatusBar,
    ImagePicker,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    NativeStorage,
    DatePipe,
    HTTP
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
