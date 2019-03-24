import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app.routing';
import { ParticlesModule } from 'angular-particle';

// FIREBASE
import { FirebaseConfig } from 'src/firebase.config';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule, FirestoreSettingsToken } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';

import { NgxSpinnerModule } from 'ngx-spinner';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterComponent } from './components/register/register.component';
import { RechargeComponent } from './components/recharge/recharge.component';
import { PayComponent } from './components/pay/pay.component';
import { MainService } from './services/main.service';
import { HistoryComponent } from './components/history/history.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    FooterComponent,
    RegisterComponent,
    RechargeComponent,
    PayComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ParticlesModule,
    AngularFireModule.initializeApp(FirebaseConfig.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    NgxSpinnerModule,
  ],
  providers: [MainService],
  bootstrap: [AppComponent]
})
export class AppModule { }
