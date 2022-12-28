import { HttpErrorResponse } from '@angular/common/http';
import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Rule } from '../../types/data-streaming-rule';
import * as DataStreamActions from './data-stream.actions';
import {
  StreamConnectionError,
  StreamStatusResponse,
  Tweet,
} from '../../types/data-stream';

export const DATA_STREAM_FEATURE_KEY = 'data-stream';

export interface DataStreamState extends EntityState<Rule> {
  dataStreamingInProgress: boolean;
  getDataStreamSuccess: Tweet | null;
  getDataStreamError?: StreamConnectionError | null;
  stopDataStreamSuccess: StreamStatusResponse | null;
  stopDataStreamError?: StreamConnectionError | null;
  reconnectToDataStreamSuccess: StreamStatusResponse | null;
  reconnectToDataStreamError?: StreamConnectionError | null;
}

export const dataStreamingRuleAdapter: EntityAdapter<Rule> =
  createEntityAdapter<Rule>();

export interface DataStreamPartialState {
  readonly [DATA_STREAM_FEATURE_KEY]: DataStreamState;
}

export const dataStreamInitialState: DataStreamState =
  dataStreamingRuleAdapter.getInitialState({
    dataStreamingInProgress: false,
    getDataStreamSuccess: null,
    getDataStreamError: null,
    stopDataStreamSuccess: null,
    stopDataStreamError: null,
    reconnectToDataStreamSuccess: null,
    reconnectToDataStreamError: null,
  });

const reducer = createReducer(
  dataStreamInitialState,
  on(DataStreamActions.getDataStreamAction, (state, data) => ({
    ...state,
    getDataStreamSuccess: null,
    getDataStreamError: null,
  })),
  on(DataStreamActions.getDataStreamActionSuccess, (state, data) => ({
    ...state,
    dataStreamingInProgress: true,
    getDataStreamSuccess: data,
    getDataStreamError: null,
  })),
  on(DataStreamActions.getDataStreamActionFailure, (state, { error }) => ({
    ...state,
    getDataStreamSuccess: null,
    getDataStreamError: error,
  })),
  on(DataStreamActions.stopDataStreamAction, (state, data) => ({
    ...state,
    stopDataStreamSuccess: null,
    stopDataStreamError: null,
  })),
  on(DataStreamActions.stopDataStreamActionSuccess, (state, data) => ({
    ...state,
    dataStreamingInProgress: false,
    stopDataStreamSuccess: data,
    stopDataStreamError: null,
  })),
  on(DataStreamActions.stopDataStreamActionFailure, (state, { error }) => ({
    ...state,
    stopDataStreamSuccess: null,
    stopDataStreamError: error,
  })),
  on(DataStreamActions.reconnectToDataStreamAction, (state, data) => ({
    ...state,
    reconnectToDataStreamSuccess: null,
    reconnectToDataStreamError: null,
  })),
  on(DataStreamActions.reconnectToDataStreamActionSuccess, (state, data) => ({
    ...state,
    dataStreamingInProgress: true,
    reconnectToDataStreamSuccess: data,
    reconnectToDataStreamError: null,
  })),
  on(
    DataStreamActions.reconnectToDataStreamActionFailure,
    (state, { error }) => ({
      ...state,
      reconnectToDataStreamSuccess: null,
      reconnectToDataStreamError: error,
    })
  )
);

export function dataStreamReducer(
  state: DataStreamState | undefined,
  action: Action
) {
  return reducer(state, action);
}
