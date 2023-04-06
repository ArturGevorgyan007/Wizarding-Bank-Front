import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { UserDataService } from '../user-data.service';


@Component({
  selector: 'app-wallet-page',
  templateUrl: './wallet-page.component.html',
  styleUrls: ['./wallet-page.component.css']
})
export class WalletPageComponent implements OnInit{
  
  _amount : any = ""; 
  cardList : Card[] = [];
  bankList : bankAccount[] = [];

  constructor(private route : Router, private service : UserDataService){}

  ngOnInit(): void {
    this.getCurrentAmount();
    this.displayAccounts();
    this.displayCards();
  }

  linkCardorAcct(){}

  transferMoney(){
    //this needs to send first card and first account to transfer money page
    this.route.navigateByUrl('TransferMoney');
  }

  getCurrentAmount(){
    //getWalletBalance
    this._amount = 10;
  }

  displayAccounts(){
    this.service.getUserAccounts(1).subscribe(data => {
      console.log(data);
      for(let i = 0; i < data.length; i++){
        let bacct = {} as bankAccount;
        bacct.acctNum = data[i]['accountNumber'];
        bacct.balance = data[i]['balance'];
        bacct.bankAcctId = data[i]['id'];
        this.bankList.push(bacct);
      }
      console.log(this.bankList);
    });
  }

  displayCards(){
    this.service.getUserCards(1).subscribe(data => {
      console.log(data);
      for(let i = 0; i < data.length; i++){
        let card = {} as Card; 
        card.cardId = data[i]['id'];
        card.balance = data[i]['balance'];
        card.cardNumber = data[i]['cardNumber'];
        card.cvv = data[i]['cvv'];
        card.expDate = data[i]['expiryDate'];
        this.cardList.push(card);
      }
      console.log(this.cardList);
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
