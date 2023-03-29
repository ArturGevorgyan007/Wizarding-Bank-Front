import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreloginComponent } from './prelogin/prelogin.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { HttpClient } from '@angular/common/http'
import { BusinessHomeComponent } from './business-home/business-home.component';

const routes: Routes = [
  { path: 'UserHome', component: UserHomeComponent },
  { path: '', component: PreloginComponent },
  { path: 'BusinessHome', component: BusinessHomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
