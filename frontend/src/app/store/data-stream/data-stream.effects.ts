import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SocketService } from '../../services';
import { StreamConnectionError, Tweet, TweetResponse } from '../../types';
import * as DataStreamActions from './data-stream.actions';

@Injectable()
export class DataStreamEffects {
  getDataStream$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DataStreamActions.getDataStreamAction),
      fetch({
        run: () =>
          this.socketService.getDataStream().pipe(
            map((response: TweetResponse | StreamConnectionError) => {
              if ((response as StreamConnectionError).connection_issue) {
                return DataStreamActions.getDataStreamActionFailure({
                  error: response as StreamConnectionError,
                });
              } else {
                const tweetResponse = response as TweetResponse;
                const authorName =
                  tweetResponse.includes?.users.find(
                    (x: { username: string }) => x.username
                  )?.username || null;

                const location =
                  tweetResponse.includes?.users.find(
                    (x: { location: string }) => x.location
                  )?.location || null;

                const tweet: Tweet = {
                  id: tweetResponse.data?.id,
                  text: tweetResponse.data?.text,
                  authorName,
                  location,
                };

                return DataStreamActions.getDataStreamActionSuccess(tweet);
              }
            })
          ),
        onError: (action, error: StreamConnectionError) =>
          DataStreamActions.getDataStreamActionFailure({ error }),
      })
    )
  );

  constructor(
    private actions$: Actions,
    private socketService: SocketService
  ) {}
}
