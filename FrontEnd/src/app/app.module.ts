import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { PreloginComponent } from './prelogin/prelogin.component';
import { AuthModule } from '@auth0/auth0-angular';
import { BusinessHomeComponent } from './business-home/business-home.component';

@NgModule({
  declarations: [
    AppComponent,
    UserHomeComponent,
    PreloginComponent,
    BusinessHomeComponent
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
