import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  public email: any;
  constructor(private http: HttpClient) { }
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
  public getUserId(email: string) {
    this.http.get("http://localhost:5092/User/user/byEmail/" + this.email).subscribe(x => {
      return x;
    })
  }
}
