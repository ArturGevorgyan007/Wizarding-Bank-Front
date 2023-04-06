import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  public email: any;
  public Id: any;
  constructor(private http: HttpClient) { }
  public getUser(): string {
    return this.email;
  }
  public getUserEmailFromAuth0(user: string) {
    this.email = user;
  }
  public retrieveUserIdFromDB(email: string): Observable<number> {
    return this.http.get("http://localhost:5092/user/byEmail/" + email) as Observable<number>;
  }
  public getUserId(): number {
    return this.Id
  }
  public retrieveBusinessIdFromDB(email: string): Observable<number> {
    return this.http.get("http://localhost:5092/Business/busId/" + email) as Observable<number>;
  }

  public retrieveBusinessTypeFromDB(email: string): Observable<string> {
    return this.http.get("http://localhost:5092/Business/busType/" + email) as Observable<string>;
  }
}
