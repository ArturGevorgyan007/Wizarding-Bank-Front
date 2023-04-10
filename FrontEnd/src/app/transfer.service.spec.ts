import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { TransferService } from './transfer.service';

describe('TransferService', () => {
  let httpTestingController: HttpTestingController;
  let service: TransferService;
  let mockHttpClient: jasmine.SpyObj<any>;

  beforeEach(() => {
    mockHttpClient = jasmine.createSpyObj('HttpClient', ['post']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TransferService,
        { provide: HttpClient, useValue: mockHttpClient }
      ]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(TransferService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('cardToWallet', () => {
    it('should make a POST request to the correct URL with the correct body', () => {
      const cardId = 123;
      const userId = 456;
      const amount = 789;
      const expectedUrl = `${service.apiRoot}Transaction/transactions/internal?type=3`;
      const expectedBody = { cardId, recipientId: userId, amount };

      // Mock the response from the API
      const expectedResponse = { success: true };
      mockHttpClient.post.and.returnValue(of(expectedResponse));

      // Call the function and subscribe to the result
      let result;
      service.cardToWallet(cardId, userId, amount).subscribe(res => {
        expect(res).toEqual(expectedResponse);
      });

      // Expect that a POST request was made with the correct URL and body
      const req = httpTestingController.expectOne(expectedUrl);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(expectedBody);

      // Flush the request to return the expected response
      req.flush(expectedResponse);

      
    });
  });
});