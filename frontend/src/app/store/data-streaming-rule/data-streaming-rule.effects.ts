import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { map } from 'rxjs/operators';
import { ApiService } from '../../services';
import { RulesResponse, RulesStatusResponse } from '../../types';
import * as DataStreamingRuleActions from './data-streaming-rule.actions';

@Injectable()
export class DataStreaminRuleEffects {
  getRules$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DataStreamingRuleActions.getRulesAction),
      fetch({
        run: () =>
          this.apiService
            .getRules()
            .pipe(
              map((data: RulesResponse) =>
                DataStreamingRuleActions.getRulesActionSuccess({
                  rules: data?.rules.data,
                })
              )
            ),
        onError: (action, error) =>
          DataStreamingRuleActions.getRulesActionFailure({ error }),
      })
    )
  );

  setRules$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DataStreamingRuleActions.setRulesAction),
      fetch({
        run: (request) =>
          this.apiService
            .setRules(request)
            .pipe(
              map((data: RulesStatusResponse) =>
                DataStreamingRuleActions.setRulesActionSuccess(data)
              )
            ),
        onError: (action, error) =>
          DataStreamingRuleActions.setRulesActionFailure({ error }),
      })
    )
  );

  deleteRules$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DataStreamingRuleActions.deleteRulesAction),
      fetch({
        run: () =>
          this.apiService
            .deleteRules()
            .pipe(
              map((data: RulesStatusResponse) =>
                DataStreamingRuleActions.deleteRulesActionSuccess(data)
              )
            ),
        onError: (action, error: HttpErrorResponse) =>
          DataStreamingRuleActions.setRulesActionFailure({ error }),
      })
    )
  );

  constructor(private actions$: Actions, private apiService: ApiService) {}
}
