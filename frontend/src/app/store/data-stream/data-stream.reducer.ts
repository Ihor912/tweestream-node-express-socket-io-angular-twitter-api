import { HttpErrorResponse } from '@angular/common/http';
import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Rule, RulesStatusResponse } from '../../types/data-streaming-rule';
import * as DataStreamActions from './data-stream.actions';
import { StreamStatusResponse, Tweet } from '../../types/data-stream';

export const DATA_STREAM_FEATURE_KEY = 'data-stream';

export interface DataStreamState extends EntityState<Rule> {
  getDataStreamSuccess: Tweet | null;
  getDataStreamError?: HttpErrorResponse | null;
  stopDataStreamSuccess: StreamStatusResponse | null;
  stopDataStreamError?: HttpErrorResponse | null;
}

export const dataStreamingRuleAdapter: EntityAdapter<Rule> =
  createEntityAdapter<Rule>();

export interface DataStreamPartialState {
  readonly [DATA_STREAM_FEATURE_KEY]: DataStreamState;
}

export const dataStreamInitialState: DataStreamState =
  dataStreamingRuleAdapter.getInitialState({
    getDataStreamSuccess: null,
    getDataStreamError: null,
    stopDataStreamSuccess: null,
    stopDataStreamError: null,
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
    stopDataStreamSuccess: data,
    stopDataStreamError: null,
  })),
  on(DataStreamActions.stopDataStreamActionFailure, (state, { error }) => ({
    ...state,
    stopDataStreamSuccess: null,
    stopDataStreamError: error,
  }))
);

export function dataStreamReducer(
  state: DataStreamState | undefined,
  action: Action
) {
  return reducer(state, action);
}
