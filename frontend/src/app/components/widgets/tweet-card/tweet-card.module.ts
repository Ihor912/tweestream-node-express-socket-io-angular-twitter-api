import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TweetCardComponent } from './tweet-card.component';

@NgModule({
  imports: [CommonModule],
  declarations: [TweetCardComponent],
  exports: [TweetCardComponent],
})
export class TweetCardModule {}
