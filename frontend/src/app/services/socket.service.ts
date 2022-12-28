import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { Tweet, TweetResponse } from '../types/data-stream';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { AppConfigService } from './app-config.service';
import { SOCKET_ENDPOINTS } from './socket.endpoints';

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
      console.log('Connected to server...');
    });

    return new Observable((observer) => {
      this.socket.on(this.socketEndpoints.newTweetClientEvent, (tweet) =>
        observer.next(tweet as TweetResponse)
      );
      return () => {
        this.socket.disconnect();
      };
    });
  }

  disconnectFromDataStream(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  private prepareApiURL(): string {
    return this.appConfigService.getBaseApiURL();
  }
}
