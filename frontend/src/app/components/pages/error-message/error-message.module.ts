import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedUIModulesModule } from '../../../shared-ui-modules.module';
import { ErrorMessageRoutingModule, PageNotFoundComponent } from '.';

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [CommonModule, SharedUIModulesModule, ErrorMessageRoutingModule],
})
export class ErrorMessageModule {}
