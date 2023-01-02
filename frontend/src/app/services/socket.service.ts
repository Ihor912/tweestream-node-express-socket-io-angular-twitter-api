import { Injectable } from '@angular/core';
import { distinctUntilChanged, filter, Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import {
  StreamConnectionError,
  StreamConnectionIssueEnum,
  TweetResponse,
} from '../types';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { AppConfigService, SOCKET_ENDPOINTS } from '.';
import { TimeTrackingService } from './time-tracking.service';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  socketEndpoints = SOCKET_ENDPOINTS;
  socket!: Socket<DefaultEventsMap, DefaultEventsMap>;
  constructor(
    public appConfigService: AppConfigService,
    public timeTrackingService: TimeTrackingService
  ) {}

  getDataStream(): Observable<TweetResponse | StreamConnectionError> {
    this.socket = io(this.prepareSocketURL());

    this.socket.on(this.socketEndpoints.dataStreamConnectionEvent, () => {
      console.log('Connected to server.');
      this.timeTrackingService.startTracking();
    });

    return new Observable<TweetResponse | StreamConnectionError>((observer) => {
      this.socket.on(this.socketEndpoints.newTweetClientEvent, (tweet) => {
        this.timeTrackingService.trackNewTweet();
        observer.next(tweet as TweetResponse);
      });

      // handle server error
      this.socket.on(this.socketEndpoints.errorEvent, (error) =>
        observer.next(error as StreamConnectionError)
      );

      // handle no-connection-with-server error
      this.socket.on(this.socketEndpoints.noConnectionEvent, () => {
        observer.next({
          connection_issue: StreamConnectionIssueEnum.NO_CONNECTION_WITH_SERVER,
        } as StreamConnectionError);
      });
      return () => {
        // this.socket.disconnect();
      };
    });
  }

  destroySocketConnection() {
    this.socket.disconnect();
    this.socket.removeAllListeners();
    this.timeTrackingService.stopTracking();
  }

  private prepareSocketURL(): string {
    return this.appConfigService.getBaseSocketURL();
  }
}
