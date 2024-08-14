import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Register } from '../modals/register';


@Component({
  selector: 'app-register',
  template: './registration.component.html'
})
export class RegisterComponent {
  constructor(private loginService: LoginService) { }

  onRegister(user: Register) {
    this.loginService.registerUser(user)
      .subscribe(
        response => {
          console.log('Registration successful:', response);
        },
        error => {
          console.log('Registration failed:', error);
        }
      );
  }
}