import { Injectable } from '@angular/core';
import { Action, select, Store } from '@ngrx/store';
import * as fromDataStreaminRule from './data-streaming-rule.reducer';
import * as DataStreamingRuleSelectors from './data-streaming-rule.selectors';
import * as DataStreamingRuleActions from './data-streaming-rule.actions';
import { RulesState, RulesStatusResponse, SetRulesRequest } from '../../types';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class DataStreamingRuleFacade {
  getRulesSuccess$: Observable<RulesState | null> = this.store.pipe(
    select(DataStreamingRuleSelectors.getRulesSuccess)
  );

  getRulesError$: Observable<HttpErrorResponse | null | undefined> =
    this.store.pipe(select(DataStreamingRuleSelectors.getRulesError));

  setRulesSuccess$: Observable<RulesStatusResponse | null> = this.store.pipe(
    select(DataStreamingRuleSelectors.setRulesSuccess)
  );

  setRulesError$: Observable<HttpErrorResponse | null | undefined> =
    this.store.pipe(select(DataStreamingRuleSelectors.setRulesError));

  deleteRulesSuccess$: Observable<RulesStatusResponse | null> = this.store.pipe(
    select(DataStreamingRuleSelectors.deleteRulesSuccess)
  );

  deleteRulesError$: Observable<HttpErrorResponse | null | undefined> =
    this.store.pipe(select(DataStreamingRuleSelectors.deleteRulesError));

  constructor(
    private store: Store<fromDataStreaminRule.DataStreamingRulePartialState>
  ) {}

  getRules(): void {
    this.store.dispatch(DataStreamingRuleActions.getRulesAction());
  }

  setRules(request: SetRulesRequest): void {
    this.store.dispatch(DataStreamingRuleActions.setRulesAction(request));
  }

  deleteRules(): void {
    this.store.dispatch(DataStreamingRuleActions.deleteRulesAction());
  }
}
