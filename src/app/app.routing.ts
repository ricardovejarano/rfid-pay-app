import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { homeRoute } from './components/home/home.routing';
import { registerRoute } from './components/register/register.routing';
import { rechargeRoute } from './components/recharge/recharge.routing';
import { pauyRoute } from './components/pay/pay.routing';
import { historyRoute } from './components/history/history.routing';

const appRoutes: Routes = [
    ...homeRoute,
    ...registerRoute,
    ...rechargeRoute,
    ...pauyRoute,
    ...historyRoute
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ], exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
