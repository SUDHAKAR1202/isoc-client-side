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
emailid: any;
password: any;
confirmpassword: any;
csrf_token: any;


  constructor(private router: Router, private registerService: RegisterService, private fb: FormBuilder, private toastr: ToastrService ) { }
 

  

  ngOnInit(): void {
    this.registrationData = this.fb.group({
     
      username: ['', [Validators.required]],

      emailid: ['', [Validators.required]],
      password: ['', Validators.required]
    })
  }
  onRegister() {
    
if (this.registrationData.valid) {
     
      
        this.username = this.registrationData.controls['username'].value,
  
        this.emailid =  this.registrationData.controls['emailid'].value,
        this.password =  this.registrationData.controls['password'].value
    

        this.registerService.registerUser(this.username,this.emailid, this.password).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          this.toastr.success('Registration successful');
        },
        error: (e) => {
          console.error('Registration failed', e);
          this.toastr.error('Registration failed');
        }
      })

      

      
     
    }
  }
}
