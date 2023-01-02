import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StreamConnectionError, StreamConnectionIssueEnum } from '../types';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingService {
  constructor(
    public notificationService: NzNotificationService,
    public translateService: TranslateService
  ) {}

  handleStreamConnectionError(error: StreamConnectionError): void {
    if (error.connection_issue) {
      switch (error.connection_issue) {
        case StreamConnectionIssueEnum.TOO_MANY_CONNECTIONS:
          this.notificationService.error(
            this.translateService.instant('general.error'),
            this.translateService.instant('error.message.too-many-connections')
          );
          break;
        case StreamConnectionIssueEnum.NO_CONNECTION_WITH_SERVER:
          this.notificationService.error(
            this.translateService.instant('general.error'),
            this.translateService.instant(
              'error.message.no-connection-with-server'
            )
          );
          break;

        default:
          this.notificationService.error(
            this.translateService.instant('general.error'),
            this.translateService.instant('error.message.something-went-wrong')
          );
      }
    }
  }

  handleHttpError(error: HttpErrorResponse): void {
    if (error.error) {
      switch (error.error.status) {
        case 500:
          this.notificationService.error(
            this.translateService.instant('general.error'),
            this.translateService.instant('error.message.something-went-wrong')
          );
          break;

        default:
          this.notificationService.error(
            this.translateService.instant('general.error'),
            this.translateService.instant('error.message.something-went-wrong')
          );
      }
    }
  }
}
