import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { StreamConnectionStatusEnum } from '../../../types';
import { BaseComponent } from '../../base';

@Component({
  selector: 'page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHeaderComponent extends BaseComponent {
  @Input() streamConnectionStatus: StreamConnectionStatusEnum | null = null;
  @Input() currentStreamingHashtags: string[] | null | undefined = [];
  @Input() tweetsNumberPerMinute: number = 0;

  @Output() hashtagsChange: EventEmitter<string[]> = new EventEmitter();

  readonly StreamConnectionStatusEnum = StreamConnectionStatusEnum;

  constructor(public router: Router) {
    super();
  }

  navigateToHome() {
    this.router.navigateByUrl('/');
  }
}
