import { Component } from '@angular/core';
import { Router, Event, RouterEvent } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter, map, Observable } from 'rxjs';
import { BasePageComponent } from './components/base';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent extends BasePageComponent {
  currentRouteURL$: Observable<string> = this.router.events.pipe(
    map((route: Event) => {
      return (route as RouterEvent).url;
    })
  );
  mainPageRouteActive$: Observable<boolean> = this.currentRouteURL$.pipe(
    filter((url: string) => !!url),
    map((url: string) => {
      return url === '/tweets' || url === '/';
    })
  );

  constructor(translateService: TranslateService, private router: Router) {
    super();
    translateService.setDefaultLang('en_US');
    translateService.use('en_US');
  }
}
