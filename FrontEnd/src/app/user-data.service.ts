import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  public email: any;
  public Id: any;
  constructor(private http: HttpClient){}
  public getUser(): string {
    if (this.email) {

      console.log("This function has been called")
    }

    return this.email;
  }
  public addUser(user: string) {
    this.email = user;
    console.log("Added user!! " + user);
  }
  public retrieveUserIdFromDB(email: string): Observable<number> {
    return this.http.get("http://localhost:5092/user/byEmail/" + this.email) as Observable<number>;
  }
  public getUserId(): number {
    return this.Id
  }
}
