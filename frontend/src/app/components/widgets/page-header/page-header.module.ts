import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedUIModulesModule } from '../../../shared-ui-modules.module';
import { PageHeaderComponent } from './page-header.component';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedUIModulesModule,
    NzPageHeaderModule,
  ],
  declarations: [PageHeaderComponent],
  exports: [PageHeaderComponent],
})
export class PageHeaderModule {}
