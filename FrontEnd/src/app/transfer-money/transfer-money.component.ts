import { Component} from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import {  TransferService } from '../transfer.service';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-transfer-money-component',
  templateUrl: './transfer-money.component.html',
  styleUrls: ['./transfer-money.component.css']
})
export class TransferMoneyComponent{

  constructor(private service : TransferService, private user_service : UserDataService){}

  display = true;
  displayAdd = false;
  displayFinal = false;
  _amount : any = 0;
  cardDsiplay = true;
  bankDisplay = false;
  type : any = "c";

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
      console.log("with bank", this.type);
    } else {
      this.type = "c";
    }
  }
  
  addMoney(){
    console.log(this._amount, this.type, "user id: 1");
    if(this.type == "b"){
      console.log("Add money from bank");
       this.service.accountToWallet(1,1,1).subscribe(data => {
         console.log(data);
       })
    } 
    else {
      console.log("Add money from card");
      this.service.cardToWallet(1,1,1).subscribe(data => {
        console.log(data);
      })
    }
    
  }
}
