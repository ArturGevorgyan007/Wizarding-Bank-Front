import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Form } from '@angular/forms';
import { UserDataService } from '../user-data.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{

  constructor(private router: Router, private uds: UserDataService, private cookie: CookieService){}

  Email : string = "";
  name : string = "";
  address : string = "";
  username : string = "";
  userObj : any = {};
  
  ngOnInit(): void {
    this.Email = this.cookie.get('email');
    this.uds.getUser();
    this.uds.retrieveUserIdFromDB(this.uds.getUser()).subscribe(data => {
      this.uds.Id = data;
    });
    this.uds.getFullPersonalUser(this.uds.Id).subscribe(data => {
      this.userObj = data;
      this.name = data[0].fullName;
      this.address = data[0].address;
      this.username = data[0].username;
    });
  }

  onKey(event: any, field: string) {
    const inputValue = event.target.value;
    if (field === 'name') {
      this.name = inputValue;
    } else if (field === 'address') {
      this.address = inputValue;
    }
  }

  saveProfile(event : Event){
    this.userObj[0].fullName = this.name;
    this.userObj[0].address = this.address;
    this.uds.updateUserProfile(this.userObj[0]).subscribe(data => console.log(data));
    this.router.navigate(['/UserHome']);
  }

  exit(event : Event) {
    this.router.navigate(['/UserHome']);
  }
}