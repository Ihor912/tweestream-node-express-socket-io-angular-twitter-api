import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiClient {
  constructor(private http: HttpClient) {}

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(`${url}`);
  }

  post<T, D>(url: string, data: D, headers?: HttpHeaders): Observable<T> {
    return this.http.post<T>(`${url}`, JSON.stringify(data), { headers });
  }

  put<T, D>(url: string, data: D, headers?: HttpHeaders): Observable<T> {
    return this.http.put<T>(`${url}`, JSON.stringify(data), { headers });
  }

  delete<T>(url: string, headers?: HttpHeaders): Observable<T> {
    return this.http.delete<T>(`${url}`, { headers });
  }
}
