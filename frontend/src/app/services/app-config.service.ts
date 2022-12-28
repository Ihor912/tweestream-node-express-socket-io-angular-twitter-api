import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash';
import { BASE_APP_CONFIG } from '../config/base-app-config';
import { AppConfig } from '../types/app-config';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  getBaseApiURL(): string {
    return cloneDeep(BASE_APP_CONFIG as AppConfig).HTTP_ENDPOINT;
  }

  getBaseSocketURL(): string {
    return cloneDeep(BASE_APP_CONFIG as AppConfig).SOCKET_ENDPOINT;
  }

  constructor() {}
}
