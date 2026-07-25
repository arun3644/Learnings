import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';

export interface User {
  id: number;
  username: string;
  email?: string;
  role: string;
  name?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: User;
}

export interface LoginRequest {
  username: string;
  password: string;
  role: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
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
    // Don't validate token on startup - it causes issues
    // Token will be validated when needed
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<any>(`${this.apiBase}/auth/login`, credentials).pipe(
      map(response => {
        // Backend response structure: { success, message, token, role, userId, username, expiresIn }
        if (response.success && response.token) {
          return {
            success: true,
            message: response.message,
            token: response.token,
            user: {
              id: response.userId,
              username: response.username,
              role: response.role,
              name: response.username, // Backend doesn't return name in login, use username
              email: '' // Backend doesn't return email in login
            }
          };
        } else {
          return {
            success: false,
            message: response.message || 'Login failed'
          };
        }
      }),
      tap(response => {
        if (response.success && response.token && response.user) {
          this.setAuthData(response.user, response.token);
        }
      }),
      catchError(error => {
        console.error('Login error:', error);
        const message = error.error?.message || 'Login failed. Please try again.';
        return of({ success: false, message });
      })
    );
  }

  register(role: string, credentials: RegisterRequest): Observable<AuthResponse> {
    const allowedRoles = ['Admin', 'Doctor', 'Nurse', 'Patient'];
    
    if (!allowedRoles.includes(role)) {
      return of({ 
        success: false, 
        message: 'Invalid role for registration' 
      });
    }

    const roleEndpointMap: { [key: string]: string } = {
      'Admin': 'admin',
      'Doctor': 'doctor',
      'Nurse': 'nurse',
      'Patient': 'patient'
    };

    const endpoint = roleEndpointMap[role];
    
    // Backend expects different fields for each role
    return this.http.post<any>(`${this.apiBase}/auth/register/${endpoint}`, credentials).pipe(
      map(response => {
        // Backend response: { success, message, [roleId], username, name, email, error }
        if (response.success) {
          return {
            success: true,
            message: response.message || 'Registration successful'
          };
        } else {
          return {
            success: false,
            message: response.error || response.message || 'Registration failed'
          };
        }
      }),
      catchError(error => {
        console.error('Registration error:', error);
        const message = error.error?.error || error.error?.message || 'Registration failed. Please try again.';
        return of({ success: false, message });
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
      // Validate token with backend
      this.validateToken(token).subscribe(isValid => {
        if (!isValid) {
          this.logout();
        }
      });
    }
  }

  validateToken(token: string): Observable<boolean> {
    return this.http.post<any>(`${this.apiBase}/auth/validate`, { token }).pipe(
      map(response => {
        // Backend response: { success, message, username, role, expiresIn, error }
        if (response.success) {
          // Update user info from token validation
          const currentUser = this.getCurrentUser();
          if (currentUser) {
            currentUser.username = response.username;
            currentUser.role = response.role;
            this.currentUserSubject.next(currentUser);
            localStorage.setItem(this.userKey, JSON.stringify(currentUser));
          }
          return true;
        }
        return false;
      }),
      catchError(() => of(false))
    );
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

  // Health check
  healthCheck(): Observable<{ status: string; message: string }> {
    return this.http.get<{ status: string; message: string }>(`${this.apiBase}/auth/health`);
  }
}
