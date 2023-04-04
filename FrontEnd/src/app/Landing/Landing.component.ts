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
  styleUrls: ['./landing.component.css'],
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
      redirect_uri: 'http://localhost:4200'
    }
  })
  constructor(private router: Router, public authService: AuthService, public userData: UserDataService) { }
  async ngOnInit(): Promise<void> {
    if (this.authService.isAuthenticated$) {
      await this.authService.user$.subscribe(c => {
        if (c) {
          console.log(c)
          if (c["email"]) {
            this.userData.getUserEmailFromAuth0(c["email"]);
            this.router.navigate(['/UserHome'])
          }
        }
      })
    }
  }

  async login() {
    try {
      this.businessAuth0.logout()
      this.personalAuth0.logout()
    } catch (Exception) { }
    this.personalAuth0.loginWithRedirect({ authorizationParams: { redirect_uri: 'http://localhost:4200/' } });
  }
  businessLogin() {
    try {
      this.personalAuth0.logout()
      this.businessAuth0.logout()
    } catch (Exception) { }
    this.businessAuth0.loginWithRedirect({ authorizationParams: { redirect_uri: 'http://localhost:4200/' } });
  }



}
