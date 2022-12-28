import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromDataStreaminRule from './data-streaming-rule.reducer';
import * as DataStreamingRuleSelectors from './data-streaming-rule.selectors';
import * as DataStreamingRuleActions from './data-streaming-rule.actions';
import {
  RulesStatusResponse,
  SetRulesRequest,
} from '../../types/data-streaming-rule';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class DataStreamingRuleFacade {
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

  setRules(request: SetRulesRequest): void {
    this.store.dispatch(DataStreamingRuleActions.setRulesAction(request));
  }

  deleteRules(): void {
    this.store.dispatch(DataStreamingRuleActions.deleteRulesAction());
  }
}
