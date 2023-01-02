import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  DataStreamingRulePartialState,
  DataStreamingRuleState,
  DATA_STREAMIN_RULE_FEATURE_KEY,
} from './data-streaming-rule.reducer';

export const getDataStreamingRulesState = createFeatureSelector<
  DataStreamingRulePartialState,
  DataStreamingRuleState
>(DATA_STREAMIN_RULE_FEATURE_KEY);

export const getRulesSuccess = createSelector(
  getDataStreamingRulesState,
  (state: DataStreamingRuleState) => state.getRulesSuccess
);
export const getRulesError = createSelector(
  getDataStreamingRulesState,
  (state: DataStreamingRuleState) => state.getRulesError
);
export const setRulesSuccess = createSelector(
  getDataStreamingRulesState,
  (state: DataStreamingRuleState) => state.setRulesSuccess
);
export const setRulesError = createSelector(
  getDataStreamingRulesState,
  (state: DataStreamingRuleState) => state.setRulesError
);
export const deleteRulesSuccess = createSelector(
  getDataStreamingRulesState,
  (state: DataStreamingRuleState) => state.deleteRulesSuccess
);
export const deleteRulesError = createSelector(
  getDataStreamingRulesState,
  (state: DataStreamingRuleState) => state.deleteRulesError
);
