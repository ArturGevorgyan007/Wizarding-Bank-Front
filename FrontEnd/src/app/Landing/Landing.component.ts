import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Auth0Client } from '@auth0/auth0-spa-js';
import { JwtModule } from "@auth0/angular-jwt";
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  personalAuth0: Auth0Client = new Auth0Client({
    domain: 'dev-z8ypmdswd2nbh4n2.us.auth0.com',
    clientId: 'Zq0rCWWoR0q3QHWpfAcT2wizKAqtTDYJ',
    authorizationParams: {
      redirect_uri: 'http://localhost:4200/UserHome/'
    }
  })
  businessAuth0: Auth0Client = new Auth0Client({
    domain: 'dev-z8ypmdswd2nbh4n2.us.auth0.com',
    clientId: '3723m9sPuC9l6thbtyOLBQpfdzjQuxrS',
    authorizationParams: {
      redirect_uri: 'http://localhost:4200/BusinessHome'
    }
  })
  constructor(private router: Router, private authService: AuthService) { }
  async login() {
    this.authService.loginWithRedirect({ authorizationParams: { redirect_url: 'http://localhost:4200/UserHome/' } });
    console.log(this.personalAuth0.getUser())

  }
  businessLogin() {
    this.businessAuth0.loginWithRedirect({ authorizationParams: { redirect_url: 'http://localhost:4200/UserHome' } });
  }

}
