import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TweetCardModule } from './tweet-card/tweet-card.module';

const sharedWidgetModules = [TweetCardModule];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...sharedWidgetModules],
  exports: sharedWidgetModules,
})
export class SharedWidgetsModule {}
