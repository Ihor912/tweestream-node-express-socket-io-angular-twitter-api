import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedUIModulesModule } from '../../../shared-ui-modules.module';
import { PageHeaderComponent } from './page-header.component';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { FormsModule } from '@angular/forms';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedUIModulesModule,
    NzPageHeaderModule,
    NzStatisticModule,
  ],
  declarations: [PageHeaderComponent],
  exports: [PageHeaderComponent],
})
export class PageHeaderModule {}
