import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ApiClient, ApiService, AppConfigService } from '.';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: ApiClient,
          useValue: {},
        },
        {
          provide: AppConfigService,
          useValue: {
            getBaseApiURL: jest.fn(() => 'http://localhost:3000'),
          },
        },
      ],
    });
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return base API URL on prepareApiURL call', () => {
    expect(service.prepareApiURL('/api/test_url')).toBe(
      'http://localhost:3000/api/test_url'
    );
  });
});
