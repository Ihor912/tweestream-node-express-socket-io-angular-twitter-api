import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzEmptyModule } from 'ng-zorro-antd/empty';

const sharedModules = [TranslateModule, NzSkeletonModule, NzEmptyModule];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...sharedModules],
  exports: sharedModules,
})
export class SharedUIModulesModule {}
