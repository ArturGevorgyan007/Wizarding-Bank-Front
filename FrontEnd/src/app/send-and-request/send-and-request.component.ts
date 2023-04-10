import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from '../../../node_modules/ngx-cookie-service';
import { Transaction } from '../Interfaces/transaction';
import { Router } from '@angular/router';
import { TransferService} from '../transfer.service';
import { UserDataService } from '../user-data.service';
import { TransactionHistoryService } from '../transaction-history.service';

@Component({
  selector: 'app-send-and-request',
  templateUrl: './send-and-request.component.html',
  styleUrls: ['./send-and-request.component.css']
})
export class SendAndRequestComponent {

  uID : any; 
  user: string | undefined;
  Transactions: Array<Transaction> = [];

  constructor(private fb: FormBuilder,private router : Router, private cookieService: CookieService, private service : TransferService, private uservice : UserDataService, private tservice : TransactionHistoryService){
   // this.uID = parseInt(this.cookieService.get('userId'));
   this.uID = 11; 
   this.tservice.getTransactions(this.uID).subscribe(w => {
    this.Transactions = w;
  })
  }
    transferForm : FormGroup = this.fb.group({
          email: ['', Validators.required],
          amount: [null, [Validators.required, Validators.min(0)]]
    });
    requestForm : FormGroup = this.fb.group({
      description : new FormControl('', [Validators.required]),
      remail: new FormControl('', [Validators.required]),
      ramount: new FormControl('', [Validators.required, Validators.min(0)])
    });

  ngOninit(){

  }

  onSubmit() {
    const email = this.transferForm.value.email;
    const amount = this.transferForm.value.amount;
    console.log(`Transfer ${amount} to ${email}`);
    // Perform the transfer here
  }

  onRequest(){
    console.log("Send request to user")
    //userId : number, amount : number, recipientId : number, description : string
    const email = this.requestForm.value.remail;
    const amount = this.requestForm.value.ramount;
    const desc = this.requestForm.value.description;
    this.uservice.retrieveUserIdFromDB(email).subscribe(udata => {
      if(udata != null){
        const rId = udata;
        this.service.requestMoney(this.uID, amount, rId, desc).subscribe(data => {
          console.log(data);
        })
      }
    })
    
  }
}

