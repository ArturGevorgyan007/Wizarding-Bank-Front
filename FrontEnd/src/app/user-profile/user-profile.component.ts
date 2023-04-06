import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Form } from '@angular/forms';
import { UserDataService } from '../user-data.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{

  constructor(private router: Router, private uds: UserDataService){}

  Email : string = "";

  ngOnInit(): void {
    this.Email = this.uds.getUser();
  }

  saveProfile(event : Event){
    this.router.navigate(['/UserHome']);
  }
}