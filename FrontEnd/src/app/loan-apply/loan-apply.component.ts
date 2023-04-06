import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserDataService } from '../user-data.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-loan-apply',
  templateUrl: './loan-apply.component.html',
  styleUrls: ['./loan-apply.component.css']
})
export class LoanApplyComponent {

  constructor(private formBuilder : FormBuilder,private userData : UserDataService, private cookieService : CookieService) {}

  loanForm : FormGroup = this.formBuilder.group({
    amount : new FormControl('', [Validators.required, Validators.maxLength(256)]),
    period : new FormControl(new Date(), [Validators.required]),
  })

  interest : number = 0;
  amount : number = 0;
  business_type : string = "";
  period : number = 0;
  payment : number = 0;

  PMT(ir : any, np : any, pv : any, fv : any, type : any) {
    /*
     * ir   - interest rate per month
     * np   - number of periods (months)
     * pv   - present value
     * fv   - future value
     * type - when the payments are due:
     *        0: end of the period, e.g. end of month (default)
     *        1: beginning of period
     */
    var pmt, pvif;

    fv || (fv = 0);
    type || (type = 0);

    if (ir === 0)
        return -(pv + fv)/np;

    pvif = Math.pow(1 + ir, np);
    pmt = - ir * (pv * pvif + fv) / (pvif - 1);

    if (type === 1)
        pmt /= (1 + ir);

    return pmt;
}

  getPayoffDate(days : number): Date{
    var futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + days);
    return futureDate;
  }

 onLoanFormSubmit(event : Event) {
    if(this.loanForm.valid) {
      this.userData.retrieveBusinessTypeFromDB(this.cookieService.get('email')).subscribe((data:string) => {
        if (data) {
          this.business_type=data;
          this.amount = this.loanForm.controls['amount'].value
      
      let rate : number = 0;
      if (this.amount>50000) 
        rate=25.25;
      else if (this.amount >25000)
        rate=18.75
      else if (this.amount >10000)
        rate=10.75
      else if (this.amount > 0)
        rate=5.25
      
      if (this.business_type=="nonprofit") 
        rate=parseInt((rate/3.0).toFixed(2));
      if (this.business_type=="micro") 
        rate=parseInt((rate/2.0).toFixed(2));
      if (this.business_type=="small") 
        rate=rate/1.5;
      if (this.business_type=="large") 
        rate=parseInt((rate/1.0).toFixed(2));

      this.interest=rate
      
      this.period=this.loanForm.controls['period'].value
     
      this.payment=parseInt(this.PMT(this.interest/1200,this.period*12,this.amount,0,0).toFixed(2))*(-1)
        }
      })
      
  
      // interest rate: check if this business type is student or not or by amount loaned

      // get datetime of when this loan was requested

      // get user's bin
    }
  }

  amountChange(event : Event) {
    // var tempAmount = this.loanForm.controls['amount'].value
    // if(tempAmount > Math.floor(tempAmount) && Math.ceil(tempAmount) > tempAmount) { 
    //   var element = document.getElementById('loan_amount_input');
    //   if(element?.ariaValueNow) {
    //     // element.nodeValue = '00'
    //     console.log("changed")
    //   }
    // }
  }

  // validateNumber(event: any) {
  //   let input = String.fromCharCode(event.charCode);
  //   const reg = /^\d*(?:[.,]\d{1,2})?$/;

  //   if (!reg.test(input)) {
  //     event.preventDefault();
  //   }
  // }

}
