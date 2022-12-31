import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StreamConnectionError, StreamConnectionIssueEnum } from '../types';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingService {
  constructor() {}

  handleStreamConnectionError(error: StreamConnectionError): void {
    if (error.connection_issue) {
      switch (error.connection_issue) {
        case StreamConnectionIssueEnum.TOO_MANY_CONNECTIONS:
          alert(
            'This stream is currently at the maximum allowed connection limit.'
          );
          break;
        case StreamConnectionIssueEnum.NO_CONNECTION_WITH_SERVER:
          alert('No connection with Server');
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
          alert('Something went wrong.');
          break;

        default:
          alert('Something went wrong.');
      }
    }
  }
}
