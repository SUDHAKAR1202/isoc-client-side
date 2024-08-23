import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../modals/login';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../services/login.service';
import { AuthHashingService } from '../services/auth-hashing.service';
import { SharedDataService } from '../shared-data/sharedservice/shared-data.service';


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
    private authHashingService: AuthHashingService,
    private raised: SharedDataService
  ) { }

  ngOnInit() {
    this.loginData = this.fb.group({
      loginid: ['', [Validators.required]],
      password: ['', Validators.required],
    
    });
  }

  onLogin() {
    this.submitClicked = true
    this.loginData.markAllAsTouched();

    this.loginObj.username = this.loginData.controls['loginid'].value;
    this.loginObj.password = this.loginData.controls['password'].value;
  
    let login = {
      username: this.loginData.controls['loginid'].value,
      password: this.loginData.controls['password'].value
    }
    
    sessionStorage.setItem('loginid',this.loginData.controls['loginid'].value)
    console.log('loginid');
    console.log(sessionStorage.getItem('loginid'));

     this.login1=this.loginData.value;
     console.log(this.login1);
    
    if (this.loginData.valid) {
this.raised.setraisedService(this.login1);     

      this.loginService.verifyLogin(login).subscribe(data => {
        switch (data.status) {
          case 200:
            sessionStorage.setItem('token', data.token);
            this.toastr.success("Login Success");
            this.router.navigate(['bugloo/dashboard'])
            break;
          case 404:
            this.toastr.error("User id / password does not exist")
            break;
          default:
            this.toastr.error("User id / password does not match")
            break;
        }
      })
    }
  }

 
}
