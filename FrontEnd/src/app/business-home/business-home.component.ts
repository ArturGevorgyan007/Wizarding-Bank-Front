import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { JwtDecoderService } from '../jwt-decoder.service';
import { UserDataService } from '../user-data.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Transaction } from '../Interfaces/transaction';

@Component({
  selector: 'app-business-home',
  templateUrl: './business-home.component.html',
  styleUrls: ['./business-home.component.css']
})
export class BusinessHomeComponent implements OnInit {
  Transactions: Array<Transaction> = []
  user: string | undefined;
  token: string | undefined | null = localStorage.getItem('access_token');
  _wallet: any = "";
  constructor(private jwtDecoder: JwtDecoderService, private userData: UserDataService, private cookieService: CookieService, private router: Router, public authService: AuthService) { }

  ngOnInit(): void {
    this.userData.email = this.cookieService.get('email')
    this.userData.Id = this.cookieService.get('userId')
    console.log(this.userData.Id)
    this.getWalletAmount(this.userData.Id)
  }

  getWalletAmount(id: any) {
    //getWalletBalance
    this.userData.getWalletBalance(id).subscribe(data => {
      this._wallet = data['wallet'];
    });
  }

}
