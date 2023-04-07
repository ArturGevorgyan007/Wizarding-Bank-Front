import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './Landing/Landing.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { HttpClient } from '@angular/common/http'
import { BusinessHomeComponent } from './business-home/business-home.component';
import { UserGuard } from './user.guard';
import {TransferPageComponent} from './transfer-page/transfer-page.component'
import { ViewAllTransactionsComponent } from './view-all-transactions/view-all-transactions.component';
import { LoanApplyComponent } from './loan-apply/loan-apply.component';
import { WalletPageComponent } from './wallet-page/wallet-page.component';
import { TransferMoneyComponent } from './transfer-money/transfer-money.component';
import { SendAndRequestComponent } from './send-and-request/send-and-request.component';

const routes: Routes = [
  { path: 'UserHome', component: UserHomeComponent },
  { path: '', component: LandingComponent },
  { path: 'BusinessHome', component: BusinessHomeComponent },
  { path: 'UserHome/Transactions', component: ViewAllTransactionsComponent },
  { path: 'Transfer', component : TransferPageComponent},
  { path: 'BusinessHome/Loan', component: LoanApplyComponent },
  { path: 'TransferMoney', component: TransferMoneyComponent},
  { path: 'Wallet', component: WalletPageComponent},
  {path: 'SendAndRequest', component : SendAndRequestComponent} 
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
