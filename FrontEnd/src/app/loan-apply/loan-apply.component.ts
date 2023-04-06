import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-loan-apply',
  templateUrl: './loan-apply.component.html',
  styleUrls: ['./loan-apply.component.css']
})
export class LoanApplyComponent {

  constructor(private formBuilder : FormBuilder) {}

  loanForm : FormGroup = this.formBuilder.group({
    amount : new FormControl('', [Validators.required, Validators.maxLength(256)]),
    period : new FormControl(new Date(), [Validators.required]),
  })

  interest : number = 0;
  business_type : string = "Large";

  getPayoffDate(days : number): Date{
    var futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + days);
    return futureDate;
  }

  onLoanFormSubmit(event : Event) {
    if(this.loanForm.valid) {
      console.log(this.loanForm.controls['period'].value)
      let amount = this.loanForm.controls['period'].value;
      if (amount>50000) 
        this.interest=25.25;
      else if (amount >25000)
        this.interest=18.75
      else if (amount >25000)
        this.interest=10.75
      else if (amount > 0)
        this.interest=5.25

      if (this.business_type=="NonProfit") 
        this.interest=this.interest/3;
      if (this.business_type=="Micro") 
        this.interest=this.interest/2;
      if (this.business_type=="Small") 
        this.interest=this.interest/1.5;
      if (this.business_type=="Large") 
        this.interest=this.interest/1;

      
      // interest rate: check if this business type is student or not or by amount loaned

      // get datetime of when this loan was requested

      // get user's bin
    }
  }

}
