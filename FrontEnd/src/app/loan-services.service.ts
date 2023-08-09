import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Loan } from './Interfaces/loan';

@Injectable({
  providedIn: 'root'
})
export class LoanServicesService {

  // apiroot : string = "https://wizardingbankapi.azurewebsites.net"
  apiroot : string = "http://localhost:5092"

  constructor(private httpClient: HttpClient) { }
  addNewLoan(loan: Loan): Observable<any> {
    return this.httpClient.post(this.apiroot+"/Loan/New", loan, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    })
  }

  makePayment(payment: number, id: number, amount: number): Observable<any> {
    return this.httpClient.put(this.apiroot+"/Loan/Pay/" + id + '/' + amount + '/' + payment, { headers: new HttpHeaders({ "Content-Type": "application/json" }) })
  }

  getLoan(id: number) {
    return this.httpClient.get(this.apiroot+"/Loan/Info/" + id);
  }
}
