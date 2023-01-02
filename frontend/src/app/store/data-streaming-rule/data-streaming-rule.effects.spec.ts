import { async, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';

import * as fromActions from './data-streaming-rule.actions';
import { DataStreaminRuleEffects } from './data-streaming-rule.effects';
import { ApiService } from '../../services';
import { RulesResponse, RulesStatusResponse } from '../../types';

describe('DataStreaminRuleEffects', () => {
  let actions$: Observable<Action>;
  let effect: DataStreaminRuleEffects;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        Actions,
        provideMockStore(),
        provideMockActions(() => actions$),
        {
          provide: ApiService,
          useValue: {},
        },
      ],
    });

    const actions = TestBed.inject(Actions);
    const apiService = TestBed.inject(ApiService);

    effect = new DataStreaminRuleEffects(actions, apiService);
  }));

  it('should call getRules', () => {
    const response = {
      rules: {
        data: [{ value: 'test' }],
      },
    };

    effect['apiService'].getRules = jest.fn(() =>
      of(response as RulesResponse)
    );
    const getRulesActionSuccess = jest.spyOn(
      fromActions,
      'getRulesActionSuccess'
    );
    actions$ = of(
      fromActions.getRulesActionSuccess({ rules: [{ value: 'test' }] })
    );
    expect(getRulesActionSuccess).toHaveBeenCalled();
  });
  it('should call setRules', () => {
    const response = { status: 'OK' };

    effect['apiService'].setRules = jest.fn(() =>
      of(response as RulesStatusResponse)
    );
    const setRulesActionSuccess = jest.spyOn(
      fromActions,
      'setRulesActionSuccess'
    );
    actions$ = of(fromActions.setRulesActionSuccess({ status: 'OK' }));
    expect(setRulesActionSuccess).toHaveBeenCalled();
  });
  it('should call deleteRules', () => {
    const response = { status: 'OK' };

    effect['apiService'].deleteRules = jest.fn(() =>
      of(response as RulesStatusResponse)
    );
    const deleteRulesActionSuccess = jest.spyOn(
      fromActions,
      'deleteRulesActionSuccess'
    );
    actions$ = of(fromActions.deleteRulesActionSuccess({ status: 'OK' }));
    expect(deleteRulesActionSuccess).toHaveBeenCalled();
  });
});
