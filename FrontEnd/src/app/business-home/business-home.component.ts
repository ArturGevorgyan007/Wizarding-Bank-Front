import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { JwtDecoderService } from '../jwt-decoder.service';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-business-home',
  templateUrl: './business-home.component.html',
  styleUrls: ['./business-home.component.css']
})
export class BusinessHomeComponent implements OnInit {
  token: string | undefined | null = localStorage.getItem('access_token');
  constructor(private myAuthService: AuthService, private jwtDecoder: JwtDecoderService, private userData: UserDataService) { }
  ngOnInit(): void {
    console.log(this.userData.getUser())
  }

}
