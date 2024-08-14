import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../modals/login';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../services/login.service';
import { AuthHashingService } from '../services/auth-hashing.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData!: FormGroup;
  isLoggedin = false;
  submitClicked = false;
  login1: any = sessionStorage.getItem('loginid');
  loginObj: Login = new Login();
  loginid: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private loginService: LoginService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private authHashingService: AuthHashingService
  ) { }

  ngOnInit() {
    this.loginData = this.fb.group({
      loginid: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginData.valid) {
      const loginData = {
        loginid: this.loginData.value.loginid,
        password: this.authHashingService.hashPassword(this.loginData.value.password),
      };
      this.loginService.loginUser(loginData).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          this.toastr.success('Login successful');
        },
        error: (e) => {
          console.error('Login failed', e);
          this.toastr.error('Login failed');
        }
      });
    }
  }
}
