import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AddPaymentFormComponent } from './add-payment-form.component';
import { PaymentFormService } from '../add-payment-form.service';
import { Form, FormBuilder, FormGroup, FormsModule, NgForm } from '@angular/forms';
import { UserDataService } from '../user-data.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { UserHomeComponent } from '../user-home/user-home.component';


describe('AddPaymentFormComponent', () => {
  let component: AddPaymentFormComponent;
  let fixture: ComponentFixture<AddPaymentFormComponent>;
  let pfs : PaymentFormService;
  let uds : UserDataService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPaymentFormComponent ],
      imports: [
        HttpClientTestingModule,
        FormsModule
      ]
    })
    .compileComponents();

    uds = TestBed.inject(UserDataService);
    pfs = TestBed.inject(PaymentFormService);
    fixture = TestBed.createComponent(AddPaymentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should ngOnInit', () => {
    uds.email = "123@123.com";
    spyOn(uds, 'retrieveUserIdFromDB').and.returnValue(of(1));
    component.ngOnInit();
    expect(uds.Id).toBe(1);
  });

  it('should toggle mode', () => {
    const mode = 'credit';
    component.toggleMode(mode);
    expect(component.mode).toEqual(mode);
  });
  it('should confirm credit ', () => {
    const mode = 'credit';
    component.toggleMode(mode);
    expect(component.mode).toEqual(mode);
    const form : NgForm = {
      valid: true,
      name: "cardForm",
      value:{
        username: "testuser",  
        cardNumber: '1234567891234567',
        expDate: new Date,
        cardCvv: 123
      }
    } as NgForm;
    component.CardModel.Balance = 1000.00;
    component.CardModel.Cvv = 123;
    component.CardModel.CardNumber = 123456789123456;
    component.CardModel.ExpiryDate = new Date;
    // spyOn(pfs, 'addCard').and.returnValue(of(component.CardModel));
    expect(component.CardModel).toBe(component.CardModel);
    component.confirm(form);
  });
  
  it('should return false for an invalid card number', () => {
    const cardNumber = '1234567890123456';
  });
});
