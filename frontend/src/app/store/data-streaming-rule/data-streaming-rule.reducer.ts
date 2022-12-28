import { HttpErrorResponse } from '@angular/common/http';
import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Rule, RulesStatusResponse } from '../../types/data-streaming-rule';

import * as DataStreamingRuleActions from './data-streaming-rule.actions';

export const DATA_STREAMIN_RULE_FEATURE_KEY = 'data-streaming-rule';

export interface DataStreamingRuleState extends EntityState<Rule> {
  setRulesSuccess: RulesStatusResponse | null;
  setRulesError?: HttpErrorResponse | null;
  deleteRulesSuccess: RulesStatusResponse | null;
  deleteRulesError?: HttpErrorResponse | null;
}

export const dataStreamingRuleAdapter: EntityAdapter<Rule> =
  createEntityAdapter<Rule>();

export interface DataStreamingRulePartialState {
  readonly [DATA_STREAMIN_RULE_FEATURE_KEY]: DataStreamingRuleState;
}

export const dataStreamingRuleInitialState: DataStreamingRuleState =
  dataStreamingRuleAdapter.getInitialState({
    setRulesSuccess: null,
    setRulesError: null,
    deleteRulesSuccess: null,
    deleteRulesError: null,
  });

const reducer = createReducer(
  dataStreamingRuleInitialState,
  on(DataStreamingRuleActions.setRulesAction, (state, data) => ({
    ...state,
    setRulesSuccess: null,
    setRulesError: null,
  })),
  on(DataStreamingRuleActions.setRulesActionSuccess, (state, data) => ({
    ...state,
    setRulesSuccess: data,
    setRulesError: null,
  })),
  on(DataStreamingRuleActions.setRulesActionFailure, (state, { error }) => ({
    ...state,
    setRulesSuccess: null,
    setRulesError: error,
  })),
  on(DataStreamingRuleActions.deleteRulesAction, (state, data) => ({
    ...state,
    deleteRulesSuccess: null,
    deleteRulesError: null,
  })),
  on(DataStreamingRuleActions.deleteRulesActionSuccess, (state, data) => ({
    ...state,
    deleteRulesSuccess: data,
    deleteRulesError: null,
  })),
  on(DataStreamingRuleActions.deleteRulesActionFailure, (state, { error }) => ({
    ...state,
    deleteRulesSuccess: null,
    deleteRulesError: error,
  }))
);

export function dataStreamingRuleReducer(
  state: DataStreamingRuleState | undefined,
  action: Action
) {
  return reducer(state, action);
}
