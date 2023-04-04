import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from './Interfaces/transaction';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransactionHistoryService {

  constructor(private http: HttpClient) { }
  getMostRecentTransactions(id: number): Observable<Array<Transaction>> {
    return this.http.get("http://localhost:5092/Transaction/Number/" + id) as Observable<Array<Transaction>>;
  }
  getTransactions(id: number): Observable<Array<Transaction>> {
    return this.http.get("http:localhost:5092/Transaction/" + id) as Observable<Array<Transaction>>;
  }
}
