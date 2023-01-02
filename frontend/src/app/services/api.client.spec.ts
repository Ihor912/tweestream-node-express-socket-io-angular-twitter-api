import { TestBed } from '@angular/core/testing';
import { ApiClient } from './api.client';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('ApiClient', () => {
  let service: ApiClient;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiClient],
    });
  });
  beforeEach(() => {
    service = TestBed.inject(ApiClient);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should create service', () => {
    expect(service).toBeTruthy();
  });

  it('should call http get method', (done) => {
    const spy = jest.spyOn(httpClient, 'get');
    service.get('/some/url').subscribe(() => {
      expect(spy).toHaveBeenCalled();
      done();
    });
    const req = httpMock.expectOne('/some/url');
    httpMock.verify();
    req.flush({ data: 'test' });
  });

  it('should call http delete method', (done) => {
    const spy = jest.spyOn(httpClient, 'delete');
    service.delete('/some/url').subscribe(() => {
      expect(spy).toHaveBeenCalled();
      done();
    });
    const req = httpMock.expectOne('/some/url');
    httpMock.verify();
    req.flush({});
  });

  it('should call http post method', (done) => {
    const spy = jest.spyOn(httpClient, 'post');
    service.post('/some/url', { data: 'test' } /*, 'zip'*/).subscribe(() => {
      expect(spy).toHaveBeenCalled();
      done();
    });
    const req = httpMock.expectOne('/some/url');
    httpMock.verify();
    req.flush({ data: 'test' });
  });
});
