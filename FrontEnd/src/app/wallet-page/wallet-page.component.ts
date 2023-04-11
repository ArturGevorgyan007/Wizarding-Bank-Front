import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserDataService } from '../user-data.service';
import {of} from 'rxjs'
import { CookieService } from '../../../node_modules/ngx-cookie-service';


@Component({
  selector: 'app-wallet-page',
  templateUrl: './wallet-page.component.html',
  styleUrls: ['./wallet-page.component.css']
})
export class WalletPageComponent implements OnInit{
  
  constructor(private route : Router, private service : UserDataService, private cookieService : CookieService){}

  _amount : any = ""; 
  userID : any = "";
  cardList : Card[] = [];
  bankList : bankAccount[] = [];
  type : any; 

  ngOnInit(): void {
    if (this.cookieService.get('userType') == 'Business') {
      console.log("THIS IS A BUSINESS");
    } else if(this.cookieService.get('userType') == 'Personal'){
      console.log("THIS IS PERSONAL");
    }
    //this.userID = parseInt(this.cookieService.get('userId')) ;
   // this.getCurrentAmount(this.userID);
    //this.displayAccounts(this.userID);
   // this.displayCards(this.userID);
  }

  linkCardorAcct(){}

  transferMoney(){
    //this needs to send first card and first account to transfer money page
    this.route.navigateByUrl('TransferMoney');
  }

  getCurrentAmount(id : any){
    //getWalletBalance
    this.service.getWalletBalance(id).subscribe(data => {
      this._amount = data['wallet'];
    });
  }

  displayAccounts(id : any){
    this.service.getUserAccounts(id).subscribe(data => {
      for(let i = 0; i < data.length; i++){
        let bacct = {} as bankAccount;
        bacct.acctNum = data[i]['accountNumber'];
        bacct.balance = data[i]['balance'];
        bacct.bankAcctId = data[i]['id'];
        this.bankList.push(bacct);
      }
    });
  }

  displayCards(id : any){
    this.service.getUserCards(id).subscribe(data => {
      for(let i = 0; i < data.length; i++){
        let card = {} as Card; 
        card.cardId = data[i]['id'];
        card.balance = data[i]['balance'];
        card.cardNumber = data[i]['cardNumber'];
        card.cvv = data[i]['cvv'];
        card.expDate = data[i]['expiryDate'];
        this.cardList.push(card);
      }
    });
  }
}

export interface Card{
  cardId : any, 
  cardNumber : any, 
  cvv : any, 
  expDate : Date, 
  balance : any
}

export interface bankAccount{
  bankAcctId : any, 
  acctNum : any, 
  routingNum : any, 
  balance : any
}
