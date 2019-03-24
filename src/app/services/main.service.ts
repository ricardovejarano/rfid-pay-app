import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  constructor(public afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase) { }


  getUidCard() {
    return firebase.database().ref(`uidRegister`);
  }

  trueRegisterFLag() {
    const myRefSale = this.afDatabase.object(`flagRegister`);
    const myRefSale2 = this.afDatabase.object(`flagPay`);
    myRefSale2.set('false');
    return myRefSale.set('true');
  }

  adduser(user: User) {
    const myRefSale = this.afDatabase.object(`/users/${user.code}`);
    return myRefSale.set(user);
  }
}
