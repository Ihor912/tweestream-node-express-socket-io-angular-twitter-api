import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient, API_ENDPOINTS, AppConfigService } from '.';
import { SetRulesRequest, RulesStatusResponse, RulesResponse } from '../types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiEndpoints = API_ENDPOINTS;
  constructor(
    public api: ApiClient,
    public appConfigService: AppConfigService
  ) {}

  prepareApiURL(API_URL: string): string {
    return this.appConfigService.getBaseApiURL() + API_URL;
  }

  getRules(): Observable<RulesResponse> {
    return this.api.get(this.prepareApiURL(this.apiEndpoints.getRules));
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
