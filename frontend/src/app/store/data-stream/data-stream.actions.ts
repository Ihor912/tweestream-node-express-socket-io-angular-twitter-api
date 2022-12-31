import { createAction, props } from '@ngrx/store';
import {
  StreamConnectionError,
  StreamStatusResponse,
  Tweet,
} from '../../types';

export const getDataStreamAction = createAction(
  '[Data Stream] Get Data Stream'
);

export const getDataStreamActionSuccess = createAction(
  '[Data Stream] Get Data Stream Success',
  props<Tweet>()
);

export const getDataStreamActionFailure = createAction(
  '[Data Stream] Get Data Stream Failure',
  props<{ error: StreamConnectionError }>()
);

export const stopDataStreamAction = createAction(
  '[Data Stream] Stop Data Stream'
);

export const stopDataStreamActionSuccess = createAction(
  '[Data Stream] Stop Data Stream Success',
  props<StreamStatusResponse>()
);

export const stopDataStreamActionFailure = createAction(
  '[Data Stream] Stop Data Stream Failure',
  props<{ error: StreamConnectionError }>()
);

export const reconnectToDataStreamAction = createAction(
  '[Data Stream] Reconnect to Data Stream'
);

export const reconnectToDataStreamActionSuccess = createAction(
  '[Data Stream] Reconnect to Data Stream Success',
  props<StreamStatusResponse>()
);

export const reconnectToDataStreamActionFailure = createAction(
  '[Data Stream] Reconnect to Data Stream Failure',
  props<{ error: StreamConnectionError }>()
);
