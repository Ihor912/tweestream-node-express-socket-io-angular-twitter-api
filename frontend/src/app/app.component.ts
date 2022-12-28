import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ErrorHandlingService } from './services/error-handling.service';
import { DataStreamFacade } from './store/data-stream/data-stream.facade';
import { DataStreamingRuleFacade } from './store/data-streaming-rule/data-streaming-rule.facade';
import {
  StreamConnectionError,
  StreamStatusResponse,
  Tweet,
} from './types/data-stream';
import { RulesStatusResponse } from './types/data-streaming-rule';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit, OnDestroy {
  tweetStream: Tweet[] = [];
  isDataStreamingInProgress: Observable<boolean> =
    this.dataStreamFacade.isDataStreamingInProgress$;

  constructor(
    private dataStreamingRuleFacade: DataStreamingRuleFacade,
    private dataStreamFacade: DataStreamFacade,
    private errorHandlingService: ErrorHandlingService
  ) {}
  ngOnInit() {
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

  ngOnDestroy() {
    this.dataStreamFacade.stopDataStream();
  }
}
