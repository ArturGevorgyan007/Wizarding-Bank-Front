import { Component } from '@angular/core';

@Component({
  selector: 'app-transfer-money-component',
  templateUrl: './transfer-money.component.html',
  styleUrls: ['./transfer-money.component.css']
})
export class TransferMoneyComponent {

  display = true;
  displayAdd = false;
  displayFinal = false;
  _amount : any = 0;

  addToWallet() {
    this.display = false;
    this.displayAdd = true;
  }

  continue( amount : any){
    this.displayAdd = false;
    this.displayFinal = true;
    this._amount = amount;
  }
}
