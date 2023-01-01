import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StreamConnectionError, StreamConnectionIssueEnum } from '../types';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingService {
  constructor(private notificationService: NzNotificationService) {}

  handleStreamConnectionError(error: StreamConnectionError): void {
    if (error.connection_issue) {
      switch (error.connection_issue) {
        case StreamConnectionIssueEnum.TOO_MANY_CONNECTIONS:
          this.notificationService.error(
            'Error',
            'This stream is currently at the maximum allowed connection limit.'
          );
          break;
        case StreamConnectionIssueEnum.NO_CONNECTION_WITH_SERVER:
          this.notificationService.error('Error', 'No connection with Server.');
          break;

        default:
          alert('Something went wrong.');
      }
    }
  }

  handleHttpError(error: HttpErrorResponse): void {
    if (error.error) {
      switch (error.error.status) {
        case 500:
          this.notificationService.error('Error', 'Something went wrong.');
          break;

        default:
          this.notificationService.error('Error', 'Something went wrong.');
      }
    }
  }
}
