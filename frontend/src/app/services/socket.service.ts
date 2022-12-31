import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import {
  StreamConnectionError,
  StreamConnectionIssueEnum,
  TweetResponse,
} from '../types';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { AppConfigService, SOCKET_ENDPOINTS } from '.';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  socketEndpoints = SOCKET_ENDPOINTS;
  socket!: Socket<DefaultEventsMap, DefaultEventsMap>;
  constructor(public appConfigService: AppConfigService) {}

  getDataStream(): Observable<TweetResponse> {
    this.socket = io(this.prepareApiURL());

    this.socket.on(this.socketEndpoints.dataStreamConnectionEvent, () => {
      console.log('Connected to server.');
    });

    return new Observable((observer) => {
      this.socket.on(this.socketEndpoints.newTweetClientEvent, (tweet) =>
        observer.next(tweet as TweetResponse)
      );

      // handle server error
      this.socket.on(this.socketEndpoints.errorEvent, (error) =>
        observer.error(error as StreamConnectionError)
      );

      // handle no-connection-with-server error
      this.socket.on(this.socketEndpoints.noConnectionEvent, () => {
        observer.error({
          connection_issue: StreamConnectionIssueEnum.NO_CONNECTION_WITH_SERVER,
        } as StreamConnectionError);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

  disconnectFromDataStream(): void {
    if (this.socket) {
      console.log('Disconnected from server.');
      this.socket.disconnect();
    }
  }

  reconnectToDataStream(): void {
    if (this.socket?.disconnected) {
      console.log('Reconnected to server.');
      this.socket.connect();
    }
  }

  private prepareApiURL(): string {
    return this.appConfigService.getBaseApiURL();
  }
}
