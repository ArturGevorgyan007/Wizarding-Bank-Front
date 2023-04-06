import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserDataService } from '../user-data.service';
import { CookieService } from 'ngx-cookie-service';
import { Loan, LoanSchedule } from '../Interfaces/loan';
import { LoanServicesService } from '../loan-services.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loan-apply',
  templateUrl: './loan-apply.component.html',
  styleUrls: ['./loan-apply.component.css']
})
export class LoanApplyComponent implements OnInit {

  constructor(private router: Router, private loanService: LoanServicesService, private formBuilder: FormBuilder, private userData: UserDataService, private cookieService: CookieService) { }
  loan: Loan = {
    id: 0,
    interestRate: 0,
    amount: 0,
    businessId: "0",
    monthlyPay: 0,
    dateLoaned: new Date(),
    loanPaid: new Date(),
    amountPaid: 0
  }
  existingLoan: Loan = {
    id: 0,
    interestRate: 0,
    amount: 0,
    businessId: "0",
    monthlyPay: 0,
    dateLoaned: new Date(),
    loanPaid: new Date(),
    amountPaid: 0
  }
  loanForm: FormGroup = this.formBuilder.group({
    amount: new FormControl('', [Validators.required, Validators.maxLength(256)]),
    period: new FormControl(new Date(), [Validators.required]),
  })

  payLoanForm: FormGroup = this.formBuilder.group({
    payAmount: new FormControl('')
  })

  monthlyAmountButton: boolean = false;
  customAmountButton: boolean = false;
  fullAmountButton: boolean = false;

  interest: number = 0;
  amount: number = 0;
  business_type: string = "";
  period: number = 0;
  payment: number = 0;
  showCalculation: boolean = false;
  schedule: Array<LoanSchedule> = []

  ngOnInit() {
    this.getCurrentLoan().subscribe(data => {
      this.existingLoan = data as Loan;
    });
  }

  getCurrentLoan(): Observable<any> {
    return this.loanService.getLoan(this.cookieService.get("userId") as unknown as number);
  }

  PMT(ir: any, np: any, pv: any, fv: any, type: any) {
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
      return -(pv + fv) / np;

    pvif = Math.pow(1 + ir, np);
    pmt = - ir * (pv * pvif + fv) / (pvif - 1);

    if (type === 1)
      pmt /= (1 + ir);

    return pmt;
  }

  getPayoffDate(days: number): Date {
    var futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + days);
    return futureDate;
  }

  toggle() {
    this.showCalculation = true;
  }


  createSchedule() {
    let dateincriment = 0
    let balance = this.amount
    let totInterest = 0
    let inter = parseFloat((balance * this.interest / 100 / 12).toFixed(2))

    while (true) {
      if (balance < this.payment) {
        balance = parseFloat((balance - this.payment + inter).toFixed(0))
      }
      else {
        balance = parseFloat((balance - this.payment + inter).toFixed(2))
        inter = parseFloat((balance * this.interest / 100 / 12).toFixed(2))
      }

      let data: LoanSchedule = {
        date: new Date(),
        payment: this.payment,
        interest: inter,
        principal: parseFloat((this.payment - inter).toFixed(2)),
        balance: balance,
        totalInterest: parseFloat((totInterest + inter).toFixed(2)),
      }

      if (balance < 0)
        break;

      totInterest = data.totalInterest
      this.schedule.push(data)
      console.log(data)
    }
  }

  onLoanFormSubmit(event: Event) {
    if (this.loanForm.valid) {
      // this.createSchedule();
      this.toggle();
      this.userData.retrieveBusinessTypeFromDB(this.cookieService.get('email')).subscribe((data: string) => {
        if (data) {
          this.business_type = data;
          this.amount = this.loanForm.controls['amount'].value

          let rate: number = 0;
          if (this.amount > 50000)
            rate = 25.25;
          else if (this.amount > 25000)
            rate = 18.75
          else if (this.amount > 10000)
            rate = 10.75
          else if (this.amount > 0)
            rate = 5.25

          if (this.business_type == "nonprofit")
            rate = parseInt((rate / 3.0).toFixed(2));
          if (this.business_type == "micro")
            rate = parseInt((rate / 2.0).toFixed(2));
          if (this.business_type == "small")
            rate = rate / 1.5;
          if (this.business_type == "large")
            rate = parseInt((rate / 1.0).toFixed(2));

          this.interest = rate

          this.period = this.loanForm.controls['period'].value

          this.payment = parseInt(this.PMT(this.interest / 1200, this.period * 12, this.amount, 0, 0).toFixed(2)) * (-1)
          if (isNaN(this.payment)) this.payment = 0;
        }
      })

    }
  }
  acceptLoan(): any {
    this.loan.interestRate = this.interest
    this.loan.businessId = this.cookieService.get('userId')
    this.loan.amount = this.loanForm.controls['amount'].value
    this.loan.monthlyPay = this.payment,
      this.loan.dateLoaned = new Date()
    this.loan.loanPaid = this.getPayoffDate(this.loanForm.controls['period'].value * 365)
    this.loanService.addNewLoan(this.loan)
      .subscribe(data => {
        this.router.navigate(['/BusinessHome'])
      })
  }

  toggleMonthlyBill() {
    this.monthlyAmountButton = true;
    this.customAmountButton = false;
    this.fullAmountButton = false;
    // this.payLoanForm.controls['amount'].value = this.loan.monthlyPay
  }

  toggleCustomBill() {
    this.monthlyAmountButton = false;
    this.customAmountButton = true;
    this.fullAmountButton = false;
  }

  toggleFullBill() {
    this.monthlyAmountButton = false;
    this.customAmountButton = false;
    this.fullAmountButton = true;
    // this.payLoanForm.controls['amount'].value = this.loan.amount
  }

  toggleAllBillButtons() {
    this.monthlyAmountButton = false;
    this.customAmountButton = false;
    this.fullAmountButton = false;
  }

  payLoan(amount: number): any {
    //this.loanService.makePayment(this.payLoanForm.controls['payAmount'].value, this.cookieService.get("userId") as unknown as number);
    this.loanService.makePayment(amount, this.cookieService.get("userId") as unknown as number).subscribe(data => {
      console.log(data);
      location.reload();
    });
  }
  payCustomLoan(): any {
    //this.loanService.makePayment(this.payLoanForm.controls['payAmount'].value, this.cookieService.get("userId") as unknown as number);
    this.loanService.makePayment(this.payLoanForm.controls['payAmount'].value, this.cookieService.get("userId") as unknown as number).subscribe(data => {
      console.log(data);
      location.reload();
    });
  }


}
