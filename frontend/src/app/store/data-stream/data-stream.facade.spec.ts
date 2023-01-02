import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import * as fromActions from './data-stream.actions';
import { DataStreamFacade } from './data-stream.facade';

describe('Store > DataStreamFacade', () => {
  let facade: DataStreamFacade;

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

    facade = new DataStreamFacade(store);
  });

  it("should dispatch 'getDataStreamAction' action when getDataStream method is called", () => {
    const spyDispatch = jest.spyOn(facade['store'], 'dispatch');
    const action = fromActions.getDataStreamAction();
    facade.getDataStream();
    expect(spyDispatch).toHaveBeenCalledWith(action);
  });
});
