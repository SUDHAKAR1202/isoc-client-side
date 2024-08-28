import { NgModule } from '@angular/core';
import { RouterModule, Routes ,ActivatedRoute} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [

  {path: '' , component:AppComponent,
    children: [
      {path: '', redirectTo: 'login', pathMatch: 'full' },
      {path: 'login', component:LoginComponent},
      {path: 'register', component:RegistrationComponent},

      {path: 'bugloo', loadChildren: () => import('./Bugloo/bugloo.module').then(module => module.BuglooModule), canActivate: [AuthGuard]},
    ],
  },
  ]

@NgModule({
  imports: [RouterModule.forRoot(routes),BrowserModule,CommonModule],
  exports: [RouterModule,BrowserModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
