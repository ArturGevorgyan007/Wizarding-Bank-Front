import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  apiRoot: string = 'http://localhost:5070/';

  constructor(private http: HttpClient) {}
  //When sending money to self, recipient = id, sender = null
  //Card-to-wallet

  cardToWallet(cardID, userID, amount){
    
  }

  //wallet-to-card

  walletToCard(userID, cardID, amount) {
    
  }

  //bankAccount-to-wallet
  accountToWallet(accountID, userID, amount) {
    
  }
  //wallet-to-bankAccount
  walletToAccount(userID, accountID, amount) {
    
  }
  
}
