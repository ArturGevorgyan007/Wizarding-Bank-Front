import { Component, OnInit } from '@angular/core';
import { Transaction } from '../Interfaces/transaction';
import { UserDataService } from '../user-data.service';
import { TransactionHistoryService } from '../transaction-history.service';
import { CookieService } from '../../../node_modules/ngx-cookie-service';

@Component({
  selector: 'app-view-all-transactions',
  templateUrl: './view-all-transactions.component.html',
  styleUrls: ['./view-all-transactions.component.css']
})
export class ViewAllTransactionsComponent implements OnInit {
  Transactions: Array<Transaction> = [];
  user: string | undefined;
  constructor(private cookieService: CookieService, private userData: UserDataService, private _transactions: TransactionHistoryService) { }

  ngOnInit(): void {
    this.userData.retrieveUserIdFromDB(this.cookieService.get('email')).subscribe(x => {
      this.userData.Id = x;
      this.user = this.cookieService.get('email');
      this._transactions.getTransactions(x).subscribe(w => {
        this.Transactions = w;
      })
    })
  }

}