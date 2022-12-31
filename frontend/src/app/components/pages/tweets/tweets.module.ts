import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TweetsComponent, TweetsRoutingModule } from '.';
import { SharedWidgetsModule } from '../../widgets';

@NgModule({
  declarations: [TweetsComponent],
  imports: [CommonModule, TweetsRoutingModule, SharedWidgetsModule],
})
export class TweetsModule {}
