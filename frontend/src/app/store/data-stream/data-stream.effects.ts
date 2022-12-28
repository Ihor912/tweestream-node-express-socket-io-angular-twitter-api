import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SocketService } from '../../services/socket.service';
import { StreamStatusResponse, Tweet } from '../../types/data-stream';
import { TweetResponse } from '../../types/data-stream';
import * as DataStreamActions from './data-stream.actions';

@Injectable()
export class DataStreamEffects {
  getDataStream$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DataStreamActions.getDataStreamAction),
      fetch({
        run: () =>
          this.socketService.getDataStream().pipe(
            map((tweetResponse: TweetResponse) => {
              const authorName =
                tweetResponse.includes.users.find(
                  (x: { username: string }) => x.username
                )?.username || null;

              const location =
                tweetResponse.includes.users.find(
                  (x: { location: string }) => x.location
                )?.location || null;

              const tweet: Tweet = {
                id: tweetResponse.data.id,
                text: tweetResponse.data.text,
                authorName,
                location,
              };

              return DataStreamActions.getDataStreamActionSuccess(tweet);
            })
          ),
        onError: (action, error: HttpErrorResponse) =>
          DataStreamActions.getDataStreamActionFailure({ error }),
      })
    )
  );

  stopDataStream$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DataStreamActions.stopDataStreamAction),
      fetch({
        run: () =>
          of(true).pipe(
            map(() => {
              this.socketService.disconnectFromDataStream();
              return DataStreamActions.stopDataStreamActionSuccess({
                status: 'OK',
              });
            })
          ),
        onError: (action, error: HttpErrorResponse) =>
          DataStreamActions.stopDataStreamActionFailure({ error }),
      })
    )
  );

  constructor(
    private actions$: Actions,
    private socketService: SocketService
  ) {}
}
