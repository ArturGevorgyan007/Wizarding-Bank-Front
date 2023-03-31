import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  public static email: any;
  constructor() { }
  public getUser(): string {
    console.log("This function has been called")
    return UserDataService.email;
  }
  public addUser(user: string) {
    UserDataService.email = user;
    console.log("Added user!! " + user);
  }
}


export interface User {
  email: string,
  name: string,
  picture: string
}