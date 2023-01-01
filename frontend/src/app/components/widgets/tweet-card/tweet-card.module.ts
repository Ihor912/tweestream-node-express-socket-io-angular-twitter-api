import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TweetCardComponent } from './tweet-card.component';
import { SharedUIModulesModule } from '../../../shared-ui-modules.module';

@NgModule({
  imports: [CommonModule, SharedUIModulesModule],
  declarations: [TweetCardComponent],
  exports: [TweetCardComponent],
})
export class TweetCardModule {}
