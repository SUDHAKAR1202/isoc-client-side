import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { UsersDataService } from '../services/users-data.service';
import{Export2Excel} from 'src/app/exportexcel';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [Export2Excel]
})
export class UsersComponent  {

  listofUsers: any = [];
  
  users: any = [];
  
  searchText: any;

  currentPg: any;

  resultsLength = 0;
  currentPage = 0;
  pageSize = 2;

  bsModalRef: any;

  filterName: string = '';
  filterEmail: string = '';
  searchTerm: string = '';

  data: any;
  constructor(private router: Router, private fb: FormBuilder,  private modalService: BsModalService,public export2Excel: Export2Excel, private userData: UsersDataService) { 

    this.userData.users().subscribe((data) => {
      console.warn('data', data);
      this.listofUsers = data;
     })
  }

  get filteredUsers(): any[] {
    return this.listofUsers.filter(user => {
      const nameMatch = user.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const emailMatch = user.email.toLowerCase().includes(this.searchTerm.toLowerCase());
      return nameMatch || emailMatch;
    });
  }
 
  exportExcel(){
    
    this.export2Excel.exportJSON2XL(this.listofUsers, 'Users')
}

}


