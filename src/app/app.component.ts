import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

@Component({
  selector: 'app-root',
  template: `
  <app-nav-bar></app-nav-bar>
  <router-outlet></router-outlet>
  <app-footer></app-footer>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  rootPage: any;
  constructor(public router: Router) {
    this.rootPage = HomeComponent;
  }
}
