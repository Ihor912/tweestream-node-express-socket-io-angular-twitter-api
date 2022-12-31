import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorMessageRoutingModule } from './error-message-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [CommonModule, ErrorMessageRoutingModule],
})
export class ErrorMessageModule {}
