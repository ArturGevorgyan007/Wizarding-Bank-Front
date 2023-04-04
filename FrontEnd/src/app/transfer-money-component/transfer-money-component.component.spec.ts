import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferMoneyComponentComponent } from './transfer-money-component.component';

describe('TransferMoneyComponentComponent', () => {
  let component: TransferMoneyComponentComponent;
  let fixture: ComponentFixture<TransferMoneyComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferMoneyComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferMoneyComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
