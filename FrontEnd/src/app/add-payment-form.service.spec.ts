import { TestBed } from '@angular/core/testing';
import { PaymentFormService } from "./add-payment-form.service";

describe("PaymentFormService", () => {
  let service: PaymentFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentFormService);
  });

  describe('method1', () => {
    it('should ...', () => {
      expect(service).toBeTruthy();
    });
  });
});
