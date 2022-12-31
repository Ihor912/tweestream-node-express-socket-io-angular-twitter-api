import { AfterViewInit, Directive, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class OnDestroyMixin implements OnDestroy {
  readonly destroyed$ = new Subject<void>();

  ngOnDestroy() {
    this.onDestroy();
  }

  protected onDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}

@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class BaseComponent
  extends OnDestroyMixin
  implements OnInit, AfterViewInit
{
  ngOnInit() {
    this.onInit();
  }

  ngAfterViewInit() {
    this.afterViewInit();
  }

  protected onInit() {}

  protected afterViewInit() {}
}
