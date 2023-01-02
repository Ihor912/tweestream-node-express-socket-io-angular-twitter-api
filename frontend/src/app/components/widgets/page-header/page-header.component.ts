import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { StreamConnectionStatusEnum } from '../../../types';
import { BaseComponent } from '../../base';

@Component({
  selector: 'page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHeaderComponent extends BaseComponent {
  @Input() streamConnectionStatus: StreamConnectionStatusEnum | null =
    StreamConnectionStatusEnum.PROCESSING;

  readonly StreamConnectionStatusEnum = StreamConnectionStatusEnum;

  constructor() {
    super();
  }
}
