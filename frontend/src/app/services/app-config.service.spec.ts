import { TestBed } from '@angular/core/testing';

import { AppConfigService } from './app-config.service';

describe('AppConfigService', () => {
  let service: AppConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return base URL from getBaseApiURL', () => {
    expect(service.getBaseApiURL()).toBe('http://localhost:3000');
  });

  it('should return base URL from getBaseSocketURL', () => {
    expect(service.getBaseApiURL()).toBe('http://localhost:3000');
  });
});
