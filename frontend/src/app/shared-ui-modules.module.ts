import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSelectModule } from 'ng-zorro-antd/select';

const sharedModules = [
  TranslateModule,
  NzSkeletonModule,
  NzEmptyModule,
  NzIconModule,
  NzTagModule,
  NzButtonModule,
  NzSpaceModule,
  NzCardModule,
  NzSelectModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...sharedModules],
  exports: sharedModules,
})
export class SharedUIModulesModule {}
