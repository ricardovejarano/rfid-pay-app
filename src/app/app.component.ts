import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

@Component({
  selector: 'app-root',
  template: `
  <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  rootPage: any;
  constructor(public router: Router) {
    this.rootPage = HomeComponent;
  }
}
