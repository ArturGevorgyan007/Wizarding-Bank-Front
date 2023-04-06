import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { UserDataService } from '../user-data.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private cookieService: CookieService, private authService: AuthService, private userData: UserDataService) { }
  Logout(): void {
    this.cookieService.set('userType', '')
    this.cookieService.set('email', '')
    this.authService.logout()
  }
}
