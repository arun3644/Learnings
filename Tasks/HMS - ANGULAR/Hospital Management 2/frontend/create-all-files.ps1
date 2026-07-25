# PowerShell script to create all frontend files

# Function to create file with content
function Create-File {
    param(
        [string]$Path,
        [string]$Content
    )
    $Content | Out-File -FilePath $Path -Encoding utf8 -Force
}

Write-Host "Creating all frontend files..." -ForegroundColor Cyan

# Core Models
Create-File "src/app/core/models/user.model.ts" @"
export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'DOCTOR' | 'PATIENT' | 'NURSE';
  createdAt?: Date;
}
"@

Create-File "src/app/core/models/admin.model.ts" @"
import { User } from './user.model';

export interface Admin extends User {
  adminId: string;
  department?: string;
  phoneNumber?: string;
}
"@

Create-File "src/app/core/models/doctor.model.ts" @"
import { User } from './user.model';

export interface Doctor extends User {
  doctorId: string;
  specialization: string;
  yearsOfExperience: number;
  phoneNumber: string;
  licenseNumber: string;
}
"@

Create-File "src/app/core/models/patient.model.ts" @"
import { User } from './user.model';

export interface Patient extends User {
  patientId: string;
  age: number;
  gender: string;
  phoneNumber: string;
  bloodGroup: string;
  address: string;
  status: string;
}
"@

Create-File "src/app/core/models/nurse.model.ts" @"
import { User } from './user.model';

export interface Nurse extends User {
  nurseId: string;
  department: string;
  yearsOfExperience: number;
  phoneNumber: string;
  shift: string;
}
"@

Create-File "src/app/core/models/appointment.model.ts" @"
export interface Appointment {
  id: number;
  appointmentId: string;
  patientId: number;
  doctorId: number;
  date: Date;
  time: string;
  duration: number;
  reason: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled' | 'Rescheduled';
  notes?: string;
  createdAt: Date;
}
"@

Create-File "src/app/core/models/time-slot.model.ts" @"
export interface TimeSlot {
  id: number;
  doctorId: number;
  date: Date;
  time: string;
  isAvailable: boolean;
}
"@

Create-File "src/app/core/models/index.ts" @"
export * from './user.model';
export * from './admin.model';
export * from './doctor.model';
export * from './patient.model';
export * from './nurse.model';
export * from './appointment.model';
export * from './time-slot.model';
"@

# Core Constants
Create-File "src/app/core/constants/api.constants.ts" @"
import { environment } from '../../../environments/environment';

const BASE_URL = environment.apiUrl;

export const API_ENDPOINTS = {
  AUTH: `${BASE_URL}/api/auth`,
  ADMINS: `${BASE_URL}/api/admins`,
  DOCTORS: `${BASE_URL}/api/doctors`,
  PATIENTS: `${BASE_URL}/api/patients`,
  NURSES: `${BASE_URL}/api/nurses`,
  APPOINTMENTS: `${BASE_URL}/api/appointments`,
  STATISTICS: `${BASE_URL}/api/statistics`
};
"@

Create-File "src/app/core/constants/app.constants.ts" @"
export const APP_CONSTANTS = {
  APP_NAME: 'Hospital Management System',
  VERSION: '1.0.0',
  ROLES: {
    ADMIN: 'ADMIN',
    DOCTOR: 'DOCTOR',
    PATIENT: 'PATIENT',
    NURSE: 'NURSE'
  },
  APPOINTMENT_STATUS: {
    SCHEDULED: 'Scheduled',
    COMPLETED: 'Completed',
    CANCELLED: 'Cancelled',
    RESCHEDULED: 'Rescheduled'
  }
};
"@

Create-File "src/app/core/constants/index.ts" @"
export * from './api.constants';
export * from './app.constants';
"@

# Core Utils
Create-File "src/app/core/utils/date.utils.ts" @"
export class DateUtils {
  static formatDate(date: Date | string): string {
    const d = new Date(date);
    return d.toLocaleDateString();
  }

  static formatTime(time: string): string {
    return time;
  }

  static formatDateTime(date: Date | string): string {
    const d = new Date(date);
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
  }

  static isToday(date: Date | string): boolean {
    const d = new Date(date);
    const today = new Date();
    return d.toDateString() === today.toDateString();
  }

  static addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
}
"@

Create-File "src/app/core/utils/validation.utils.ts" @"
export class ValidationUtils {
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static isValidPhone(phone: string): boolean {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  }

  static isValidPassword(password: string): boolean {
    return password.length >= 6;
  }
}
"@

Create-File "src/app/core/utils/index.ts" @"
export * from './date.utils';
export * from './validation.utils';
"@

Write-Host "✓ Core files created" -ForegroundColor Green

# Store - Auth
Create-File "src/app/store/auth/auth.state.ts" @"
export interface AuthState {
  user: any | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export const initialAuthState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null
};
"@

Create-File "src/app/store/auth/auth.actions.ts" @"
import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Auth] Login',
  props<{ credentials: { username: string; password: string; role: string } }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: any; token: string }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');

export const register = createAction(
  '[Auth] Register',
  props<{ userData: any; role: string }>()
);

export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ user: any }>()
);

export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: string }>()
);
"@

Create-File "src/app/store/auth/auth.reducer.ts" @"
import { createReducer, on } from '@ngrx/store';
import { initialAuthState } from './auth.state';
import * as AuthActions from './auth.actions';

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(AuthActions.loginSuccess, (state, { user, token }) => ({
    ...state,
    user,
    token,
    isAuthenticated: true,
    loading: false,
    error: null
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(AuthActions.logout, () => initialAuthState)
);
"@

Create-File "src/app/store/auth/auth.effects.ts" @"
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { map, catchError, tap, switchMap } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.service';
import { StorageService } from '../../core/services/storage.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private storageService = inject(StorageService);
  private router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ credentials }) =>
        this.authService.login(credentials).pipe(
          map((response) => {
            this.storageService.setToken(response.token);
            this.storageService.setUserData(response);
            this.storageService.setUserRole(response.role);
            return AuthActions.loginSuccess({ user: response, token: response.token });
          }),
          catchError((error) =>
            of(AuthActions.loginFailure({ error: error.message }))
          )
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({ user }) => {
          const role = user.role.toLowerCase();
          this.router.navigate([`/${role}/dashboard`]);
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          this.storageService.clear();
          this.router.navigate(['/auth/login']);
        })
      ),
    { dispatch: false }
  );
}
"@

Create-File "src/app/store/auth/auth.selectors.ts" @"
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUser = createSelector(
  selectAuthState,
  (state) => state.user
);

export const selectToken = createSelector(
  selectAuthState,
  (state) => state.token
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state) => state.isAuthenticated
);

export const selectAuthLoading = createSelector(
  selectAuthState,
  (state) => state.loading
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state) => state.error
);
"@

Write-Host "✓ Store files created" -ForegroundColor Green

Write-Host "All files created successfully!" -ForegroundColor Green
