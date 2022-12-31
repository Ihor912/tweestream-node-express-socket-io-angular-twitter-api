import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromDataStreamingRuleReducer from './data-streaming-rule/data-streaming-rule.reducer';
import * as fromDataStreamReducer from './data-stream/data-stream.reducer';
import {
  DataStreamingRuleFacade,
  DataStreaminRuleEffects,
  DataStreamEffects,
  DataStreamFacade,
} from '.';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromDataStreamingRuleReducer.DATA_STREAMIN_RULE_FEATURE_KEY,
      fromDataStreamingRuleReducer.dataStreamingRuleReducer
    ),
    EffectsModule.forFeature([DataStreaminRuleEffects]),
    StoreModule.forFeature(
      fromDataStreamReducer.DATA_STREAM_FEATURE_KEY,
      fromDataStreamReducer.dataStreamReducer
    ),
    EffectsModule.forFeature([DataStreamEffects]),
  ],
  providers: [DataStreamingRuleFacade, DataStreamFacade],
})
export class SharedStoreModule {}
