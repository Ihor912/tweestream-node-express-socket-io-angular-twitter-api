import { Component } from '@angular/core';
import { BasePageComponent } from '../../../../components/base';

@Component({
  selector: 'page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.less'],
})
export class PageNotFoundComponent extends BasePageComponent {
  constructor() {
    super();
  }
}
