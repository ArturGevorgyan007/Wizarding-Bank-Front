import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-wallet-page',
  templateUrl: './wallet-page.component.html',
  styleUrls: ['./wallet-page.component.css']
})
export class WalletPageComponent implements OnInit{
  _amount : any = ""; 

  constructor(private route : Router){}

  ngOnInit(): void {
    this.getCurrentAmount();
  }

  linkCardorAcct(){}

  transferMoney(){
    this.route.navigateByUrl('TransferMoney');
  }

  getCurrentAmount(){
    //getWalletBalance
    this._amount = 10;
  }
}
