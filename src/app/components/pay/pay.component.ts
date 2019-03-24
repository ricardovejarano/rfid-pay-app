import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MainService } from 'src/app/services/main.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { Bill } from 'src/app/models/bill';
declare var jQuery: any;
declare var M: any;

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {
  // Particles
  myStyle: object = {};
  myParams: object = {};
  width = 100;
  height = 100;

  user: User = new User();
  users: User[];
  bill: Bill = new Bill();
  ref = '';
  myDate = '';
  date = new Date();
  allDate = [];
  todayDate = '';
  flag = false;

  constructor(public spinner: NgxSpinnerService, public mainService: MainService, public router: Router) { }

  ngOnInit() {
    this.initialiceParticles();
    this.getUsers();
  }

  paySubmit() {
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
            if (this.flag === false) {
              this.determineAcion();
              this.flag = true;
            }
          }
          // this.prueba(snapshot.val());
        }
      }.bind(this), function (error) {
        console.log('Error: ' + error.code);
      });
  }

  determineAcion() {
    if (this.user.balance > this.bill.value) {
      this.user.balance = this.user.balance - this.bill.value;
      this.discount();
    } else {
      this.spinner.hide();
      M.toast({ html: 'No posee saldo suficiente', classes: 'indigo darken-3 rounded' });
      this.router.navigate(['recharge']);
    }
  }

  discount() {
    this.mainService.discountBalance(this.user)
      .then(res => {
        this.mainService.falsePayFLag();
        this.mainService.deleteUidPay();
        this.spinner.hide();
        M.toast({ html: 'Pago realizado con éxito', classes: 'indigo darken-3 rounded' });
        this.flag = false;
        this.ref = '';
        this.bill.value = null;
        console.log(res);
      }, err => {
        this.spinner.hide();
        this.flag = false;
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
        this.initSelector();
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

  onchange(event) {
    for (let x = 0; x < this.users.length; x++) {
      if (this.users[x].uidCard === event) {
        this.user = this.users[x];
        this.bill.email = this.users[x].email;
        this.bill.code = this.users[x].code;
        this.bill.ref = this.ref;

        this.myDate = new Date(this.date.getTime()).toISOString();
        this.allDate = this.myDate.replace('T', '-').split('-');
        this.todayDate = this.allDate[0] + '-' + this.allDate[1] + '-' + this.allDate[2];

        this.bill.date = this.todayDate;
      }
    }
  }

  initSelector() {
    jQuery(document).ready(function () {
      jQuery('select').formSelect();
    });
  }

}
