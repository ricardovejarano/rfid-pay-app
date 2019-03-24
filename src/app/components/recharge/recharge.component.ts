import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MainService } from 'src/app/services/main.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
declare var M: any;

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.component.html',
  styleUrls: ['./recharge.component.css']
})
export class RechargeComponent implements OnInit {
  // Particles
  myStyle: object = {};
  myParams: object = {};
  width = 100;
  height = 100;

  user: User = new User();
  users: User[];
  valueToRecharge = null;

  constructor(public spinner: NgxSpinnerService, public mainService: MainService, public router: Router) { }

  ngOnInit() {
    this.initialiceParticles();
    this.getUsers();
    this.mainService.falsePayFLag();
  }

  clickedCard(userClicked: User) {
    console.log(userClicked);
    this.user = userClicked;
  }

  rechargeSubmit() {
    if (this.valueToRecharge > 0) {
      const nuevoBalance = (this.user.balance + this.valueToRecharge);
      console.log('Nuevo Balance', nuevoBalance);
      this.user.balance = nuevoBalance;
      this.lookForCard();
    } else {
      M.toast({ html: 'Valor erroneo', classes: 'indigo darken-3 rounded' });
    }
  }

  lookForCard() {
    this.spinner.show();
    this.mainService.trueRegisterFLagPay()
      .then(res => {
        console.log(res);
        this.compareuidCards();
      }, err => {
        console.log(err);
      });
  }

  compareuidCards() {
    console.log('dd');
    this.mainService.getUidCardRecharge()
      .on('value', function (snapshot) {
        console.log(snapshot.val());
        if (snapshot.val()) {
          if (snapshot.val() === this.user.uidCard) {
            this.updateInfo();
          }
          // this.prueba(snapshot.val());
        }
      }.bind(this), function (error) {
        console.log('Error: ' + error.code);
      });
  }

  updateInfo() {
    this.mainService.updateBalance(this.user)
      .then(res => {
        console.log(res);
        this.spinner.hide();
        this.mainService.falsePayFLag();
        this.mainService.deleteUidPay();
        M.toast({ html: 'Recarga Stisfactoria', classes: 'indigo darken-3 rounded' });
        this.valueToRecharge = null;
        this.user = new User();
      }, err => {
        console.log(err);
      });
  }

  getUsers() {
    this.mainService.getUsers()
      .snapshotChanges().subscribe(item => {
        this.users = [];
        item.forEach(element => {
          const x = element.payload.toJSON();
          this.users.push(x as User);
        });
        console.log(this.users);
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
