import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { NgxSpinnerService } from 'ngx-spinner';
import { MainService } from 'src/app/services/main.service';
import { Router } from '@angular/router';
declare var M: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // Particles
  myStyle: object = {};
  myParams: object = {};
  width = 100;
  height = 100;


  user: User = new User();
  done = false;
  constructor(public spinner: NgxSpinnerService, public mainService: MainService, public router: Router) { }

  ngOnInit() {
    this.initialiceParticles();
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
        this.done = true;
        this.deactivateUidRegister();
      }, err => {
        console.log(err);
        this.spinner.hide();
      });
    console.log('SALE', uid);
    // this.spinner.hide();
  }


  deactivateUidRegister() {
    this.mainService.falseRegisterFLag()
      .then(res => {
        this.deleteUidUserTemp();
        console.log(res);
      }, err => {
        console.log(err);
      });
  }

  deleteUidUserTemp() {
    this.mainService.deleteUidRegister()
      .then(res => {
        this.router.navigate(['']);
        this.spinner.hide();
        M.toast({ html: 'Usuario Registrado', classes: 'indigo darken-3 rounded' });
        console.log(res);
      }, err => {
        console.log(err);
      });
  }

  initialiceParticles() {
    console.log('Inicializa');
    this.myStyle = {
      'position': 'fixed',
      'width': '100%',
      'height': '100%',
      'z-index': -1,
      'top': 0,
      'left': 0,
      'right': 0,
      'bottom': 0,
    };

    this.myParams = {
      particles: {
        number: {
          value: 25,
        },
        color: {
          value: '#1a237e'
        },
        shape: {
          type: 'edge',
        },
        size: {
          value: 27
        }
      }
    };
  }

}
