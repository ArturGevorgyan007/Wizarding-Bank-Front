import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Card, bankAccount } from '../wallet-page/wallet-page.component';
import {  TransferService } from '../transfer.service';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-transfer-money-component',
  templateUrl: './transfer-money.component.html',
  styleUrls: ['./transfer-money.component.css']
})
export class TransferMoneyComponent implements OnInit{

  constructor(private service : TransferService, private user_service : UserDataService){}

  display = true;
  displayAdd = false;
  displayFinal = false;
  _amount : any = 0;
  cardDsiplay = true;
  bankDisplay = false;
  typeId : any = 0;
  type : any = "";
  cardList : Card[] = [];
  bankList : bankAccount[] = [];

  ngOnInit(): void {
    this.setType("c");
  }

  addToWallet() {
    this.display = false;
    this.displayAdd = true;
  }

  continue( amount : any){
    this.displayAdd = false;
    this.displayFinal = true;
    this._amount = amount;
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
      this.displayAccounts();
      //populate with bank accounts
    } else {
      this.type = "c";
      this.bankDisplay = false;
      this.cardDsiplay = true;
      console.log("with card", this.type);
      //populate with cards 
      this.displayCards();
    }
  }
  
  addMoney(){
    console.log(this._amount, this.type, "user id: 1");
    if(this.type == "b"){
      console.log("Add money from bank", this.typeId, this._amount);
       this.service.accountToWallet(this.typeId,1,this._amount).subscribe(data => {
         console.log(data);
         //need to update wallet balance
       })
    } 
    else {
      console.log("Add money from card");
      this.service.cardToWallet(this.typeId,1,this._amount).subscribe(data => {
        console.log(data);
      })
    }
    
  }

  displayCards(){
    this.user_service.getUserCards(1).subscribe(data => {
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

  displayAccounts(){
    this.user_service.getUserAccounts(1).subscribe(data => {
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

  setCard(id : any){
    this.typeId = id;
    console.log(this.typeId);
  }

  setBAcct(id : any){
    this.typeId = id;
    console.log(this.typeId);
  }
}
