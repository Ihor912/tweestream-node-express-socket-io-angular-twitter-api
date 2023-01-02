import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as DataStreamActions from './data-stream.actions';
import {
  StreamConnectionError,
  StreamStatusResponse,
  Tweet,
  Rule,
  StreamConnectionStatusEnum,
} from '../../types';

export const DATA_STREAM_FEATURE_KEY = 'data-stream';

export interface DataStreamState extends EntityState<Rule> {
  streamConnectionStatus: StreamConnectionStatusEnum;
  getDataStreamSuccess: Tweet | null;
  getDataStreamError?: StreamConnectionError | null;
  reconnectToDataStreamSuccess: StreamStatusResponse | null;
  reconnectToDataStreamError?: StreamConnectionError | null;
}

export const dataStreamAdapter: EntityAdapter<Rule> =
  createEntityAdapter<Rule>();

export interface DataStreamPartialState {
  readonly [DATA_STREAM_FEATURE_KEY]: DataStreamState;
}

export const dataStreamInitialState: DataStreamState =
  dataStreamAdapter.getInitialState({
    streamConnectionStatus: StreamConnectionStatusEnum.PROCESSING,
    getDataStreamSuccess: null,
    getDataStreamError: null,
    reconnectToDataStreamSuccess: null,
    reconnectToDataStreamError: null,
  });

const reducer = createReducer(
  dataStreamInitialState,
  on(DataStreamActions.getDataStreamAction, (state, data) => ({
    ...state,
    streamConnectionStatus: StreamConnectionStatusEnum.PROCESSING,
    getDataStreamSuccess: null,
    getDataStreamError: null,
  })),
  on(DataStreamActions.getDataStreamActionSuccess, (state, data) => ({
    ...state,
    streamConnectionStatus: StreamConnectionStatusEnum.ON,
    getDataStreamSuccess: data,
    getDataStreamError: null,
  })),
  on(DataStreamActions.getDataStreamActionFailure, (state, { error }) => ({
    ...state,
    streamConnectionStatus: StreamConnectionStatusEnum.OFF,
    getDataStreamSuccess: null,
    getDataStreamError: error,
  }))
);

export function dataStreamReducer(
  state: DataStreamState | undefined,
  action: Action
) {
  return reducer(state, action);
}
