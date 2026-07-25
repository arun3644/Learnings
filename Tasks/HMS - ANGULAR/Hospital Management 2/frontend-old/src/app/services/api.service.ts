import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../environments/environment';

/**
 * API Service - Legacy service for backward compatibility
 * 
 * @deprecated Most methods in this service are deprecated.
 * Use specific services instead:
 * - AuthService for authentication
 * - DoctorService for doctor operations
 * - PatientService for patient operations
 * - AppointmentService for appointment operations
 * - StatisticsService for statistics
 * 
 * Only getMetadata() should be used for UI configuration.
 */
@Injectable({ providedIn: 'root' })
export class ApiService {

  private apiBase = environment.apiBaseUrl;

  constructor(public http: HttpClient) {}

  getApiBase(): string {
    return this.apiBase;
  }

  /**
   * Get metadata for UI configuration
   * This method is still valid and should be used for loading UI metadata
   */
  getMetadata<T>(module: string): Observable<T> {
    return this.http.get<T>(`assets/metadata/${module}.metadata.json`);
  }

  /**
   * @deprecated Use specific services instead (DoctorService, PatientService, etc.)
   * This method is kept only for backward compatibility
   */
  getAll<T>(module: string): Observable<T> {
    console.warn(`ApiService.getAll() is deprecated. Use specific service for ${module} instead.`);
    if (!environment.useApi) {
      return this.http.get<T>(`assets/data/${module}.data.json`).pipe();
    }
    return this.http.get<T>(`${this.apiBase}/${module}`);
  }

  /**
   * @deprecated Use specific services instead (DoctorService.getDoctorById(), etc.)
   * This method is kept only for backward compatibility
   */
  getById<T>(module: string, id: string): Observable<T> {
    console.warn(`ApiService.getById() is deprecated. Use specific service for ${module} instead.`);
    if (!environment.useApi) {
      return this.http.get<any[]>(`assets/data/${module}.data.json`).pipe() as Observable<T>;
    }
    return this.http.get<T>(`${this.apiBase}/${module}/${id}`);
  }

  /**
   * @deprecated Use AuthService.register() for user registration
   * This method is kept only for backward compatibility
   */
  create<T>(module: string, body: T): Observable<T> {
    console.warn(`ApiService.create() is deprecated. Use AuthService.register() or specific service instead.`);
    if (!environment.useApi) {
      return of(body);
    }
    return this.http.post<T>(`${this.apiBase}/${module}`, body);
  }

  /**
   * @deprecated Use specific services instead
   * This method is kept only for backward compatibility
   */
  post<T>(module: string, body: T): Observable<T> {
    console.warn(`ApiService.post() is deprecated. Use specific service instead.`);
    return this.create(module, body);
  }

  /**
   * @deprecated Use specific services (DoctorService.updateDoctor(), etc.)
   * This method is kept only for backward compatibility
   */
  update<T extends { id: any }>(module: string, body: T): Observable<T> {
    console.warn(`ApiService.update() is deprecated. Use specific service for ${module} instead.`);
    if (!environment.useApi) {
      return of(body);
    }
    return this.http.put<T>(`${this.apiBase}/${module}/${body.id}`, body);
  }

  /**
   * @deprecated Use specific services (DoctorService.deleteDoctor(), etc.)
   * This method is kept only for backward compatibility
   */
  delete(module: string, id: string): Observable<{ id: string }> {
    console.warn(`ApiService.delete() is deprecated. Use specific service for ${module} instead.`);
    if (!environment.useApi) {
      return of({ id });
    }
    return this.http.delete<{ id: string }>(`${this.apiBase}/${module}/${id}`);
  }
}
