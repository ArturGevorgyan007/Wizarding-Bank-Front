import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { JwtDecoderService } from '../jwt-decoder.service';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';
import { AuthService } from '../auth.service';
import { UserDataService } from '../user-data.service';
import { Transaction } from '../Interfaces/transaction';
import { TransactionHistoryService } from '../transaction-history.service';
@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
})
export class UserHomeComponent implements OnInit {
  Transactions: Array<Transaction> = []

  token: string | undefined | null = localStorage.getItem('access_token');
  constructor(private transactions: TransactionHistoryService, private myAuthService: AuthService, private jwtDecoder: JwtDecoderService, private userData: UserDataService) { }
  async ngOnInit(): Promise<void> {
    this.userData.getUser()
    await this.userData.getUserId(this.userData.email)
    await this.transactions.getMostRecentTransactions(this.userData.Id).subscribe(x => {
      this.Transactions = x;
    })

  }


}
