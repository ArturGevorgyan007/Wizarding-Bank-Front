import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from '../../../node_modules/ngx-cookie-service';
import { Transaction } from '../Interfaces/transaction';
import { Router } from '@angular/router';
import { TransferService} from '../transfer.service';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-send-and-request',
  templateUrl: './send-and-request.component.html',
  styleUrls: ['./send-and-request.component.css']
})
export class SendAndRequestComponent {

  transferForm: FormGroup;
  uID : any; 

  constructor(private fb: FormBuilder,private router : Router, private cookieService: CookieService, private service : TransferService, private uservice : UserDataService) {
    this.uID = parseInt(this.cookieService.get('userId'));
    this.transferForm = this.fb.group({
      email: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(0)]]
    });
  }

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
        console.log(udata);
        this.service.requestMoney(this.uID, amount, 3, desc).subscribe(data => {
          console.log(data);
        })
      }
    })
    
  }
}

