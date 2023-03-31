import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { JwtDecoderService } from '../jwt-decoder.service';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  token: string | undefined | null = localStorage.getItem('access_token');
  constructor(private myAuthService: AuthService, private jwtDecoder: JwtDecoderService) { }
  ngOnInit(): void {
    // this.authService.isAuthenticated$.subscribe(isAuthenticated => {
    //   if (isAuthenticated) {
    //     this.authService.getAccessTokenSilently().subscribe(token => {
    //       this.myAuthService.token = token;
    //     });
    //   } else {
    //     console.log('not Authenticated')
    //   }
    // });
  }
  printJWT(): void {
    if (this.myAuthService.token) {
      console.log(JSON.parse(this.myAuthService.token))

    }
  }

}
