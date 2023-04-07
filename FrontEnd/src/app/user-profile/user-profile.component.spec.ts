import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileComponent } from './user-profile.component';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserDataService } from '../user-data.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';


describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let uds: UserDataService;
  let cookie: CookieService;
  let router: Router;
  let userDataServiceSpy: jasmine.SpyObj<UserDataService>;
  let cookieServiceSpy: jasmine.SpyObj<CookieService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserProfileComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([])
      ]
    })
      .compileComponents();

    router = TestBed.inject(Router);
    cookie = TestBed.inject(CookieService);
    uds = TestBed.inject(UserDataService);
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should Get Personal User Email and ID', () => {
    cookie.set('userType', 'Personal');
    cookie.set('email', 'test3@gmail.com');
    spyOn(uds, 'retrieveUserIdFromDB').and.returnValue(of(6));
    component.userObj = [{}, {}];
    component.ngOnInit();
  });

  it('should navigate to user home on exit', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.exit(new Event('click'));
    expect(navigateSpy).toHaveBeenCalledWith(['/UserHome']);
  });

  // it('should update user profile on save', () => {
  //   let tempObj = [{}, {}];
  //   const updateSpy = spyOn(uds, 'updateUserProfile').and.returnValue(of(tempObj));
  //   const navigateSpy = spyOn(router, 'navigate');
  //   component.userObj = [{ fullName: 'Test User', address: '123 Main St', username: 'testuser' }, {}];
  //   component.name = 'New User Name';
  //   component.address = '456 Elm St';
  //   component.saveProfile(new Event('click'));
  //   expect(updateSpy).toHaveBeenCalledWith({
  //     name: 'New User Name',
  //     address: '456 Elm St',
  //     username: 'testuser'
  //   });

  //   expect(navigateSpy).toHaveBeenCalledWith(['/UserHome']);
  // });

  it('should create the component', () => {

    expect(component).toBeTruthy();
  });

  // describe('ngOnInit', () => {

  //   it('should set Email property from cookie service', () => {
  //     cookieServiceSpy.get.and.returnValue('test@test.com');
  //     component.ngOnInit();
  //     expect(component.Email).toEqual('test@test.com');

  //   });

  //   it('should call getUser method of UserDataService', () => {
  //     component.ngOnInit();
  //     expect(userDataServiceSpy.getUser).toHaveBeenCalled();
  //   });

  //   it('should call retrieveUserIdFromDB method of UserDataService with user data', () => {
  //     userDataServiceSpy.getUser.and.returnValue('test user');
  //     component.ngOnInit();
  //     expect(userDataServiceSpy.retrieveUserIdFromDB).toHaveBeenCalledWith('test user');
  //   });

  //   it('should set Id property of UserDataService from retrieved user ID', () => {
  //     userDataServiceSpy.retrieveUserIdFromDB.and.returnValue(of(123));
  //     component.ngOnInit();
  //     expect(userDataServiceSpy.Id).toEqual(123);
  //   });

  //   it('should call getFullPersonalUser method of UserDataService with retrieved user ID', () => {
  //     userDataServiceSpy.retrieveUserIdFromDB.and.returnValue(of(123));
  //     component.ngOnInit();
  //     expect(userDataServiceSpy.getFullPersonalUser).toHaveBeenCalledWith(123);
  //   });

  //   it('should set userObj, name, address, and username properties from retrieved user data', () => {
  //     const userData = [{ fullName: 'test user', address: 'test address', username: 'testuser123' }];
  //     userDataServiceSpy.getFullPersonalUser.and.returnValue(of(userData));
  //     component.ngOnInit();
  //     expect(component.userObj).toEqual(userData);
  //     expect(component.name).toEqual('test user');
  //     expect(component.address).toEqual('test address');
  //     expect(component.username).toEqual('testuser123');
  //   });

  // });

  describe('onKey', () => {
    it('should set name property when called with name field', () => {
      component.onKey({ target: { value: 'John Doe' } }, 'name');
      expect(component.name).toEqual('John Doe');
    });

    it('should set address property when called with address field', () => {
      component.onKey({ target: { value: '123 Main St' } }, 'address');
      expect(component.address).toEqual('123 Main St');
    });
  });




  // describe('saveProfile', () => {
  //   beforeEach(() => {
  //     component.userObj = [{ fullName: 'test user', address: 'test address', username: 'testuser123' }];
  //   });

  //   it('should update user profile with new name and address and navigate to UserHome', () => {
  //     userDataServiceSpy.updateUserProfile.and.returnValue(of(['success']));
  //     const routerNavigateSpy = spyOn(router, 'navigate');
  //     component.name = 'John Doe';
  //     component.address = '123 Main St';
  //     component.saveProfile(new Event('click'));
  //     expect(userDataServiceSpy.updateUserProfile).toHaveBeenCalledWith({ fullName: 'John Doe', address: '123 Main St', username: 'testuser123' });
  //     expect(routerNavigateSpy).toHaveBeenCalledWith(['/UserHome']);
  //   });
  // });

  describe('exit', () => {
    it('should navigate to UserHome', () => {
      const routerNavigateSpy = spyOn(router, 'navigate');
      component.exit(new Event('click'));
      expect(routerNavigateSpy).toHaveBeenCalledWith(['/UserHome']);
    });
  });
});
