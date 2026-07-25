import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  login(credentials: { username: string; password: string; role: string }): Observable<any> {
    return this.http.post(`${API_ENDPOINTS.AUTH}/login`, credentials);
  }

  register(userData: any, role: string): Observable<any> {
    return this.http.post(`${API_ENDPOINTS.AUTH}/register/${role.toLowerCase()}`, userData);
  }

  validateToken(token: string): Observable<any> {
    return this.http.post(`${API_ENDPOINTS.AUTH}/validate`, { token });
  }

  logout(): void {
    // Clear storage handled by StorageService
  }
}
