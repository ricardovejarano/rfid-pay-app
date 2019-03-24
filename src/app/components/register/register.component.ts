import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { NgxSpinnerService } from 'ngx-spinner';
import { MainService } from 'src/app/services/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User();
  done = false;
  constructor(public spinner: NgxSpinnerService, public mainService: MainService, public router: Router) { }

  ngOnInit() {
  }

  registerSubmit() {
    this.setRegisterFlag();
    this.spinner.show();
    console.log(this.user);
  }

  setRegisterFlag() {
    this.mainService.trueRegisterFLag()
      .then(res => {
        console.log(res);
        this.getUidFromCard();
      }, err => {
        console.log(err);
      });
  }

  getUidFromCard() {
    console.log('dd');
    this.mainService.getUidCard()
      .on('value', function (snapshot) {
        console.log(snapshot.val());
        if (snapshot.val()) {
          this.prueba(snapshot.val());
        }
      }.bind(this), function (error) {
        console.log('Error: ' + error.code);
      });
  }

  prueba(uid) {
    this.user.uidCard = uid;
    this.mainService.adduser(this.user)
      .then(res => {
        this.spinner.hide();
        this.done = true;
        this.downSpinner();
        console.log('succes');
        this.router.navigate(['']);
      }, err => {
        console.log(err);
        this.spinner.hide();
      });
    console.log('SALE', uid);
    this.spinner.hide();
  }

  downSpinner() {
    this.spinner.hide();

  }

}
