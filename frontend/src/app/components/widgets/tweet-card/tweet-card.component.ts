import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Tweet } from '../../../types';
import { BaseComponent } from '../../base';

@Component({
  selector: 'tweet-card',
  templateUrl: './tweet-card.component.html',
  styleUrls: ['./tweet-card.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TweetCardComponent extends BaseComponent {
  @Input()
  data!: Tweet;

  constructor() {
    super();
  }
}
