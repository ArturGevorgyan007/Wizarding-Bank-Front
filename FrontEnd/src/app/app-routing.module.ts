import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './Landing/Landing.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { HttpClient } from '@angular/common/http'
import { BusinessHomeComponent } from './business-home/business-home.component';
import { UserGuard } from './user.guard';
import { AddPaymentFormComponent } from './add-payment-form/add-payment-form.component';

const routes: Routes = [
  { path: 'UserHome', component: UserHomeComponent },
  { path: '', component: LandingComponent },
  { path: 'BusinessHome', component: BusinessHomeComponent },
  { path: 'AddPayment', component: AddPaymentFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
