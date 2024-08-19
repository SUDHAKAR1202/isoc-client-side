import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {

  constructor(private router: Router) { }
  // userObj: User = new User()
  userObj: any
  ngOnInit(): void {

    if (sessionStorage.getItem('isUserAuthenticated')) {
      //this.userObj = JSON.parse(sessionStorage.getItem('userObj') || '')
    }

  }

  onLogout() {
    sessionStorage.removeItem('isUserAuthenticated')
    sessionStorage.removeItem('userObj')
    this.router.navigate(['/login'])
    sessionStorage.clear();
  }

}
