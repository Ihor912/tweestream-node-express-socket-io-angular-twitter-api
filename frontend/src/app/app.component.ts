import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStreamFacade } from './store/data-stream/data-stream.facade';
import { DataStreamingRuleFacade } from './store/data-streaming-rule/data-streaming-rule.facade';
import { Tweet } from './types/data-stream';
import { RulesStatusResponse } from './types/data-streaming-rule';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit, OnDestroy {
  tweetStream: Tweet[] = [];

  constructor(
    private dataStreamingRuleFacade: DataStreamingRuleFacade,
    private dataStreamFacade: DataStreamFacade
  ) {}
  ngOnInit() {
    this.dataStreamingRuleFacade.setRules({ rules: [{ value: 'Ukraine' }] });
    this.dataStreamingRuleFacade.deleteRules();
    this.dataStreamFacade.getDataStream();

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
          console.log(error);
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
          console.log(error);
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
      (error: HttpErrorResponse | null | undefined) => {
        if (error) {
          console.log(error);
        }
      }
    );
  }

  ngOnDestroy() {
    // this.dataStreamFacade.disconnectFromSocket();
  }
}
