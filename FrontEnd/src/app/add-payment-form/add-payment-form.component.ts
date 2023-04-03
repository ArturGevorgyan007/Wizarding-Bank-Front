import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Form, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-payment-form',
  templateUrl: './add-payment-form.component.html',
  styleUrls: ['./add-payment-form.component.css']
})
export class AddPaymentFormComponent {
  mode : string = "credit";

  constructor(private router: Router){}

  toggleMode(mode : string) : void {
    this.mode = mode;
  }

  confirm(event: Event): void{
    event.preventDefault();
    console.log("confirm Function");
    this.router.navigate(['/UserHome']);
  }
}
