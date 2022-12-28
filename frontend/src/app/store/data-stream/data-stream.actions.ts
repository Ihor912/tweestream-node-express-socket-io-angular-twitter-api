import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { StreamStatusResponse, Tweet } from '../../types/data-stream';

export const getDataStreamAction = createAction(
  '[Data Stream] Get Data Stream'
);

export const getDataStreamActionSuccess = createAction(
  '[Data Stream] Get Data Stream Success',
  props<Tweet>()
);

export const getDataStreamActionFailure = createAction(
  '[Data Stream] Get Data Stream Failure',
  props<{ error: HttpErrorResponse }>()
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
  props<{ error: HttpErrorResponse }>()
);
