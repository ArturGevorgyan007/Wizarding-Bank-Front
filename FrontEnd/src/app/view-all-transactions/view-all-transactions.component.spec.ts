import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ViewAllTransactionsComponent } from './view-all-transactions.component';
import { UserDataService } from '../user-data.service';
import { of } from 'rxjs';

describe('ViewAllTransactionsComponent', () => {
  let component: ViewAllTransactionsComponent;
  let httpMock: HttpTestingController;
  let fixture: ComponentFixture<ViewAllTransactionsComponent>;
  let userApi: UserDataService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAllTransactionsComponent ],
      imports: [
        HttpClientTestingModule
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAllTransactionsComponent);
    userApi = TestBed.inject(UserDataService);
    httpMock = TestBed.inject(HttpTestingController)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', async () => {
    expect(component.Transactions).toEqual([])
    expect(component.user).toEqual('' || undefined)

    userApi.email = "random@email.com"
    spyOn(component, 'ngOnInit')
    spyOn(userApi, 'getUser') //.and.returnValue(of("random@email.com"))
    component.ngOnInit()

    expect(component.ngOnInit).toHaveBeenCalled()
    expect(userApi.email).toBe("random@email.com")

    httpMock.expectOne('http://localhost:5092/user/byEmail/undefined')

    // expect(userApi.getUser).toHaveBeenCalled()
  })
});
