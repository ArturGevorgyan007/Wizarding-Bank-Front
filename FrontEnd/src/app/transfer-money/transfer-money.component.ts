import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Card, bankAccount } from '../wallet-page/wallet-page.component';
import {  TransferService } from '../transfer.service';
import { UserDataService } from '../user-data.service';
import { CookieService } from '../../../node_modules/ngx-cookie-service';

@Component({
  selector: 'app-transfer-money-component',
  templateUrl: './transfer-money.component.html',
  styleUrls: ['./transfer-money.component.css']
})
export class TransferMoneyComponent implements OnInit{

  constructor(public service : TransferService, private user_service : UserDataService, private router : Router, private cookieService: CookieService){}

  display = true;
  displayAdd = false;
  displayFinal = false;
  message : string = "this message";
  messagecall = false; 
  messagecall1 = false;
  UID : any; 
  _amount : any = "";
  cardDsiplay = true;
  bankDisplay = false;
  typeId : any = 0;
  type : any = "";
  cardList : Card[] = [];
  bankList : bankAccount[] = [];
  

  ngOnInit(): void {
    this.setType("c");
    this.UID = parseInt(this.cookieService.get('userId')) ;
    this.displayAccounts(this.UID);
    this.displayCards(this.UID);
  }

  addToWallet() {
    this.display = false;
    this.displayAdd = true;
  }

  goToTp(){
    this.router.navigateByUrl('Transfer');
  }

  continue( amount : any){
    this.displayAdd = false;
    this.displayFinal = true;
    this._amount += amount;
  }

  change(){
    console.log("should show card or account options");
  }

  setType(type : any){
    if(type == "b"){
      this.type = "b";
      this.cardDsiplay = false;
      this.bankDisplay = true;
      console.log("with bank", this.type);
      
      //populate with bank accounts
    } else {
      this.type = "c";
      this.bankDisplay = false;
      this.cardDsiplay = true;
      console.log("with card", this.type);
      //populate with cards 
      
    }
  }
  
  addMoney(){
    if(this.type == "b"){
      console.log("Add money from bank", this.typeId, this._amount);
      const accountToWalletObs = this.service.accountToWallet(this.typeId,this.UID,this._amount);
      if (accountToWalletObs) {
        accountToWalletObs.subscribe(data => {
          if(data != null){
            console.log(data);
            console.log("successful transaction from bank to wallet");
            this.messagecall = true;
            this.message = "Successful transaction from bank to wallet"
          } else {
            console.log("Not enough money");
            this.messagecall1 = true;
            this.message = "Invalid transaction from card to wallet. Not enough money.";
            return;
          }
        });
      } else {
        console.log("Observable for account to wallet is null");
      }
    } 
    else {
      console.log("Add money from card");
      const cardToWalletObs = this.service.cardToWallet(this.typeId,this.UID,this._amount);
      if (cardToWalletObs) {
        cardToWalletObs.subscribe(data => {
          console.log(data);
          if(data != null){
            console.log("successful transaction from card to wallet");
            this.messagecall = true;
            this.message = "Successful transaction from card to wallet"
            //this.router.navigateByUrl('Wallet');
          } else {
            console.log("Not enough money");
            this.messagecall1 = true;
            this.message = "Invalid transaction from card to wallet. Not enough money.";
            return;
          } 
        });
      } else {
        console.log("Observable for card to wallet is null");
      }
    }    
}

  displayCards(id : any){
    this.user_service.getUserCards(this.UID)?.subscribe(data => {
      console.log(data);
      if(data != null)
      {
        for(let i = 0; i < data.length; i++){
          let card = {} as Card; 
          card.cardId = data[i]['id'];
          card.balance = data[i]['balance'];
          card.cardNumber = data[i]['cardNumber'];
          card.cvv = data[i]['cvv'];
          card.expDate = data[i]['expiryDate'];
          this.cardList.push(card);
        }

      }
    });
  }

  displayAccounts(id : any){
    this.user_service.getUserAccounts(this.UID)?.subscribe(data => {
      if(data == null) return;
      else{
              for(let i = 0; i < data.length; i++){
        let bacct = {} as bankAccount;
        bacct.acctNum = data[i]['accountNumber'];
        bacct.balance = data[i]['balance'];
        bacct.bankAcctId = data[i]['id'];
        this.bankList.push(bacct);
      }
      console.log(this.bankList);
      }

    });
  }

  setCard(id : any){
    this.typeId = id;
    console.log(this.typeId);
  }

  setBAcct(id : any){
    this.typeId = id;
    console.log(this.typeId);
  }
}
