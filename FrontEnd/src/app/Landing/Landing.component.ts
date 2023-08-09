import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Auth0Client, createAuth0Client } from '@auth0/auth0-spa-js';
import { JwtModule } from "@auth0/angular-jwt";
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { UserDataService } from '../user-data.service';
import { CookieService } from '../../../node_modules/ngx-cookie-service';
import { User, Business } from '../Interfaces/User';


@Component({
  selector: 'app-landing',
  templateUrl: './Landing.component.html',
  styleUrls: ['./Landing.component.css'],
})

export class LandingComponent {
  constructor(private cookieService: CookieService, private router: Router, public authService: AuthService, public userData: UserDataService) {
  }

  user: User = {
    FullName: "",
    Username: "",
    Password: "",
    Email: "",
    Address: "",
    Wallet: 0
  }

  business: Business = {
    Name: "",
    Username: "",
    Password: "",
    Bin: "",
    Email: "",
    Address: "",
    Wallet: 0
  }

  // async ngOnInit(): Promise<void> {
  //   if (this.authService.isAuthenticated$) {
  //     await this.authService.user$.subscribe(c => {
  //       if (c) {
  //         console.log(c)
  //         if (c["email"]) {
  //           console.log(c['email'])
  //           this.cookieService.set('email', c['email'], 0.4)
  //           // sessionStorage.setItem("loggedin", 'true')
  //           if (this.cookieService.get('userType') == 'Business') {
  //             this.userData.retrieveBusinessIdFromDB(this.cookieService.get('email')).subscribe(data => {
  //               if (data) {
  //                 this.cookieService.set("userId", data + "")
  //                 this.router.navigate(['/BusinessHome']);
  //                 this.userData.authenticate()
  //               }
  //             })
  //           }
  //           else if (this.cookieService.get('userType') == 'Personal') {
  //             this.userData.retrieveUserIdFromDB(this.cookieService.get('email')).subscribe(data => {
  //               if (data) {
  //                 this.cookieService.set("userId", data + "")
  //                 this.router.navigate(['/UserHome']);
  //                 this.userData.authenticate()
  //               }
  //             })
  //           }
  //         }
  //       }
  //     })
  //   }
  // }

  //http://localhost:4200

  // async login() {
  //   await this.authService.logout()
  //   this.cookieService.set('userType', 'Personal', 0.4);
  //   // this.authService.loginWithRedirect({ authorizationParams: { redirect_uri: 'https://thankful-dune-043ee561e.3.azurestaticapps.net' }, appState: { target: 'Personal' } })
  //   this.authService.loginWithRedirect({ authorizationParams: { redirect_uri: 'https://thankful-dune-043ee561e.3.azurestaticapps.net' } })
  // }

personalLogin()
{
  const email = (document.getElementById("emailPersonalLogin")) as HTMLInputElement;
  const password = (document.getElementById("passwordPersonalLogin")) as HTMLInputElement;
  this.plogin(email.value, password.value)
}

async plogin(e : string, p : string){
  this.userData.retrieveUserIdFromDB(e).subscribe(data => {
    console.log(data)
      if(data)
        this.userData.getFullPersonalUser(data).subscribe(d => { console.log(d["password" as keyof typeof d])
          if(d["password" as keyof typeof d]!=p)
            alert("Incorrect password")
          else{
            this.cookieService.set('email', d['email' as keyof typeof d])
            this.cookieService.set("userId", d["id" as keyof typeof d]);
            this.cookieService.set('userType',"Personal");
            this.router.navigate(['/UserHome']);
            this.userData.authenticate()
          }
      });
      else
        alert("User is not registered")
      
  });
}

businessLogin()
{
  const email = (document.getElementById("emailBusinessLogin")) as HTMLInputElement;
  const password = (document.getElementById("passwordBusinessLogin")) as HTMLInputElement;
  this.blogin(email.value, password.value)
}

async blogin(e : string, p : string){

  this.userData.retrieveBusinessIdFromDB(e).subscribe(data => {
    console.log(data)
      if(data)
        this.userData.getFullBusinessUser(data).subscribe(d => { 
          console.log(d[0]["password" as keyof typeof d])
          console.log(p)
          if(d[0]["password" as keyof typeof d]!=p)
            alert("Incorrect password")
          else{
            this.cookieService.set('email', d[0]['email' as keyof typeof d])
            this.cookieService.set("userId", d[0]["id" as keyof typeof d]);
            this.cookieService.set('userType',"Business");
            this.router.navigate(['/BusinessHome']);
            this.userData.authenticate()
          }
      });
      else
        alert("User is not registered")
  });
}

  closePersonalLogin() {
    var el = document.getElementById('personalLogin')
    el!.addEventListener('hidden.bs.modal', function (event) {
        (document.getElementById("personalForm") as HTMLFormElement).reset();
    })
  }

  closeBusinessLogin() {
    var el = document.getElementById('businessLogin')
    el!.addEventListener('hidden.bs.modal', function (event) {
        (document.getElementById("businessForm") as HTMLFormElement).reset();
    })
  }

  closePersonalSignUp() {
  }

  closeBusinessSignUp() {
  }

  personalSignUp() {
    this.user.Email = (document.getElementById('emailPersonalSignUp') as HTMLInputElement).value;
    this.user.Username = (document.getElementById('usernamePersonalSignUp') as HTMLInputElement).value;
    this.user.Password = (document.getElementById('passwordPersonalSignUp') as HTMLInputElement).value;
    this.userData.createUser(this.user).subscribe(data => console.log(data));   
  }

  businessSignUp() {
    this.business.Email = (document.getElementById('emailBusinessSignUp') as HTMLInputElement).value;
    this.business.Username = (document.getElementById('usernameBusinessSignUp') as HTMLInputElement).value;
    this.business.Password = (document.getElementById('passwordBusinessSignUp') as HTMLInputElement).value;
    this.userData.createBusiness(this.business).subscribe(data => console.log(data)); 
  }
}
