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
}
