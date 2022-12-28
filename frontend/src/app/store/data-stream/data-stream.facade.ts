import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromDataStream from './data-stream.reducer';
import * as DataStreamSelectors from './data-stream.selectors';
import * as DataStreamActions from './data-stream.actions';
import { Observable } from 'rxjs';
import { StreamStatusResponse, Tweet } from '../../types/data-stream';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class DataStreamFacade {
  getDataStreamSuccess$: Observable<Tweet | null> = this.store.pipe(
    select(DataStreamSelectors.getDataStreamSuccess)
  );

  getDataStreamError$: Observable<HttpErrorResponse | null | undefined> =
    this.store.pipe(select(DataStreamSelectors.getDataStreamError));

  stopDataStreamSuccess$: Observable<StreamStatusResponse | null | undefined> =
    this.store.pipe(select(DataStreamSelectors.stopDataStreamSuccess));

  stopDataStreamError$: Observable<HttpErrorResponse | null | undefined> =
    this.store.pipe(select(DataStreamSelectors.stopDataStreamError));

  constructor(private store: Store<fromDataStream.DataStreamPartialState>) {}

  getDataStream(): void {
    this.store.dispatch(DataStreamActions.getDataStreamAction());
  }

  stopDataStream(): void {
    this.store.dispatch(DataStreamActions.stopDataStreamAction());
  }
}
