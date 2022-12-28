import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  SetRulesRequest,
  RulesStatusResponse,
} from '../types/data-streaming-rule';
import { ApiClient } from './api.client';
import { API_ENDPOINTS } from './api.endpoints';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiEndpoints = API_ENDPOINTS;
  constructor(
    public api: ApiClient,
    public appConfigService: AppConfigService
  ) {}

  prepareApiURL(API_URL: string) {
    return this.appConfigService.getBaseApiURL() + API_URL;
  }

  setRules(request: SetRulesRequest): Observable<RulesStatusResponse> {
    return this.api.post(
      this.prepareApiURL(this.apiEndpoints.setRules),
      request
    );
  }

  deleteRules(): Observable<RulesStatusResponse> {
    return this.api.delete(this.prepareApiURL(this.apiEndpoints.deleteRules));
  }
}
