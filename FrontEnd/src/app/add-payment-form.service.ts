import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from './Interfaces/Card';
import { Account } from './Interfaces/Account';

@Injectable({
  providedIn: 'root'
})

export class PaymentFormService {
  constructor(private http: HttpClient) { }
  
  // apiroot : string = "https://wizardingbankapi.azurewebsites.net"
  apiroot : string = "https://localhost:4200"

  addCard(newCard: Card): Observable<Card> {
    return this.http.post(this.apiroot+'/Card/Add', newCard) as Observable<Card>;
  }

  addAccount(newAccount: Account): Observable<Account> {
    return this.http.post(this.apiroot+'/Account/Add', newAccount) as Observable<Account>;
  }
}