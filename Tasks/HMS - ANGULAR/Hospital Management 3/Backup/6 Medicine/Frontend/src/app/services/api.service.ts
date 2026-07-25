import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {

  private apiBase = environment.apiBaseUrl;

  constructor(public http: HttpClient) {}

  getApiBase(): string {
    return this.apiBase;
  }

  getMetadata<T>(module: string): Observable<T> {
    return this.http.get<T>(`assets/metadata/${module}.metadata.json`);
  }

  getAll<T>(module: string): Observable<T> {
    if (!environment.useApi) {
      return this.http.get<T>(`assets/data/${module}.data.json`).pipe();
    }
    return this.http.get<T>(`${this.apiBase}/${module}`);
  }

  getById<T>(module: string, id: string): Observable<T> {
    if (!environment.useApi) {
      return this.http.get<any[]>(`assets/data/${module}.data.json`).pipe() as Observable<T>;
    }
    return this.http.get<T>(`${this.apiBase}/${module}/${id}`);
  }

  get<T>(url: string): Observable<T>{
    if(!environment.useApi) {
      return this.http.get<T>(`assets/data/${url}.data.json`).pipe();
    }
    return this.http.get<T>( `${this.apiBase}/${url}`);
  }

  create<T>(module: string, body: T): Observable<T> {
    if (!environment.useApi) {
      return of(body);
    }
    return this.http.post<T>(`${this.apiBase}/${module}`, body);
  }

  post<T>(module: string, body: T): Observable<T> {
    return this.create(module, body);
  }

  update<T extends { id: any }>(module: string, body: T): Observable<T> {
    if (!environment.useApi) {
      return of(body);
    }
    return this.http.put<T>(`${this.apiBase}/${module}/${body.id}`, body);
  }

  delete(module: string, id: string): Observable<{ id: string }> {
    if (!environment.useApi) {
      return of({ id });
    }
    return this.http.delete<{ id: string }>(`${this.apiBase}/${module}/${id}`);
  }
}
