import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CookieService } from 'ngx-cookie-service';
import { of } from 'rxjs';
import { LoanApplyComponent } from './loan-apply.component';
import { LoanServicesService } from '../loan-services.service';
import { UserDataService } from '../user-data.service';
import { Loan, LoanSchedule } from '../Interfaces/loan';

describe('LoanApplyComponent', () => {
  let component: LoanApplyComponent;
  let fixture: ComponentFixture<LoanApplyComponent>;
  let loanService: LoanServicesService;
  let userDataService: UserDataService;
  let cookieService: CookieService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoanApplyComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        LoanServicesService,
        UserDataService,
        CookieService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanApplyComponent);
    component = fixture.componentInstance;
    loanService = TestBed.inject(LoanServicesService);
    userDataService = TestBed.inject(UserDataService);
    cookieService = TestBed.inject(CookieService);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve the current loan when initialized', () => {
    spyOn(component, 'getCurrentLoan').and.returnValue(of({}));
    component.ngOnInit();
    expect(component.getCurrentLoan).toHaveBeenCalled();
  });

  it('should calculate the monthly payment amount correctly', () => {
    const ir = 10;
    const np = 12;
    const pv = 10000;
    const fv = 0;
    const type = 0;
    const expected = 879.16;
    const result = (component.PMT(ir / 100 / 12, np, pv, fv, type) * (-1)).toFixed(2);
    expect(result).toEqual(expected as unknown as string + '');
  });

  it('should calculate the payoff date correctly', () => {
    const days = 365;
    const expected = new Date();
    expected.setDate(expected.getDate() + days);
    const result = component.getPayoffDate(days);
    expect(result).toEqual(expected);
  });

  it('should create a loan schedule correctly', () => {
    const amount = 10000;
    const interest = 10;
    const period = 1;
    component.amount = amount;
    component.interest = interest;
    component.period = period;
    component.createSchedule();
    const expected: LoanSchedule[] = [
      {
        date: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        payment: 879.16,
        interest: 83.33,
        principal: 795.83,
        balance: 9204.17,
        totalInterest: 83.33
      },
      {
        date: new Date(new Date().setMonth(new Date().getMonth() + 2)),
        payment: 879.16,
        interest: 76.68,
        principal: 802.48,
        balance: 8401.69,
        totalInterest: 159.01
      },
    ]
  })
});