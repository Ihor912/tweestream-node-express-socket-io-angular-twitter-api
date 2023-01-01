import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable, takeUntil } from 'rxjs';
import { DataStreamFacade, DataStreamingRuleFacade } from '../../../store';
import { ErrorHandlingService } from '../../../services';
import { Tweet, StreamConnectionError } from '../../../types';
import { BasePageComponent } from '../../base';

@Component({
  selector: 'tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.less'],
})
export class TweetsComponent extends BasePageComponent {
  tweetStream: Tweet[] = [];
  isLoading = true;
  isDataStreamingInProgress: Observable<boolean> =
    this.dataStreamFacade.isDataStreamingInProgress$;

  constructor(
    private dataStreamingRuleFacade: DataStreamingRuleFacade,
    private dataStreamFacade: DataStreamFacade,
    private errorHandlingService: ErrorHandlingService
  ) {
    super();
  }
  override onInit() {
    this.dataStreamFacade.getDataStream();

    // setTimeout(() => {
    //   this.dataStreamFacade.stopDataStream();
    // }, 5000);
    // setTimeout(() => {
    //   this.dataStreamFacade.reconnectToDataStream();
    // }, 15000);

    // setTimeout(() => {
    //   this.dataStreamingRuleFacade.deleteRules();
    // }, 5000);

    // setTimeout(() => {
    //   this.dataStreamingRuleFacade.setRules({ rules: [{ value: 'ukraine' }] });
    // }, 15000);

    this.dataStreamingRuleFacade.setRulesError$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((error: HttpErrorResponse | null | undefined) => {
        if (error) {
          this.errorHandlingService.handleHttpError(error);
        }
      });

    this.dataStreamingRuleFacade.deleteRulesError$
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

  tweetTrackBy(index: number, tweet: Tweet) {
    return tweet.id;
  }

  override onDestroy() {
    this.dataStreamFacade.stopDataStream();
    super.onDestroy();
  }
}
