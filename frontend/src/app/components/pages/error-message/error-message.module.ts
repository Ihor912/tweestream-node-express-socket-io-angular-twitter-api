import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMessageRoutingModule, PageNotFoundComponent } from '.';

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [CommonModule, ErrorMessageRoutingModule],
})
export class ErrorMessageModule {}
