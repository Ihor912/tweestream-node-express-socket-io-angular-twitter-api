import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TweetsComponent, TweetsRoutingModule } from '.';
import { SharedWidgetsModule } from '../../widgets';
import { SharedUIModulesModule } from '../../../shared-ui-modules.module';

@NgModule({
  declarations: [TweetsComponent],
  imports: [
    CommonModule,
    TweetsRoutingModule,
    SharedUIModulesModule,
    SharedWidgetsModule,
  ],
})
export class TweetsModule {}
