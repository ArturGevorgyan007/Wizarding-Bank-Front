import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from './Interfaces/Card';
import { Account } from './Interfaces/Account';

@Injectable({
    providedIn: 'root'
})
export class PaymentFormService{
    constructor(private http: HttpClient){}
    
  addCard(newCard : Card) : Observable<Card> {
    return this.http.post('http://localhost:5092/Card/Add', newCard) as Observable<Card>;
  }
  
  addAccount(newAccount : Account) : Observable<Account> {
    return this.http.post('http://localhost:5092/Account/Add', newAccount) as Observable<Account>;
  }
}