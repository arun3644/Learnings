import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, tap, catchError, switchMap } from 'rxjs/operators';
import { environment } from '../environments/environment';

export interface User {
  id: string | number | null;
  username: string;
  email?: string;
  role: string;
  token?: string;
  name?: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  message?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
  role: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  role: string;
  name: string;
  email: string;
  specialization?: string;
  yearsOfExperience?: number;
  phoneNumber?: string;
  licenseNumber?: string;
  department?: string;
  shift?: string;
  age?: number;
  gender?: string;
  bloodGroup?: string;
  condition?: string;
  address?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromSession());
  public currentUser$ = this.currentUserSubject.asObservable();

  private apiBase = environment.apiBaseUrl;
  private authTokenKey = 'auth_token';
  private userKey = 'current_user';

  constructor(private http: HttpClient) {
    this.checkTokenValidity();
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    if (!credentials.role) {
      return of({ success: false, message: 'Invalid role selected' });
    }

    const backendRole = this.getSupportedRole(credentials.role);
    if (!backendRole) {
      return of({ success: false, message: 'Unsupported login role' });
    }

    const payload = {
      username: credentials.username,
      password: credentials.password,
      role: backendRole
    };

    return this.http.post<any>(`${this.apiBase}/auth/login`, payload).pipe(
      map(response => {
        if (!response?.success) {
          return { success: false, message: response?.message || 'Invalid credentials' };
        }

        const responseUser = response.user || response?.userInfo;
        const user: User = {
          id: responseUser?.id ?? response.userId ?? null,
          username: responseUser?.username ?? response.username,
          role: responseUser?.role || credentials.role,
          token: response.token,
          name: responseUser?.name || response.name || credentials.username,
          email: responseUser?.email || response.email
        };

        return {
          success: true,
          user,
          token: response.token,
          message: response.message
        };
      }),
      tap(response => {
        if (response.success && response.token && response.user) {
          this.setAuthData(response.user, response.token);
        }
      }),
      catchError(error => {
        return of({ success: false, message: 'Login failed. Please try again.' });
      })
    );
  }

  register(credentials: RegisterRequest): Observable<AuthResponse> {
    const backendRole = this.getBackendRole(credentials.role);
    if (!backendRole) {
      return of({ success: false, message: 'Invalid role selected' });
    }

    const payload: any = {
      username: credentials.username,
      password: credentials.password,
      name: credentials.name,
      email: credentials.email
    };

    if (credentials.role === 'Doctor') {
      payload.specialization = credentials.specialization || 'General';
      payload.yearsOfExperience = credentials.yearsOfExperience ?? 0;
      payload.phoneNumber = credentials.phoneNumber || '';
      payload.licenseNumber = credentials.licenseNumber || '';
    } else if (credentials.role === 'Nurse') {
      payload.department = credentials.department || 'General';
      payload.yearsOfExperience = credentials.yearsOfExperience ?? 0;
      payload.phoneNumber = credentials.phoneNumber || '';
      payload.shift = credentials.shift || 'Morning';
    } else if (credentials.role === 'Patient') {
      payload.age = credentials.age ?? 0;
      payload.gender = credentials.gender || 'Male';
      payload.phoneNumber = credentials.phoneNumber || '';
      payload.bloodGroup = credentials.bloodGroup || 'O+';
      payload.condition = credentials.condition || 'Stable';
      payload.address = credentials.address || 'N/A';
    }

    return this.http.post<any>(`${this.apiBase}/auth/register/${credentials.role.toLowerCase()}`, payload).pipe(
      map(response => {
        if (!response?.success) {
          return { success: false, message: response?.message || 'Registration failed' };
        }

        const user: User = {
          id: response.adminId || response.doctorId || response.nurseId || response.patientId || null,
          username: response.username,
          role: credentials.role,
          token: response.token,
          name: response.name || credentials.name,
          email: response.email
        };

        return {
          success: true,
          user,
          token: response.token,
          message: response.message
        };
      }),
      tap(response => {
        if (response.success && response.token && response.user) {
          this.setAuthData(response.user, response.token);
        }
      }),
      catchError(error => {
        return of({ success: false, message: 'Registration failed. Please try again.' });
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.authTokenKey);
    localStorage.removeItem(this.userKey);
    this.currentUserSubject.next(null);
  }

 
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }


  getToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken() && !!this.getCurrentUser();
  }

  private setAuthData(user: User, token: string): void {
    localStorage.setItem(this.authTokenKey, token);
    localStorage.setItem(this.userKey, JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  
  private getUserFromSession(): User | null {
    const userStr = localStorage.getItem(this.userKey);
    return userStr ? JSON.parse(userStr) : null;
  }

  private checkTokenValidity(): void {
    const token = this.getToken();
    if (token) {
      const user = this.getCurrentUser();
      if (!user) {
        this.logout();
      }
    }
  }

  validateToken(token: string): Observable<boolean> {
    if (!token) {
      return of(false);
    }
    return this.http.post<any>(`${this.apiBase}/auth/validate`, { token }).pipe(
      map(response => !!response?.success),
      catchError(() => of(false))
    );
  }

  private getSupportedRole(role: string): string | null {
    const supportedRoles = ['Admin', 'Doctor', 'Nurse', 'Patient'];
    return supportedRoles.includes(role) ? role : null;
  }

  private getBackendRole(role: string): string | null {
    const roleMap: { [key: string]: string } = {
      'Admin': 'ADMIN',
      'Doctor': 'DOCTOR',
      'Nurse': 'NURSE',
      'Patient': 'PATIENT'
    };
    return roleMap[role] || null;
  }

  getRole(): string | null {
    return this.getCurrentUser()?.role || null;
  }

  hasRole(role: string): boolean {
    return this.getRole() === role;
  }

  hasAnyRole(roles: string[]): boolean {
    const userRole = this.getRole();
    return userRole ? roles.includes(userRole) : false;
  }

  private generateMockToken(username: string): string {
    const payload = { username, iat: Date.now() };
    return btoa(JSON.stringify(payload));
  }
}
