import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { map, Observable, takeUntil } from 'rxjs';
import { DataStreamFacade, DataStreamingRuleFacade } from '../../../store';
import {
  ErrorHandlingService,
  SocketService,
  TimeTrackingService,
} from '../../../services';
import {
  Tweet,
  StreamConnectionError,
  StreamConnectionStatusEnum,
  RulesState,
  RulesStatusResponse,
} from '../../../types';
import { BasePageComponent } from '../../base';

@Component({
  selector: 'tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.less'],
})
export class TweetsComponent extends BasePageComponent {
  tweetStream: Tweet[] = [];
  isLoading = true;

  streamConnectionStatus$: Observable<StreamConnectionStatusEnum> =
    this.dataStreamFacade.streamConnectionStatus$;

  currentStreamingHashtags$: Observable<string[] | undefined> =
    this.dataStreamingRuleFacade.getRulesSuccess$.pipe(
      map((data: RulesState | null) => {
        return (data?.rules || []).map((x) => x.value);
      })
    );

  constructor(
    public dataStreamingRuleFacade: DataStreamingRuleFacade,
    public dataStreamFacade: DataStreamFacade,
    public errorHandlingService: ErrorHandlingService,
    public socketService: SocketService,
    public timeTrackingService: TimeTrackingService
  ) {
    super();
  }

  override onInit() {
    this.dataStreamingRuleFacade.getRules();
    this.dataStreamFacade.getDataStream();

    this.dataStreamingRuleFacade.setRulesSuccess$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data: RulesStatusResponse | null | undefined) => {
        if (data) {
          this.timeTrackingService.resetStartTrackingDateTime();
        }
      });

    this.dataStreamingRuleFacade.setRulesError$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((error: HttpErrorResponse | null | undefined) => {
        if (error) {
          this.errorHandlingService.handleHttpError(error);
        }
      });

    this.dataStreamFacade.getDataStreamSuccess$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((tweet: Tweet | null) => {
        if (tweet) {
          this.isLoading = false;
          this.tweetStream.unshift(tweet);
        }
      });

    this.dataStreamFacade.getDataStreamError$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((error: StreamConnectionError | null | undefined) => {
        if (error) {
          this.isLoading = false;
          this.errorHandlingService.handleStreamConnectionError(error);
        }
      });
  }

  onHashtagsChange(hashtagNames: string[]) {
    const hashtags = (hashtagNames || []).map((x) => ({ value: x }));
    this.dataStreamingRuleFacade.setRules({ rules: hashtags });
  }

  tweetTrackBy(index: number, tweet: Tweet) {
    return tweet.id;
  }

  get tweetsNumberPerMinute(): number {
    return this.timeTrackingService.averageNumberOfTweetsPerMinute;
  }

  override onDestroy() {
    this.socketService.destroySocketConnection();
    super.onDestroy();
  }
}
