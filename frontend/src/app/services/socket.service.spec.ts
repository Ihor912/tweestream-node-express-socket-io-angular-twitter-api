import { TestBed } from '@angular/core/testing';
import { Socket } from 'socket.io-client';
import { AppConfigService } from './app-config.service';

import { SocketService } from './socket.service';
import { TimeTrackingService } from './time-tracking.service';
import { DefaultEventsMap } from '@socket.io/component-emitter';

describe('SocketService', () => {
  let service: SocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AppConfigService,
          useValue: {
            getBaseSocketURL: jest.fn(),
          },
        },
        {
          provide: TimeTrackingService,
          useValue: {
            startTracking: jest.fn(),
            trackNewTweet: jest.fn(),
            stopTracking: jest.fn(),
          },
        },
      ],
    });
    service = TestBed.inject(SocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should destroy all socket subscriptions and stop time tracking on destroySocketConnection call', () => {
    service.socket = {
      disconnect: jest.fn(),
      removeAllListeners: jest.fn(),
    } as unknown as Socket<DefaultEventsMap, DefaultEventsMap>;
    const spyOnDisconnect = jest.spyOn(service.socket, 'disconnect');
    const spyOnRemoveAllListeners = jest.spyOn(
      service.socket,
      'removeAllListeners'
    );
    const spyOnStopTracking = jest.spyOn(
      service.timeTrackingService,
      'stopTracking'
    );

    service.destroySocketConnection();
    expect(spyOnDisconnect).toHaveBeenCalled();
    expect(spyOnRemoveAllListeners).toHaveBeenCalled();
    expect(spyOnStopTracking).toHaveBeenCalled();
  });
});
