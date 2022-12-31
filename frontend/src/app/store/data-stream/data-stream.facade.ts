import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromDataStream from './data-stream.reducer';
import * as DataStreamSelectors from './data-stream.selectors';
import * as DataStreamActions from './data-stream.actions';
import { Observable } from 'rxjs';
import {
  StreamConnectionError,
  StreamStatusResponse,
  Tweet,
} from '../../types';

@Injectable()
export class DataStreamFacade {
  isDataStreamingInProgress$: Observable<boolean> = this.store.pipe(
    select(DataStreamSelectors.isDataStreamingInProgress)
  );

  getDataStreamSuccess$: Observable<Tweet | null> = this.store.pipe(
    select(DataStreamSelectors.getDataStreamSuccess)
  );

  getDataStreamError$: Observable<StreamConnectionError | null | undefined> =
    this.store.pipe(select(DataStreamSelectors.getDataStreamError));

  stopDataStreamSuccess$: Observable<StreamStatusResponse | null | undefined> =
    this.store.pipe(select(DataStreamSelectors.stopDataStreamSuccess));

  stopDataStreamError$: Observable<StreamConnectionError | null | undefined> =
    this.store.pipe(select(DataStreamSelectors.stopDataStreamError));

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

  stopDataStream(): void {
    this.store.dispatch(DataStreamActions.stopDataStreamAction());
  }

  reconnectToDataStream(): void {
    this.store.dispatch(DataStreamActions.reconnectToDataStreamAction());
  }
}
