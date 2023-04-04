import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AddPaymentFormComponent } from './add-payment-form.component';
import { PaymentFormService } from '../add-payment-form.service';
import { Form, FormBuilder, FormGroup, FormsModule, NgForm } from '@angular/forms';


describe('AddPaymentFormComponent', () => {
  let component: AddPaymentFormComponent;
  let fixture: ComponentFixture<AddPaymentFormComponent>;
  let pfs : PaymentFormService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPaymentFormComponent ],
      imports: [
        HttpClientTestingModule,
        FormsModule
      ]
    })
    .compileComponents();

    pfs = TestBed.inject(PaymentFormService);
    fixture = TestBed.createComponent(AddPaymentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be credit from valid', () => {
    
  });
});
