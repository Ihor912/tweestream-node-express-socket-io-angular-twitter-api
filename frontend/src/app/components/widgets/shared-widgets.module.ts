import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TweetCardModule } from './tweet-card/tweet-card.module';
import { PageHeaderModule } from './page-header/page-header.module';
import { RouterModule } from '@angular/router';

const sharedWidgetModules = [TweetCardModule, PageHeaderModule];

@NgModule({
  imports: [CommonModule, RouterModule, ...sharedWidgetModules],
  exports: sharedWidgetModules,
})
export class SharedWidgetsModule {}
