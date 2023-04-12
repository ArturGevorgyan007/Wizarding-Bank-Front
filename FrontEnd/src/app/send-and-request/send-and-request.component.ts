import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from '../../../node_modules/ngx-cookie-service';
import { Transaction } from '../Interfaces/transaction';
import { Router } from '@angular/router';
import { TransferService} from '../transfer.service';
import { UserDataService } from '../user-data.service';
import { TransactionHistoryService } from '../transaction-history.service';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-send-and-request',
  templateUrl: './send-and-request.component.html',
  styleUrls: ['./send-and-request.component.css']
})
export class SendAndRequestComponent implements OnInit {

  payDisplay : boolean = true;
  requestDisplay: boolean = false; 
  requestsDisplay : boolean = false;
  payRequestD: boolean = false;
  uID : any; 
  uEmail : any;
  wallet : number;
  ramount : number; 
  user: string | undefined;
  Requests: Array<Transaction> = [];
  users : string[] = [];
  filteredUsers: Observable<string[]>;
  rTransac : Transaction;
  isDisabled = true;

  constructor(private fb: FormBuilder,private router : Router, private cookieService: CookieService, private service : TransferService, private uservice : UserDataService, private tservice : TransactionHistoryService){}
   
  
   ngOnInit(): void {
    this.uID = 6; 
    // this.uID = parseInt(this.cookieService.get('userId'));
    this.getRequest(this.uID);
    this.setBalance(this.uID);
  }
   
  emailt = new FormControl('');
  transferForm : FormGroup = this.fb.group({
          email: ['', Validators.required],
          amount: [null, [Validators.required, Validators.min(0)]],
          description : new FormControl('', [Validators.required])
    });

    requestForm : FormGroup = this.fb.group({
      rdescription : new FormControl('', [Validators.required]),
      remail: new FormControl('', [Validators.required]),
      ramount: new FormControl('', [Validators.required, Validators.min(0)])
    });

  

  onSubmit() {
    const email = this.transferForm.value.email;
    const amount = this.transferForm.value.amount;
    const desc = this.transferForm.value.description;
    console.log(`Transfer ${amount} to ${email}`);
    // Perform the transfer here
    this.uservice.retrieveUserIdFromDB(email).subscribe(data => {
      if(data != null){
        const id = data;
        this.service.userToUser(this.uID, amount, id, desc).subscribe(data => {
          console.log(data);
          if(data != null){
            console.log("success");
            this.router.navigateByUrl('SendAndRequest');
          } else{
            console.log("we're unable to process your transfer at this moment.")
          }
        });
      }
    });
    
  }

  onRequest(){
    console.log("Sent request to user")
    //userId : number, amount : number, recipientId : number, description : string
    const email = this.requestForm.value.remail;
    const amount = this.requestForm.value.ramount;
    const desc = this.requestForm.value.rdescription;
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
            for(let i = 0; i < t.length; i++){
              if(t[i]['senderEmail'] != null && t[i]['description'] != null){
                const desc = t[i]['description'];
                if(this.uEmail == t[i]['senderEmail']){
                  if(desc.includes("Request")){
                    if(t[i]['status'] == 1){
                      t[i].ramount = t[i].amount
                      for(let j = 0; j < t.length; j++){
                        let str = t[j]['description'];
                        if(str.includes("PR: " + t[i].id)){
                          t[i].ramount -= t[j].amount;
                        }
                      }
                      this.Requests.push(t[i]);
                    } 
                  }
                }
              }
            }
          } 
        });
      }
    });
  }

  payRequest(transact : Transaction){
    this.transferForm.controls['email'].setValue(transact.recipientEmail);
    this.transferForm.controls['amount'].setValue(transact.ramount);
    this.rTransac = transact;
  }

  pay(){
    const amt = this.transferForm.controls['amount'].value;
    // set button to enabled 
    if(this.wallet > amt){
      this.uservice.retrieveUserIdFromDB(this.rTransac.recipientEmail).subscribe(data => {
        if(data != null){
          let id = data;
          if(this.rTransac.amount == amt){
            console.log(`Paid request ${this.rTransac.amount}`);
            console.log(this.rTransac.id);
            this.service.updateRequest(this.uID, id, this.rTransac).subscribe(data =>{
              console.log(data);
              if(data!= null){
                this.uservice.updateUserWallet(this.uID, -amt).subscribe(w => {
                  console.log(w);
                  console.log("Succesfully payed request......success html box where x takes you back home");
                });
              }
            });
          } else {
            console.log(`Paid only ${amt} of ${this.rTransac.amount}`);
            const msg = "PR: " + this.rTransac.id;
            this.service.userToUser(this.uID, amt, id, msg).subscribe(data => {
              console.log(data);
              if(data != null){
                console.log("Paid this much.....go back to home success html box where x takes you back home");
              } 
            });
          }
        } 
      });
    } else {
       console.log("Not enough money....error message");
    }
  }

  setBalance(id : number){
    this.uservice.getWalletBalance(id).subscribe(data => {
      console.log(data['wallet']);
      console.log(data);
      if(data != null){
        this.wallet = data['wallet'];
      }
    });
  }

   
  send(){
    this.payDisplay = true; 
    this.requestDisplay = false; 
    this.requestsDisplay = false;
    this.payRequestD = false; 
  }

  request(){
    this.payDisplay = false; 
    this.requestDisplay = true; 
    this.requestsDisplay = false;
    this.payRequestD = false; 
  }

  viewRequests(){
    this.payDisplay = false; 
    this.requestDisplay = false; 
    this.requestsDisplay = true;
    this.payRequestD = false; 
  }
}

