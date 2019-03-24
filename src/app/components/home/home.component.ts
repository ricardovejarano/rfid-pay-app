import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  myStyle: object = {};
  myParams: object = {};
  width = 100;
  height = 100;

  constructor(public router: Router) { }

  ngOnInit() {
    this.initialiceParticles();
  }

  register() {
    this.router.navigate(['register']);
  }

  recharge() {
    this.router.navigate(['recharge']);
  }

  pay() {
    this.router.navigate(['pay']);
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
