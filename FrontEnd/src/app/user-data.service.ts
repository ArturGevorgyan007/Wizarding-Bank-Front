import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
  public addUser(user: string) {
    this.email = user;
  }
  public getUserId(email: string) {
    this.http.get("http://localhost:5092/User/user/byEmail/" + this.email).subscribe(x => {
      this.Id = x;
    })
  }
}
