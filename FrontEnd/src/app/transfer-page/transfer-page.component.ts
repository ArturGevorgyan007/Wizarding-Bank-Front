import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TransferService } from '../transfer.service';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-transfer-page',
  templateUrl: './transfer-page.component.html',
  styleUrls: ['./transfer-page.component.css']
})
export class TransferPageComponent{
  constructor(private router: Router, private fb: FormBuilder, private api:TransferService, private userData: UserDataService){}
  mode : string = "credit";
  UID = this.userData.Id


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
      this.api.walletToCard(U, C, A).subscribe(data => console.log(data));
    }
  }
  processBankForm(e: Event) : void {
    e.preventDefault();
    this.bankForm.markAllAsTouched();
    if(this.bankForm.valid) {
      let A = this.bankForm.value['bankAmount'];
      let B = this.bankForm.value['bank'];
      let U = this.bankForm.value['bankUserId'];
      

      //walletToCard(userId : number, cardId : number, amount : number)
      this.api.walletToAccount(U, B, A).subscribe(data => console.log(data));
    }
  }

}
