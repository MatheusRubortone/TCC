import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(private loadingController: LoadingController ) { }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Carregando...',
      translucent: true,
      spinner:'crescent'
    });
    return await loading.present();
  }

  dismiss(){
    this.loadingController.dismiss();
  }

}
