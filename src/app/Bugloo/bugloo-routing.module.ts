import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { BuglooComponent } from './bugloo.component';
import { RegistrationComponent } from '../registration/registration.component';
import { DashboardComponent } from '../dashboard/dashboard.component';



const routes: Routes = [
    {
        path: '', component: BuglooComponent,
        children: [

            {path: 'login', component: LoginComponent},
            {path: 'register', component: RegistrationComponent},
            
           {path: 'dashboard', component: DashboardComponent},
           
         
           
            
        ]
    }
]

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [RouterModule]
})

export class BuglooRoutingModule { }