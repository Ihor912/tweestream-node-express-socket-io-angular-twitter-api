import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DataStreamFacade, DataStreamingRuleFacade } from '../../../store';
import { ErrorHandlingService } from '../../../services';
import {
  Tweet,
  StreamConnectionError,
  StreamStatusResponse,
  RulesStatusResponse,
} from '../../../types';
import { BasePageComponent } from '../../base';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.less'],
})
export class TweetsComponent extends BasePageComponent {
  tweetStream: Tweet[] = [];
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

    this.dataStreamingRuleFacade.setRulesSuccess$.subscribe(
      (resp: RulesStatusResponse | null) => {
        if (resp) {
          console.log(resp);
        }
      }
    );
    this.dataStreamingRuleFacade.setRulesError$.subscribe(
      (error: HttpErrorResponse | null | undefined) => {
        if (error) {
          this.errorHandlingService.handleHttpError(error);
        }
      }
    );

    this.dataStreamingRuleFacade.deleteRulesSuccess$.subscribe(
      (resp: RulesStatusResponse | null) => {
        if (resp) {
          console.log(resp);
        }
      }
    );
    this.dataStreamingRuleFacade.deleteRulesError$.subscribe(
      (error: HttpErrorResponse | null | undefined) => {
        if (error) {
          this.errorHandlingService.handleHttpError(error);
        }
      }
    );

    this.dataStreamFacade.getDataStreamSuccess$.subscribe(
      (tweet: Tweet | null) => {
        if (tweet) {
          this.tweetStream.unshift(tweet);
        }
      }
    );
    this.dataStreamFacade.getDataStreamError$.subscribe(
      (error: StreamConnectionError | null | undefined) => {
        if (error) {
          this.errorHandlingService.handleStreamConnectionError(error);
        }
      }
    );

    this.dataStreamFacade.stopDataStreamSuccess$.subscribe(
      (resp: StreamStatusResponse | null | undefined) => {
        if (resp) {
          console.log(resp);
        }
      }
    );
    this.dataStreamFacade.stopDataStreamError$.subscribe(
      (error: StreamConnectionError | null | undefined) => {
        if (error) {
          this.errorHandlingService.handleStreamConnectionError(error);
        }
      }
    );
  }

  override onDestroy() {
    this.dataStreamFacade.stopDataStream();
    super.onDestroy();
  }
}
