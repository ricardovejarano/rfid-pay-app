import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MainService } from 'src/app/services/main.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { Bill } from 'src/app/models/bill';
declare var jQuery: any;
declare var M: any;

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  // Particles
  myStyle: object = {};
  myParams: object = {};
  width = 100;
  height = 100;

  user: User = new User();
  users: User[];
  bills: Bill[];

  constructor(public spinner: NgxSpinnerService, public mainService: MainService, public router: Router) { }

  ngOnInit() {
    this.initialiceParticles();
    this.getUsers();
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
    this.mainService.getBills(event)
      .snapshotChanges().subscribe(item => {
        this.bills = [];
        item.forEach(element => {
          const x = element.payload.toJSON();
          this.bills.push(x as Bill);
        });
      });

  }

  initSelector() {
    jQuery(document).ready(function () {
      jQuery('select').formSelect();
    });
  }

}
