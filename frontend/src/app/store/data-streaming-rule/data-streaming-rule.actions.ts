import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import {
  SetRulesRequest,
  RulesStatusResponse,
} from '../../types/data-streaming-rule';

export const setRulesAction = createAction(
  '[Data Streaming Rule] Set Rules',
  props<SetRulesRequest>()
);

export const setRulesActionSuccess = createAction(
  '[Data Streaming Rule] Set Rules Success',
  props<RulesStatusResponse>()
);

export const setRulesActionFailure = createAction(
  '[Data Streaming Rule] Set Rules Failure',
  props<{ error: HttpErrorResponse }>()
);

export const deleteRulesAction = createAction(
  '[Data Streaming Rule] Delete Rules'
);

export const deleteRulesActionSuccess = createAction(
  '[Data Streaming Rule] Delete Rules Success',
  props<RulesStatusResponse>()
);

export const deleteRulesActionFailure = createAction(
  '[Data Streaming Rule] Delete Rules Failure',
  props<{ error: HttpErrorResponse }>()
);
