import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromDataStream from './data-stream.reducer';
import * as DataStreamSelectors from './data-stream.selectors';
import * as DataStreamActions from './data-stream.actions';
import { Observable } from 'rxjs';
import {
  StreamConnectionError,
  StreamConnectionStatusEnum,
  StreamStatusResponse,
  Tweet,
} from '../../types';

@Injectable()
export class DataStreamFacade {
  streamConnectionStatus$: Observable<StreamConnectionStatusEnum> =
    this.store.pipe(select(DataStreamSelectors.streamConnectionStatus));

  getDataStreamSuccess$: Observable<Tweet | null> = this.store.pipe(
    select(DataStreamSelectors.getDataStreamSuccess)
  );

  getDataStreamError$: Observable<StreamConnectionError | null | undefined> =
    this.store.pipe(select(DataStreamSelectors.getDataStreamError));

  reconnectToDataStreamSuccess$: Observable<
    StreamStatusResponse | null | undefined
  > = this.store.pipe(select(DataStreamSelectors.reconnectToDataStreamSuccess));

  reconnectToDataStreamError$: Observable<
    StreamConnectionError | null | undefined
  > = this.store.pipe(select(DataStreamSelectors.reconnectToDataStreamError));

  constructor(private store: Store<fromDataStream.DataStreamPartialState>) {}

  getDataStream(): void {
    this.store.dispatch(DataStreamActions.getDataStreamAction());
  }
}
