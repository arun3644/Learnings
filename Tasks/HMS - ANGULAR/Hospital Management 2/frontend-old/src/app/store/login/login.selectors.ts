import { createSelector, createFeatureSelector } from '@ngrx/store';
import { LoginState } from './login.reducer';
import { parseData } from '../../utility/utilities';

export const selectLoginState = createFeatureSelector<LoginState>('login');

// Auth state selectors
export const selectCurrentUser = createSelector(
  selectLoginState, 
  s => s.user
);

export const selectAuthToken = createSelector(
  selectLoginState, 
  s => s.token
);

export const selectIsAuthenticated = createSelector(
  selectLoginState, 
  s => s.isAuthenticated
);

export const selectLoginLoading = createSelector(
  selectLoginState, 
  s => s.loading
);

export const selectLoginError = createSelector(
  selectLoginState, 
  s => s.error
);

export const selectLoginSuccessMessage = createSelector(
  selectLoginState, 
  s => s.successMessage
);

export const selectUserRole = createSelector(
  selectCurrentUser,
  user => user?.role || null
);

export const selectUserId = createSelector(
  selectCurrentUser,
  user => user?.id || null
);

export const selectUsername = createSelector(
  selectCurrentUser,
  user => user?.username || null
);

// Legacy metadata selectors (for form configuration)
export const selectLoginMetaData = createSelector(
  selectLoginState, 
  s => s.loginData
);

export const selectLoginLayout = createSelector(
  selectLoginState, 
  s => s.loginData?.Layout
);

export const selectLoginCards = createSelector(
  selectLoginState, 
  s => s.loginData?.cards
);