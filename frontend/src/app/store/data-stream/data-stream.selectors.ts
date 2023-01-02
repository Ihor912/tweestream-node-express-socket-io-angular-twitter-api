import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  DataStreamPartialState,
  DataStreamState,
  DATA_STREAM_FEATURE_KEY,
} from './data-stream.reducer';

export const getDataStreamState = createFeatureSelector<
  DataStreamPartialState,
  DataStreamState
>(DATA_STREAM_FEATURE_KEY);

export const streamConnectionStatus = createSelector(
  getDataStreamState,
  (state: DataStreamState) => state.streamConnectionStatus
);

export const getDataStreamSuccess = createSelector(
  getDataStreamState,
  (state: DataStreamState) => state.getDataStreamSuccess
);
export const getDataStreamError = createSelector(
  getDataStreamState,
  (state: DataStreamState) => state.getDataStreamError
);

export const reconnectToDataStreamSuccess = createSelector(
  getDataStreamState,
  (state: DataStreamState) => state.reconnectToDataStreamSuccess
);
export const reconnectToDataStreamError = createSelector(
  getDataStreamState,
  (state: DataStreamState) => state.reconnectToDataStreamError
);
