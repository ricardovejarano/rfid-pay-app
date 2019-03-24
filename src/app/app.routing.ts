import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { homeRoute } from './components/home/home.routing';

const appRoutes: Routes = [
    ...homeRoute
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ], exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
