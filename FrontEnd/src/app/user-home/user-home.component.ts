import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { JwtDecoderService } from '../jwt-decoder.service';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';
import { AuthService } from '../auth.service';
import { UserDataService } from '../user-data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  token: string | undefined | null = localStorage.getItem('access_token');
  constructor(private myAuthService: AuthService, private jwtDecoder: JwtDecoderService, private userData: UserDataService, private route: Router) { }
  ngOnInit(): void {
    console.log(this.userData.getUser())
    this.route.navigate(['/UserHome']);
  }


}
