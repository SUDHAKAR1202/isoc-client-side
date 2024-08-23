import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Register } from '../modals/register';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from '../services/registration.service';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationData!: FormGroup
  isLoggedin = false
  submitClicked = false
  loginObj: Register= new Register();
username: any;
email: any;
password: any;



  constructor(private router: Router, private registerService: RegisterService, private fb: FormBuilder, private toastr: ToastrService ) { }
 

  

  ngOnInit(): void {
    this.registrationData = this.fb.group({
      
      username: ['', [Validators.required]],

      email: ['', [Validators.required]],
      password: ['', Validators.required]
    })
  }

     onRegister() {
        this.submitClicked = true
        this.registrationData.markAllAsTouched();
    
        this.loginObj.username = this.registrationData.controls['username'].value;
    
        this.loginObj.email = this.registrationData.controls['email'].value;
        this.loginObj.password = this.registrationData.controls['password'].value;
    
    
        let login = {
          username: this.registrationData.controls['username'].value,
    
          email: this.registrationData.controls['email'].value,
          password: this.registrationData.controls['password'].value
        }
        if (this.registrationData.valid) {
          this.registerService.verifyRegister(login).subscribe(data => {
            switch (data.status) {
              case 200:
                sessionStorage.setItem('token', data.token);
                this.toastr.success("Registration Successfully ");
                this.router.navigate(['/login'])
                break;
              case 404:
                this.toastr.error("EmailId/ password does not exist")
                break;
              default:
                this.toastr.error("EmailId/ password does not match")
                break;
            }
          })
        }
      }

      

      
     
    
  }

