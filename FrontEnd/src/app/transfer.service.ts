import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from './models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  apiRoot: string = 'http://localhost:5070/';

  constructor(private http: HttpClient) {}
  //When sending money to self, recipient = id, sender = null
  //TODO: wrap functions to accept name email etc
  //Card-to-wallet
  cardToWallet(cardID : number, userID : number, amount : number){
    
  }

  //wallet-to-card

  walletToCard(userID : number, cardID : number, amount : number) {
    
  }

  //bankAccount-to-wallet
  accountToWallet(accountID : number, userID : number, amount : number) {
    
  }
  //wallet-to-bankAccount
  walletToAccount(userID : number, accountID : number, amount : number) {
    
  }
  
}
