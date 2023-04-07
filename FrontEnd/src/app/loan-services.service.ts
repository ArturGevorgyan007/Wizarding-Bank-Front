import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Loan } from './Interfaces/loan';

@Injectable({
  providedIn: 'root'
})
export class LoanServicesService {

  constructor(private httpClient: HttpClient) { }
  addNewLoan(loan: Loan): Observable<any> {
    return this.httpClient.post("http://localhost:5092/Loan/New", loan, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    })
  }

  makePayment(payment: number, id: number, amount: number): Observable<any> {
    return this.httpClient.put("http://localhost:5092/Loan/Pay/" + id + '/' + amount + '/' + payment, { headers: new HttpHeaders({ "Content-Type": "application/json" }) })
  }

  getLoan(id: number) {
    return this.httpClient.get("http://localhost:5092/Loan/Info/" + id);
  }
}
