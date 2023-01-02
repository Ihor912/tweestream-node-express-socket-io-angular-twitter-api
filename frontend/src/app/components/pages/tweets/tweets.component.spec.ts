import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { DataStreamFacade, DataStreamingRuleFacade } from '../../../store';
import {
  ErrorHandlingService,
  SocketService,
  TimeTrackingService,
} from '../../../services';
import { TweetsComponent } from '.';
import { of } from 'rxjs';
import { SharedWidgetsModule } from '../../widgets';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {
  StreamConnectionError,
  StreamConnectionIssueEnum,
  Tweet,
} from '../../../types';

describe('TweetsComponent', () => {
  let component: TweetsComponent;
  let fixture: ComponentFixture<TweetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: DataStreamingRuleFacade,
          useValue: {
            getRulesSuccess$: of(),
            getRulesError$: of(),
            setRulesSuccess$: of(),
            setRulesError$: of(),
            getRules: jest.fn(),
            setRules: jest.fn(),
          },
        },
        {
          provide: DataStreamFacade,
          useValue: {
            streamConnectionStatus$: of(),
            getDataStreamSuccess$: of(),
            getDataStreamError$: of(),
            getDataStream: jest.fn(),
          },
        },
        {
          provide: ErrorHandlingService,
          useValue: {
            handleStreamConnectionError: jest.fn(),
            handleHttpError: jest.fn(),
          },
        },
        {
          provide: SocketService,
          useValue: {
            destroySocketConnection: jest.fn(),
          },
        },
        {
          provide: TimeTrackingService,
          useValue: {
            averageNumberOfTweetsPerMinute: 0,
            resetStartTrackingDateTime: jest.fn(),
          },
        },
      ],
      imports: [TranslateModule.forRoot(), SharedWidgetsModule],
      declarations: [TweetsComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TweetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('should handle onInit', () => {
    it('should call getRules request on onInit', () => {
      const spyOn = jest.spyOn(component.dataStreamingRuleFacade, 'getRules');
      component.onInit();
      expect(spyOn).toHaveBeenCalled();
    });
    it('should call getDataStream request on onInit', () => {
      const spyOn = jest.spyOn(component.dataStreamFacade, 'getDataStream');
      component.onInit();
      expect(spyOn).toHaveBeenCalled();
    });

    it('should reset time tracking once rules are successfully submitted', (done) => {
      const spyOn = jest.spyOn(
        component.timeTrackingService,
        'resetStartTrackingDateTime'
      );
      component['dataStreamingRuleFacade'].setRulesSuccess$ = of({
        status: 'OK',
      });

      component.onInit();
      component['dataStreamingRuleFacade'].setRulesSuccess$.subscribe(() => {
        expect(spyOn).toHaveBeenCalled();
        done();
      });
    });
    it('should not reset time tracking once rules are successfully submitted but param is null', (done) => {
      const spyOn = jest.spyOn(
        component.timeTrackingService,
        'resetStartTrackingDateTime'
      );
      component['dataStreamingRuleFacade'].setRulesSuccess$ = of(null);

      component.onInit();
      component['dataStreamingRuleFacade'].setRulesSuccess$.subscribe(() => {
        expect(spyOn).not.toHaveBeenCalled();
        done();
      });
    });
    it('should show error message on set rules error', (done) => {
      const spyOn = jest.spyOn(
        component.errorHandlingService,
        'handleHttpError'
      );
      component['dataStreamingRuleFacade'].setRulesError$ = of({
        status: 'OK',
      } as unknown as HttpErrorResponse);

      component.onInit();
      component['dataStreamingRuleFacade'].setRulesError$.subscribe((error) => {
        expect(spyOn).toHaveBeenCalledWith(error);
        done();
      });
    });
    it('should show error message on set rules error', (done) => {
      const spyOn = jest.spyOn(
        component.errorHandlingService,
        'handleHttpError'
      );
      component['dataStreamingRuleFacade'].setRulesError$ = of({
        status: 'OK',
      } as unknown as HttpErrorResponse);

      component.onInit();
      component['dataStreamingRuleFacade'].setRulesError$.subscribe((error) => {
        expect(spyOn).toHaveBeenCalledWith(error);
        done();
      });
    });
    it('should not show error message on set rules error if error param is null', (done) => {
      const spyOn = jest.spyOn(
        component.errorHandlingService,
        'handleHttpError'
      );
      component['dataStreamingRuleFacade'].setRulesError$ = of(null);

      component.onInit();
      component['dataStreamingRuleFacade'].setRulesError$.subscribe(() => {
        expect(spyOn).not.toHaveBeenCalledWith();
        done();
      });
    });
    it('should add new tweet to tweetStream array and hide loading indicator once tweet data comes', (done) => {
      const newTweet = {
        id: 'testid',
        text: '',
        authorName: '',
        location: '',
      };
      const spyOn = jest.spyOn(component.tweetStream, 'unshift');
      component['dataStreamFacade'].getDataStreamSuccess$ = of(newTweet);
      component.isLoading = true;

      component.onInit();
      component['dataStreamFacade'].getDataStreamSuccess$.subscribe((tweet) => {
        expect(tweet).toEqual(newTweet);
        expect(component.isLoading).toBeFalsy();
        expect(component.tweetStream[0]).toEqual(newTweet);
        expect(spyOn).toHaveBeenCalledWith(tweet);
        done();
      });
    });
    it('should not add new tweet to tweetStream array once tweet data comes but param is null', (done) => {
      const spyOn = jest.spyOn(component.tweetStream, 'unshift');
      component['dataStreamFacade'].getDataStreamSuccess$ = of(null);
      component.isLoading = true;

      component.onInit();
      component['dataStreamFacade'].getDataStreamSuccess$.subscribe((tweet) => {
        expect(tweet).toBeNull();
        expect(component.isLoading).toBeTruthy();
        expect(component.tweetStream.length).toBe(0);
        expect(spyOn).not.toHaveBeenCalledWith();
        done();
      });
    });
    it('should display TOO_MANY_CONNECTIONS error message and hide loading indicator once data stream error comes', (done) => {
      const newError = {
        connection_issue: StreamConnectionIssueEnum.TOO_MANY_CONNECTIONS,
      };
      const spyOn = jest.spyOn(
        component.errorHandlingService,
        'handleStreamConnectionError'
      );
      component['dataStreamFacade'].getDataStreamError$ = of(
        newError as StreamConnectionError
      );
      component.isLoading = true;

      component.onInit();
      component['dataStreamFacade'].getDataStreamError$.subscribe((error) => {
        expect(error).toEqual(newError);
        expect(component.isLoading).toBeFalsy();
        expect(spyOn).toHaveBeenCalledWith(error);
        done();
      });
    });
    it('should display NO_CONNECTION_WITH_SERVER error message and hide loading indicator once data stream error comes', (done) => {
      const newError = {
        connection_issue: StreamConnectionIssueEnum.NO_CONNECTION_WITH_SERVER,
      };
      const spyOn = jest.spyOn(
        component.errorHandlingService,
        'handleStreamConnectionError'
      );
      component['dataStreamFacade'].getDataStreamError$ = of(
        newError as StreamConnectionError
      );
      component.isLoading = true;

      component.onInit();
      component['dataStreamFacade'].getDataStreamError$.subscribe((error) => {
        expect(error).toEqual(newError);
        expect(component.isLoading).toBeFalsy();
        expect(spyOn).toHaveBeenCalledWith(error);
        done();
      });
    });
    it('should not display error message and hide loading indicator once data stream error comes but param is null', (done) => {
      const spyOn = jest.spyOn(
        component.errorHandlingService,
        'handleStreamConnectionError'
      );
      component['dataStreamFacade'].getDataStreamError$ = of(null);
      component.isLoading = true;

      component.onInit();
      component['dataStreamFacade'].getDataStreamError$.subscribe((error) => {
        expect(error).toBeNull();
        expect(component.isLoading).toBeTruthy();
        expect(spyOn).not.toHaveBeenCalledWith(error);
        done();
      });
    });
  });

  it('should call setRules method with new hashtags on onHashtagsChange call', () => {
    const hashtagNames = ['test', 'test1'];
    const spyOn = jest.spyOn(component.dataStreamingRuleFacade, 'setRules');

    component.onHashtagsChange(hashtagNames);
    expect(spyOn).toHaveBeenCalledWith({
      rules: [{ value: 'test' }, { value: 'test1' }],
    });

    component.onHashtagsChange([]);
    expect(spyOn).toHaveBeenCalledWith({
      rules: [],
    });
  });

  it('should return id of the tweet from tweetTrackBy', () => {
    expect(component.tweetTrackBy(0, <Tweet>{ id: '12345' })).toBe('12345');
  });

  it('should return value of timeTrackingService.averageNumberOfTweetsPerMinute on tweetsNumberPerMinute call', () => {
    expect(component.tweetsNumberPerMinute).toBe(0);
  });

  it('should destroy socket connection on onDestroy call', () => {
    const spyOn = jest.spyOn(
      component.socketService,
      'destroySocketConnection'
    );

    component.onDestroy();
    expect(spyOn).toHaveBeenCalled();
  });
});
