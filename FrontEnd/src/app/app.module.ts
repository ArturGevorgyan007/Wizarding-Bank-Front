import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { LandingComponent } from './Landing/Landing.component';
import { AuthModule } from '@auth0/auth0-angular';
import { BusinessHomeComponent } from './business-home/business-home.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    UserHomeComponent,
    LandingComponent,
    BusinessHomeComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule.forRoot({
      domain: 'dev-z8ypmdswd2nbh4n2.us.auth0.com',
      clientId: 'Zq0rCWWoR0q3QHWpfAcT2wizKAqtTDYJ',
      authorizationParams: {
        redirect_uri: 'http://localhost:4200/UserHome'
      }
    }),
    AuthModule.forRoot({
      domain: 'dev-z8ypmdswd2nbh4n2.us.auth0.com',
      clientId: '3723m9sPuC9l6thbtyOLBQpfdzjQuxrS',
      authorizationParams: {
        redirect_uri: 'http://localhost:4200/BusinessHome'
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
