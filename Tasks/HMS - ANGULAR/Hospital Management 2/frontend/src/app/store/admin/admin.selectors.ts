import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AdminState } from './admin.state';

export const selectAdminState = createFeatureSelector<AdminState>('admin');

export const selectAllAdmins = createSelector(
  selectAdminState,
  (state) => state.admins
);

export const selectSelectedAdmin = createSelector(
  selectAdminState,
  (state) => state.selectedAdmin
);

export const selectAdminLoading = createSelector(
  selectAdminState,
  (state) => state.loading
);

export const selectAdminError = createSelector(
  selectAdminState,
  (state) => state.error
);
