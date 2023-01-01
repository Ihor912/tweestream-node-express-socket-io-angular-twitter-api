import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TweetsComponent, TweetsRoutingModule } from '.';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { SharedWidgetsModule } from '../../widgets';

@NgModule({
  declarations: [TweetsComponent],
  imports: [
    CommonModule,
    TweetsRoutingModule,
    NzSkeletonModule,
    SharedWidgetsModule,
  ],
})
export class TweetsModule {}
