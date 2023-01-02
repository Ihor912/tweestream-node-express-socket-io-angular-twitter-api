import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

/** config angular i18n **/
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
registerLocaleData(en);

/** config ng-zorro-antd i18n **/
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';

import { AppComponent } from './app.component';
import { SharedStoreModule } from './store/shared-store.module';
import { AppRoutingModule } from './app.routing';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { PageHeaderModule } from './components/widgets/page-header';

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(
  (key) => antDesignIcons[key]
);

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/locales/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    SharedStoreModule,
    RouterModule.forRoot([]),
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    NzNotificationModule,
    PageHeaderModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: NZ_ICONS, useValue: icons },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
