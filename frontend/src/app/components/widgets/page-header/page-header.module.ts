import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedUIModulesModule } from '../../../shared-ui-modules.module';
import { PageHeaderComponent } from './page-header.component';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';

@NgModule({
  imports: [CommonModule, SharedUIModulesModule, NzPageHeaderModule],
  declarations: [PageHeaderComponent],
  exports: [PageHeaderComponent],
})
export class PageHeaderModule {}
