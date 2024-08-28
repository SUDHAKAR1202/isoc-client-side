import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuglooComponent } from './bugloo.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { UsersComponent } from '../users/users.component';
import { AuthGuard } from '../auth.guard';



const routes: Routes = [
    {
        path: '', component: BuglooComponent,
        children: [

        
            
           {path: 'dashboard', component: DashboardComponent , canActivate: [AuthGuard] },

           {path: 'list-users', component: UsersComponent , canActivate: [AuthGuard] }
           
         
           
            
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