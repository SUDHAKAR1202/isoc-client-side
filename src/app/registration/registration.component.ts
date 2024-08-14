import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Register } from '../modals/register';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../services/login.service';




@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  loginData!: FormGroup
  isLoggedin = false
  submitClicked = false
  loginObj: Register= new Register();
  constructor(private router: Router, private loginService: LoginService, private fb: FormBuilder, private toastr: ToastrService ) { }
 

  

  ngOnInit(): void {
    this.loginData = this.fb.group({
     
      username: ['', [Validators.required]],

      emailid: ['', [Validators.required]],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required]
    })
  }
  onRegister() {
    this.submitClicked = true
    this.loginData.markAllAsTouched();

    this.loginObj.username = this.loginData.controls['username'].value;

    this.loginObj.emailid = this.loginData.controls['emailid'].value;
    this.loginObj.password = this.loginData.controls['password'].value;
    this.loginObj.confirmpassword = this.loginData.controls['confirmpassword'].value;


 
    if (this.loginData.valid) {
     
      const registrationData = {
        username: this.loginData.controls['username'].value,
  
        emailid: this.loginData.controls['emailid'].value,
        password: this.loginData.controls['password'].value,
        confirmpassword: this.loginData.controls['confirmpassword'].value
      };

      

      
     
    }
  }
}
