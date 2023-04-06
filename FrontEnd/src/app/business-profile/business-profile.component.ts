import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from '../user-data.service';


@Component({
  selector: 'app-business-profile',
  templateUrl: './business-profile.component.html',
  styleUrls: ['./business-profile.component.css']
})
export class BusinessProfileComponent {

  constructor(private router: Router, private uds: UserDataService){}

  saveProfile(event : Event){
    this.router.navigate(['/BusinessHome']);
  }
}
