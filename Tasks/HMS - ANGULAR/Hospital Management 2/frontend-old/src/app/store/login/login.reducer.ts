import { createReducer, on } from '@ngrx/store';
import { LoginActions } from './login.actions';

export interface LoginState {
  user: any | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
  loginData: any; // Legacy - for form metadata
}

const initialState: LoginState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  successMessage: null,
  loginData: {}
};

export const loginReducer = createReducer(
  initialState,
  
  // Login
  on(LoginActions.login, state => ({
    ...state, 
    loading: true, 
    error: null, 
    successMessage: null
  })),
  on(LoginActions.loginSuccess, (state, { user, token, message }) => ({
    ...state,
    loading: false,
    user,
    token,
    isAuthenticated: true,
    successMessage: message
  })),
  on(LoginActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    isAuthenticated: false
  })),
  
  // Register
  on(LoginActions.register, state => ({
    ...state,
    loading: true,
    error: null,
    successMessage: null
  })),
  on(LoginActions.registerSuccess, (state, { message }) => ({
    ...state,
    loading: false,
    successMessage: message
  })),
  on(LoginActions.registerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  // Logout
  on(LoginActions.logout, state => ({
    ...state,
    loading: true
  })),
  on(LoginActions.logoutSuccess, () => ({
    ...initialState
  })),
  
  // Token validation
  on(LoginActions.validateToken, state => ({
    ...state,
    loading: true
  })),
  on(LoginActions.validateTokenSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    user,
    isAuthenticated: true
  })),
  on(LoginActions.validateTokenFailure, state => ({
    ...state,
    loading: false,
    user: null,
    token: null,
    isAuthenticated: false
  })),
  
  // Load metadata (legacy)
  on(LoginActions.loadLoginMetadata, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(LoginActions.loadLoginMetadataSuccess, (state, { loginData }) => ({
    ...state,
    loading: false,
    loginData
  })),
  on(LoginActions.loadLoginMetadataFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);