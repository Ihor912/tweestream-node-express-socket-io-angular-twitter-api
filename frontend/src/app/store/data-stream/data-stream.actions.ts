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
