import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { StreamConnectionError, StreamConnectionIssueEnum } from '../types';
import { ErrorHandlingService } from './error-handling.service';

describe('ErrorHandlingService', () => {
  let service: ErrorHandlingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: NzNotificationService,
          useValue: {
            error: jest.fn(),
          },
        },
        {
          provide: TranslateService,
          useValue: {
            instant: jest.fn((x) => 'Test'),
          },
        },
      ],
    });
    service = TestBed.inject(ErrorHandlingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle StreamConnectionError.TOO_MANY_CONNECTIONS on handleStreamConnectionError call', () => {
    const spyOnError = jest.spyOn(service.notificationService, 'error');
    const spyOnInstant = jest.spyOn(service.translateService, 'instant');

    service.handleStreamConnectionError({
      connection_issue: StreamConnectionIssueEnum.TOO_MANY_CONNECTIONS,
    } as StreamConnectionError);
    expect(spyOnInstant).toHaveBeenCalledWith('general.error');
    expect(spyOnInstant).toHaveBeenCalledWith(
      'error.message.too-many-connections'
    );
    expect(spyOnError).toHaveBeenCalledWith('Test', 'Test');
  });
  it('should handle StreamConnectionError.NO_CONNECTION_WITH_SERVER on handleStreamConnectionError call', () => {
    const spyOnError = jest.spyOn(service.notificationService, 'error');
    const spyOnInstant = jest.spyOn(service.translateService, 'instant');

    service.handleStreamConnectionError({
      connection_issue: StreamConnectionIssueEnum.NO_CONNECTION_WITH_SERVER,
    } as StreamConnectionError);
    expect(spyOnInstant).toHaveBeenCalledWith('general.error');
    expect(spyOnInstant).toHaveBeenCalledWith(
      'error.message.no-connection-with-server'
    );
    expect(spyOnError).toHaveBeenCalledWith('Test', 'Test');
  });
  it('should handle error that is not implemented yet in handleStreamConnectionError method', () => {
    const spyOnError = jest.spyOn(service.notificationService, 'error');
    const spyOnInstant = jest.spyOn(service.translateService, 'instant');

    service.handleStreamConnectionError({
      connection_issue: 'another_issue' as StreamConnectionIssueEnum,
    } as StreamConnectionError);
    expect(spyOnInstant).toHaveBeenCalledWith('general.error');
    expect(spyOnInstant).toHaveBeenCalledWith(
      'error.message.something-went-wrong'
    );
    expect(spyOnError).toHaveBeenCalledWith('Test', 'Test');
  });
  it('should handle HttpErrorResponse 500 on handleHttpError call', () => {
    const spyOnError = jest.spyOn(service.notificationService, 'error');
    const spyOnInstant = jest.spyOn(service.translateService, 'instant');

    service.handleHttpError({
      error: 500,
    } as HttpErrorResponse);
    expect(spyOnInstant).toHaveBeenCalledWith('general.error');
    expect(spyOnInstant).toHaveBeenCalledWith(
      'error.message.something-went-wrong'
    );
    expect(spyOnError).toHaveBeenCalledWith('Test', 'Test');
  });
  it('should handle other type of HttpErrorResponse on handleHttpError call', () => {
    const spyOnError = jest.spyOn(service.notificationService, 'error');
    const spyOnInstant = jest.spyOn(service.translateService, 'instant');

    service.handleHttpError({
      error: 402,
    } as HttpErrorResponse);
    expect(spyOnInstant).toHaveBeenCalledWith('general.error');
    expect(spyOnInstant).toHaveBeenCalledWith(
      'error.message.something-went-wrong'
    );
    expect(spyOnError).toHaveBeenCalledWith('Test', 'Test');
  });
});
