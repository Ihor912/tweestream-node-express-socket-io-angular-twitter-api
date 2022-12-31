import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TweetsComponent, TweetsRoutingModule } from '.';

@NgModule({
  declarations: [TweetsComponent],
  imports: [CommonModule, TweetsRoutingModule],
})
export class TweetsModule {}
