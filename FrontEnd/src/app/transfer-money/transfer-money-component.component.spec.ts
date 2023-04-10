import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransferMoneyComponent } from './transfer-money.component';
import { TransferService } from '../transfer.service';
import { UserDataService } from '../user-data.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { of } from 'rxjs';

describe('TransferMoneyComponent', () => {
  let component: TransferMoneyComponent;
  let fixture: ComponentFixture<TransferMoneyComponent>;
  let mockTransferService;
  let mockUserDataService;
  let mockRouter;
  let mockCookieService : any;

  beforeEach(async () => {
    mockTransferService = jasmine.createSpyObj(['accountToWallet', 'cardToWallet']);
    mockUserDataService = jasmine.createSpyObj(['getUserCards', 'getUserAccounts']);
    mockRouter = jasmine.createSpyObj(['navigateByUrl']);
    mockCookieService = jasmine.createSpyObj(['get']);

    await TestBed.configureTestingModule({
      declarations: [TransferMoneyComponent],
      providers: [
        { provide: TransferService, useValue: mockTransferService },
        { provide: UserDataService, useValue: mockUserDataService },
        { provide: Router, useValue: mockRouter },
        { provide: CookieService, useValue: mockCookieService }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly set type, cardDisplay, bankDisplay, and UID in ngOnInit', () => {
    spyOn(component, 'setType');
    spyOn(component, 'displayAccounts');
    spyOn(component, 'displayCards');
    mockCookieService.get.and.returnValue('1');

    component.ngOnInit();

    expect(component.type).toEqual('c');
    expect(component.cardDsiplay).toEqual(true);
    expect(component.bankDisplay).toEqual(false);
    expect(component.UID).toEqual(1);
    expect(component.setType).toHaveBeenCalledWith('c');
    expect(component.displayAccounts).toHaveBeenCalledWith(1);
    expect(component.displayCards).toHaveBeenCalledWith(1);
  });
});
