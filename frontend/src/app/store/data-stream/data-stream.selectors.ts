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

export const isDataStreamingInProgress = createSelector(
  getDataStreamState,
  (state: DataStreamState) => state.dataStreamingInProgress
);

export const getDataStreamSuccess = createSelector(
  getDataStreamState,
  (state: DataStreamState) => state.getDataStreamSuccess
);
export const getDataStreamError = createSelector(
  getDataStreamState,
  (state: DataStreamState) => state.getDataStreamError
);

export const stopDataStreamSuccess = createSelector(
  getDataStreamState,
  (state: DataStreamState) => state.stopDataStreamSuccess
);
export const stopDataStreamError = createSelector(
  getDataStreamState,
  (state: DataStreamState) => state.stopDataStreamError
);

export const reconnectToDataStreamSuccess = createSelector(
  getDataStreamState,
  (state: DataStreamState) => state.reconnectToDataStreamSuccess
);
export const reconnectToDataStreamError = createSelector(
  getDataStreamState,
  (state: DataStreamState) => state.reconnectToDataStreamError
);
