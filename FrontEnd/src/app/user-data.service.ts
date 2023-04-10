import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  addUser(arg0: string) {
    throw new Error('Method not implemented.');
  }
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
  public getUserCards(userId: number): Observable<Array<any>> {
    let qparams = new HttpParams()
      .set('userId', userId/*this.Id*/)
    return this.http.get("http://localhost:5092/" + 'Card/User', { params: qparams }) as Observable<Array<any>>;
  }

  public retrieveBusinessIdFromDB(email: string): Observable<number> {
    return this.http.get("http://localhost:5092/Business/busId/" + email) as Observable<number>;
  }


  public retrieveBusinessTypeFromDB(email: string): Observable<string> {
    return this.http.get("http://localhost:5092/Business/busType/" + email) as Observable<string>;
  }
  public getUserAccounts(userId: number): Observable<Array<any>> {
    let qparams = new HttpParams()
      .set('id', userId/*this.Id*/)
    return this.http.get("http://localhost:5092/" + 'Account/UserAccounts', { params: qparams }) as Observable<Array<any>>;
  }

  public getFullPersonalUser(userId : number): Observable<Array<any>>{
  
    return this.http.get("http://localhost:5092/user/"+ userId) as Observable<Array<any>>;
  }

  public updateUserProfile(userObj : any): Observable<Array<any>>{

    return this.http.put("http://localhost:5092/user/update", userObj) as Observable<Array<any>>;
  }

  public getFullBusinessUser(businessId : number): Observable<Array<any>>{
  
    return this.http.get("http://localhost:5092/Business/bus/"+ businessId) as Observable<Array<any>>;
  }

  public updateBusinessProfile(businessObj : any): Observable<Array<any>>{
    
    return this.http.put("http://localhost:5092/Business/Update", businessObj) as Observable<Array<any>>;
  }

  public getWalletBalance(userId : number): Observable<any>{
    return this.http.get("http://localhost:5092/user/" + userId) as Observable<any>;
  }
}
