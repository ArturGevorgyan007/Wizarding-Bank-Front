import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { LandingComponent } from './Landing/Landing.component';
import { AuthModule } from '@auth0/auth0-angular';
import { BusinessHomeComponent } from './business-home/business-home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserDataService } from './user-data.service';
import { ViewAllTransactionsComponent } from './view-all-transactions/view-all-transactions.component';
import { HttpClientModule } from '@angular/common/http';
import { LoanApplyComponent } from './loan-apply/loan-apply.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    UserHomeComponent,
    LandingComponent,
    BusinessHomeComponent,
    NavbarComponent,
    ViewAllTransactionsComponent,
    LoanApplyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule.forRoot({
      domain: 'dev-z8ypmdswd2nbh4n2.us.auth0.com',
      clientId: 'Zq0rCWWoR0q3QHWpfAcT2wizKAqtTDYJ',
      authorizationParams: {
        redirect_uri: 'http://localhost:4200'
      }
    }),
    HttpClientModule
  ],
  providers: [UserDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
