import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Firebase } from '@ionic-native/firebase';
import { AlertController } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, splashScreen: SplashScreen, 
    private firebase: Firebase, 
    private alertCtrl: AlertController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.initPushNotifications();
      this.firebase.onNotificationOpen().subscribe(pushData => {
        // Perform futher operations push message data 
        console.log(`push message data ${JSON.stringify(pushData, null, 2)} `);
        let alert = this.alertCtrl.create({
          title: 'New Notification',
          subTitle: pushData.body,
          buttons: ['Dismiss']
        });
        alert.present();
      });
    });
  }


  /**
   * Get push device token
   * 
   *  @description :: save this device token to server-side database 
   *  and use this token to sending push messages to this device
   * 
   */
  initPushNotifications() {

    this.firebase.getToken()
      .then(token => {

        // save the token server-side and use it to push notifications to this device
        console.log(`The token is ${token}`);
      })
      .catch(error => {
        console.error('Error getting token', error)
      });
  }
}

