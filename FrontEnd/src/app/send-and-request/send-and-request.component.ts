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
export class SendAndRequestComponent implements OnInit {

  payDisplay : boolean = false;
  requestDisplay: boolean = false; 
  requestsDisplay : boolean = true;
  payRequestD: boolean = false;
  uID : any; 
  uEmail : any;
  tamt : any; 
  tid : number; 
  user: string | undefined;
  Requests: Array<Transaction> = [];

  constructor(private fb: FormBuilder,private router : Router, private cookieService: CookieService, private service : TransferService, private uservice : UserDataService, private tservice : TransactionHistoryService){}
   
  
   ngOnInit(): void {
    this.uID = 11; 
    // this.uID = parseInt(this.cookieService.get('userId'));
    this.getRequest(this.uID);
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

  getRequest(id : number){
    this.uservice.getUser2(id).subscribe(data => {
      if(data != null){
        this.uEmail = data['email'];
        this.tservice.getTransactions(id).subscribe(t => {
          if(t != null){
            let desc : string;
            let email : string;
            for(let i = 0; i < t.length; i++){
              
              if(t[i]['senderEmail'] != null && t[i]['description'] != null){
                const desc = t[i]['description'];
                if(this.uEmail == t[i]['senderEmail']){
                  if(desc.includes("Request")){
                    this.Requests.push(t[i]);
                  }
              }
              }
              
            } 
          }
        })
      }
      
    })
  }

  payRequest(transact : Transaction){
    this.transferForm.controls['email'].setValue(transact.recipientEmail);
    this.transferForm.controls['amount'].setValue(transact.amount);
    this.tamt = transact.amount;
    this.tid = transact.id; 
    this.payRequestD = true;
  }

  pay(){
    const amt = this.transferForm.controls['amount'].value;
    if(this.tamt == amt){
      console.log(`Paid request ${this.tamt}`);
      console.log(this.tid);
      this.service.updateRequest(this.uID, amt, 7, "Request: ", this.tid).subscribe(data =>{
        console.log(data);
      })
    } else {
      console.log(`Paid only ${amt} of ${this.tamt}`);
    }
  }
}

