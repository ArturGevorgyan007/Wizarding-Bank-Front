import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-send-and-request',
  templateUrl: './send-and-request.component.html',
  styleUrls: ['./send-and-request.component.css']
})
export class SendAndRequestComponent {

  transferForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.transferForm = this.fb.group({
      email: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit() {
    const email = this.transferForm.value.email;
    const amount = this.transferForm.value.amount;
    console.log(`Transfer ${amount} to ${email}`);
    // Perform the transfer here
  }
}

