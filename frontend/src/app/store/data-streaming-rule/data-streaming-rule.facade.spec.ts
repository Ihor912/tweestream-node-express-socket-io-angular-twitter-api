import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import * as fromActions from './data-streaming-rule.actions';
import { DataStreamingRuleFacade } from './data-streaming-rule.facade';

describe('Store > DataStreamingRuleFacade', () => {
  let facade: DataStreamingRuleFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Store,
          useValue: {
            pipe: jest.fn(() => of(null)),
            dispatch: jest.fn(),
          },
        },
      ],
    });

    const store = TestBed.inject(Store);

    facade = new DataStreamingRuleFacade(store);
  });

  it("should dispatch 'deleteRulesAction' action when deleteRules method is called", () => {
    const spyDispatch = jest.spyOn(facade['store'], 'dispatch');
    const action = fromActions.deleteRulesAction();
    facade.deleteRules();
    expect(spyDispatch).toHaveBeenCalledWith(action);
  });
  it("should dispatch 'getRulesAction' action when getRules method is called", () => {
    const spyDispatch = jest.spyOn(facade['store'], 'dispatch');
    const action = fromActions.getRulesAction();
    facade.getRules();
    expect(spyDispatch).toHaveBeenCalledWith(action);
  });
  it("should dispatch 'setRulesAction' action when setRules method is called", () => {
    const spyDispatch = jest.spyOn(facade['store'], 'dispatch');
    const action = fromActions.setRulesAction({ rules: [{ value: 'test' }] });
    facade.setRules({ rules: [{ value: 'test' }] });
    expect(spyDispatch).toHaveBeenCalledWith(action);
  });
});
