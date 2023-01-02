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

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  socketEndpoints = SOCKET_ENDPOINTS;
  socket!: Socket<DefaultEventsMap, DefaultEventsMap>;
  constructor(public appConfigService: AppConfigService) {}

  getDataStream(): Observable<TweetResponse> {
    this.socket = io(this.prepareSocketURL());

    this.socket.on(this.socketEndpoints.dataStreamConnectionEvent, () => {
      console.log('Connected to server.');
    });

    return new Observable<TweetResponse>((observer) => {
      this.socket.on(this.socketEndpoints.newTweetClientEvent, (tweet) => {
        observer.next(tweet as TweetResponse);
      });

      // setInterval(() => {
      //   observer.next({
      //     data: {
      //       author_id: '234234',
      //       id: 'sdfsdfser3wereter',
      //       public_metrics: {
      //         like_count: 31,
      //         retweet_count: 4,
      //       },
      //       text: 'Test djkd feriof enio rfn eriogerg erg eoirgjoie rgiof ergoij',
      //     },
      //     includes: {
      //       users: [
      //         {
      //           id: 'jfojer334r34',
      //           name: 'Test User',
      //           username: 'testUser',
      //           location: 'LA',
      //         },
      //       ],
      //     },
      //   } as TweetResponse);
      // }, 5000);

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
        // this.socket.disconnect();
      };
    });
  }

  destroySocketConnection() {
    this.socket.disconnect();
    this.socket.removeAllListeners();
  }

  private prepareSocketURL(): string {
    return this.appConfigService.getBaseSocketURL();
  }
}
