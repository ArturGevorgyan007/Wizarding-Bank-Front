import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Form, FormBuilder, FormGroup, FormsModule, NgForm } from '@angular/forms';
import { Card } from '../Interfaces/Card';
import { Account } from '../Interfaces/Account';
import { PaymentFormService } from '../add-payment-form.service';

@Component({
  selector: 'app-add-payment-form',
  templateUrl: './add-payment-form.component.html',
  styleUrls: ['./add-payment-form.component.css']
})

export class AddPaymentFormComponent {
  mode : string = "credit";

  constructor(private router: Router, private fb: FormBuilder, private pfs: PaymentFormService){}

  toggleMode(mode : string) : void {
    this.mode = mode;
  }
  AccModel : Account = {};
  CardModel : Card = {};
  cardnum : string = "";
  cardcvv : string = "";
  expiryDate : string = "";

  confirm = (form: NgForm) => {
    if (form.valid) {
      if (this.mode === 'credit'){
        this.CardModel.Balance = 420.69;
        this.CardModel.CardNumber = parseInt(this.cardnum);
        this.CardModel.Cvv = parseInt(this.cardcvv);
        this.CardModel.ExpiryDate = new Date(this.expiryDate);
        //console.log(typeof this.CardModel.ExpiryDate);
        this.pfs.addCard(this.CardModel).subscribe(data => console.log(data));
      } 
      else if (this.mode === 'bank'){
        this.AccModel.Balance = 100.0;
        this.pfs.addAccount(this.AccModel).subscribe(data => console.log(data));
      }
      this.router.navigate(['/UserHome']);
      
    }
  }
  confirma(event: Event): void{
    event.preventDefault();
    console.log("confirm Function");
    if (this.mode === 'credit') {
      //do something if credit card
      this.CardModel.id = 0;
      this.CardModel.UserId = 1;
      console.log(typeof this.CardModel.CardNumber);
      console.log(typeof this.CardModel.Cvv);
      
      console.log(this.CardModel.CardNumber);
      //this.pfs.addCard(this.CardModel).subscribe(data => console.log(data));
    }
    else if (this.mode === 'bank'){
      //do something if bank account
    }
    this.router.navigate(['/UserHome']);
  }
}
