import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendAndRequestComponent } from './send-and-request.component';

describe('SendAndRequestComponent', () => {
  let component: SendAndRequestComponent;
  let fixture: ComponentFixture<SendAndRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendAndRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendAndRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
