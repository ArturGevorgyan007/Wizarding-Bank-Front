import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TransferService } from '../transfer.service';
import { UserDataService } from '../user-data.service';
import {of} from 'rxjs'
import { CookieService } from '../../../node_modules/ngx-cookie-service';
@Component({
  selector: 'app-transfer-page',
  templateUrl: './transfer-page.component.html',
  styleUrls: ['./transfer-page.component.css']
})
export class TransferPageComponent implements OnInit{
  mode : string = "card";
  constructor(private cookieSerive : CookieService, private router: Router, private fb: FormBuilder, private api:TransferService, private userData: UserDataService){}
  //we can user this to get the userID:
  otherUserID = this.cookieSerive.get('userId')
  UID = this.userData.getUserId()
  bankAccounts = this.userData.getUser()
  
  cards : any[]
  ngOnInit(): void {

    //get all cards
      this.userData.getUserCards(1).subscribe((data:any) => {
        this.cards = data
        console.log(data)
      })

      //get all bank accounts
      this.userData.getUserAccounts(1).subscribe((data:any) => {
        this.bankAccounts = data
        console.log(data)
      })


    }
  cardForm : FormGroup = this.fb.group({
    card : new FormControl(),
    cardUserId : new FormControl(),
    cardAmount : new FormControl()
  })

  bankForm : FormGroup = this.fb.group({
    bank : new FormControl(),
    bankUserId : new FormControl(),
    bankAmount : new FormControl()
  })


  toggleMode(mode : string) : void {
    this.mode = mode;
  }

  confirm(event: Event): void{
    event.preventDefault();
    console.log("confirm Function");
    this.router.navigate(['/UserHome']);
  }


  processCardForm(e: Event) : void {
    e.preventDefault();
    this.cardForm.markAllAsTouched();
    if(this.cardForm.valid) {
      let A = this.cardForm.value['cardAmount'];
      let C = this.cardForm.value['card'];
      let U = this.UID;
      console.log(this.UID)
      

      //walletToCard(userId : number, cardId : number, amount : number)
      this.api.walletToCard(5, C, A).subscribe(data => console.log(data));
    }
  }
  process(e: Event,  num : number){
    console.log(num)
     this.api.walletToCard(1, num, 2).subscribe(data => console.log(data))
  }

  processBankForm(e: Event) : void {
    e.preventDefault();
    this.bankForm.markAllAsTouched();
    if(this.bankForm.valid) {
      let A = this.bankForm.value['bankAmount'];
      let B = this.bankForm.value['bank'];
      let U = 5;
      console.log(this.cards)
      

      //walletToCard(userId : number, cardId : number, amount : number)
      this.api.walletToAccount(U, B, A).subscribe(data => console.log(data));
    }
  }
 


}
