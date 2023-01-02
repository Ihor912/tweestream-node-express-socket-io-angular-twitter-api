import { async, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';

import * as fromActions from './data-stream.actions';
import { DataStreamEffects } from './data-stream.effects';
import { SocketService } from '../../services';
import {
  StreamConnectionError,
  StreamConnectionIssueEnum,
  Tweet,
  TweetResponse,
} from '../../types';

describe('DataStreamEffects', () => {
  let actions$: Observable<Action>;
  let effect: DataStreamEffects;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        Actions,
        provideMockStore(),
        provideMockActions(() => actions$),
        {
          provide: SocketService,
          useValue: {},
        },
      ],
    });

    const actions = TestBed.inject(Actions);
    const socketService = TestBed.inject(SocketService);

    effect = new DataStreamEffects(actions, socketService);
  }));

  it('should call getDataStream', () => {
    const response = {
      data: {
        author_id: '234',
        id: '2e234',
        text: 'Test',
      },
    };

    effect['socketService'].getDataStream = jest.fn(() =>
      of(response as TweetResponse)
    );
    const getDataStreamActionSuccess = jest.spyOn(
      fromActions,
      'getDataStreamActionSuccess'
    );
    actions$ = of(
      fromActions.getDataStreamActionSuccess({ id: 2e234 } as unknown as Tweet)
    );
    expect(getDataStreamActionSuccess).toHaveBeenCalled();
  });

  it('should call getDataStream with error', () => {
    const response = {
      connection_issue: StreamConnectionIssueEnum.TOO_MANY_CONNECTIONS,
    };

    effect['socketService'].getDataStream = jest.fn(() =>
      of(response as StreamConnectionError)
    );
    const getDataStreamActionFailure = jest.spyOn(
      fromActions,
      'getDataStreamActionFailure'
    );
    actions$ = of(
      fromActions.getDataStreamActionFailure({
        error: {
          connection_issue: StreamConnectionIssueEnum.TOO_MANY_CONNECTIONS,
        } as StreamConnectionError,
      })
    );
    expect(getDataStreamActionFailure).toHaveBeenCalled();
  });
});
