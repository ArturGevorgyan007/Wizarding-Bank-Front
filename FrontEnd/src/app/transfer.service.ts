import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from './models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  apiRoot: string = 'http://localhost:5092/';
  //apiRoot: string = 'https://wiz-back.azurewebsites.net/';

  constructor(private http: HttpClient) {}
  //When sending money to self, recipient = id, sender = null
  //TODO: wrap functions to accept name email etc
  //Card-to-wallet
  cardToWallet(cardId : number, userId : number, amount : number) : Observable<any>{
    var body : Transaction = {
      "cardId": cardId,
      "recipientId": userId,
      "amount": amount
    };
    return this.http.post(this.apiRoot + 'Transaction/transaction/internal?type=3', body) as Observable<any>; 
  }
  
  //wallet-to-card
  walletToCard(userId : number, cardId : number, amount : number) : Observable<any> {
    var body : Transaction = {
      "senderId": userId,
      "cardId": cardId,
      "amount": amount,
    };
    return this.http.post(this.apiRoot + 'Transaction/transaction/internal?type=2', body) as Observable<any>; 
  }

  //bankAccount-to-wallet
  accountToWallet(accountId : number, userId : number, amount : number) : Observable<any> {
    var body : Transaction = {
      "accountId": accountId,
      "recipientId": userId,
      "amount": amount
    };
    return this.http.post(this.apiRoot + 'Transaction/transaction/internal?type=4', body) as Observable<any>; 
  }

  //wallet-to-bankAccount
  walletToAccount(userId : number, accountId : number, amount : number) : Observable<any> {
    var body : Transaction = {
      "accountId": accountId,
      "senderId": userId,
      "amount": amount
    };
    return this.http.post(this.apiRoot + 'Transaction/transaction/internal?type=1', body) as Observable<any>; 
  }
  
  requestMoney(userId : number, amount : number, recipientId : number, description : string) : Observable<any> {
    var body : Transaction = {
      "amount": amount,
      "description": "Request: " + description,
      "recipientId": userId,
      "status": 1,
      "senderId": recipientId
    };
    return this.http.post(this.apiRoot + "Transaction/", body) as Observable<any>;
  }

  userToUser(userId : number, amount : number, recipientId : number, description : string) : Observable<any>{
    var body : Transaction = {
      "amount": amount,
      "description": description,
      "recipientId": recipientId,
      "status": 0,
      "senderId": userId
    };
    return this.http.post(this.apiRoot + "Transaction/transaction/userToUser", body) as Observable<any>;
  }


  updateRequest(userId : number, amount : number, recipientId : number, description : string, id : number): Observable<any>{
    var body : Transaction = {
      "id": id,
      "amount": amount,
      "description": description,
      "recipientId": recipientId,
      "status": 1,
      "senderId": userId
    };

    return this.http.put(this.apiRoot + "Transaction/", body) as Observable<any>
    
  }
}
