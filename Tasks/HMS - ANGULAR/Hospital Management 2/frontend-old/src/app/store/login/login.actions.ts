import { createActionGroup, emptyProps, props } from '@ngrx/store';

export interface LoginCredentials {
  username: string;
  password: string;
  role: string;
}

export interface RegisterCredentials {
  username: string;
  password: string;
  name: string;
  email: string;
  // Role-specific fields
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

export const LoginActions = createActionGroup({
  source: 'Login',
  events: {
    // Login
    'Login':                props<{ credentials: LoginCredentials }>(),
    'Login Success':        props<{ user: any; token: string; message: string }>(),
    'Login Failure':        props<{ error: string }>(),
    
    // Register
    'Register':             props<{ role: string; credentials: RegisterCredentials }>(),
    'Register Success':     props<{ message: string }>(),
    'Register Failure':     props<{ error: string }>(),
    
    // Logout
    'Logout':               emptyProps(),
    'Logout Success':       emptyProps(),
    
    // Token validation
    'Validate Token':       props<{ token: string }>(),
    'Validate Token Success': props<{ user: any }>(),
    'Validate Token Failure': emptyProps(),
    
    // Load metadata (legacy - for form config)
    'Load Login Metadata':         emptyProps(),
    'Load Login Metadata Success': props<{ loginData: any }>(),
    'Load Login Metadata Failure': props<{ error: string }>(),
  }
});
