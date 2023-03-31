import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Auth0Client, createAuth0Client } from '@auth0/auth0-spa-js';
import { JwtModule } from "@auth0/angular-jwt";
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { UserDataService } from '../user-data.service';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  personalAuth0: Auth0Client = new Auth0Client({
    domain: 'dev-z8ypmdswd2nbh4n2.us.auth0.com',
    clientId: 'Zq0rCWWoR0q3QHWpfAcT2wizKAqtTDYJ',
    authorizationParams: {
      redirect_uri: 'http://localhost:4200/',
      audience: "https://dev-z8ypmdswd2nbh4n2.us.auth0.com/api/v2/",
      scope: "openid profile email"
    },

  })
  businessAuth0: Auth0Client = new Auth0Client({
    domain: 'dev-z8ypmdswd2nbh4n2.us.auth0.com',
    clientId: '3723m9sPuC9l6thbtyOLBQpfdzjQuxrS',
    authorizationParams: {
      redirect_uri: 'http://localhost:4200/BusinessHome'
    }
  })
  constructor(private router: Router, public authService: AuthService, public userData: UserDataService) { }
  async ngOnInit(): Promise<void> {
    this.authService.user$.subscribe(c => {
      if (c) {
        if (c["email"]) {
          this.userData.addUser(c["email"]);
          console.log(this.userData.getUser());

        }
      }
    })
  }

  async login() {
    this.personalAuth0.loginWithRedirect({ authorizationParams: { redirect_uri: 'http://localhost:4200' } });
  }
  businessLogin() {
    this.businessAuth0.loginWithRedirect({ authorizationParams: { redirect_uri: 'http://localhost:4200/UserHome' } });
  }
  LogOut() {
    this.personalAuth0.logout();

  }

}
