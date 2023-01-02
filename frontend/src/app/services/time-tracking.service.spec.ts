import { TestBed } from '@angular/core/testing';
import { Socket } from 'socket.io-client';
import { AppConfigService } from './app-config.service';

import { TimeTrackingService } from './time-tracking.service';

describe('TimeTrackingService', () => {
  let service: TimeTrackingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeTrackingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should correct value from averageNumberOfTweetsPerMinute', () => {
    expect(service.averageNumberOfTweetsPerMinute).toBe(0);
  });

  it('should not call stopTracking and startTracking on resetStartTrackingDateTime if tracking was not started', () => {
    const spyOnStopTracking = jest.spyOn(service, 'stopTracking');
    const spyOnStartTracking = jest.spyOn(service, 'startTracking');

    service.resetStartTrackingDateTime();
    expect(spyOnStopTracking).not.toHaveBeenCalled();
    expect(spyOnStartTracking).not.toHaveBeenCalled();

    service.startTracking();

    service.resetStartTrackingDateTime();
    expect(spyOnStopTracking).toHaveBeenCalled();
    expect(spyOnStartTracking).toHaveBeenCalled();
  });
});
