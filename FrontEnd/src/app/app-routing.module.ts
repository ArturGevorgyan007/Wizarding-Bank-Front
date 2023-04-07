import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './Landing/Landing.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { HttpClient } from '@angular/common/http'
import { BusinessHomeComponent } from './business-home/business-home.component';
import { UserGuard } from './user.guard';
import { AddPaymentFormComponent } from './add-payment-form/add-payment-form.component';
import { TransferPageComponent } from './transfer-page/transfer-page.component'
import { ViewAllTransactionsComponent } from './view-all-transactions/view-all-transactions.component';
import { LoanApplyComponent } from './loan-apply/loan-apply.component';
import { WalletPageComponent } from './wallet-page/wallet-page.component';
import { TransferMoneyComponent } from './transfer-money/transfer-money.component';
import { SendAndRequestComponent } from './send-and-request/send-and-request.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { BusinessProfileComponent } from './business-profile/business-profile.component';


const routes: Routes = [
  { path: 'UserHome', component: UserHomeComponent },
  { path: '', component: LandingComponent },
  { path: 'BusinessHome', component: BusinessHomeComponent },
  { path: 'AddPayment', component: AddPaymentFormComponent },
  { path: 'UserHome/Transactions', component: ViewAllTransactionsComponent },
  { path: 'Transfer', component: TransferPageComponent },
  { path: 'BusinessHome/Loan', component: LoanApplyComponent },
  {path: 'SendAndRequest', component : SendAndRequestComponent} 
  { path: 'TransferMoney', component: TransferMoneyComponent },
  { path: 'Wallet', component: WalletPageComponent },
  { path: 'UserHome/Profile', component: UserProfileComponent },
  { path: 'BusinessHome/Profile', component: BusinessProfileComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
