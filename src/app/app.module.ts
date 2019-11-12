import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireModule} from  '@angular/fire';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,AngularFireDatabaseModule, AngularFireModule.initializeApp(
    {
      apiKey: "AIzaSyB4PHop0TXppX9t38Wmz0kUURYEb9uSUaA",
      authDomain: "stif-c99ad.firebaseapp.com",
      databaseURL: "https://stif-c99ad.firebaseio.com",
      projectId: "stif-c99ad",
      storageBucket: "stif-c99ad.appspot.com",
      messagingSenderId: "395732242957",
      appId: "1:395732242957:web:5259ec367140c89e49fb44",
      measurementId: "G-RWRRG47VEV"
    }
  )],
  providers: [
    StatusBar,
    AngularFireAuth,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
