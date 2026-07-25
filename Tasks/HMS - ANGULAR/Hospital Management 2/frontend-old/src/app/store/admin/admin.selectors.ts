import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AdminState } from './admin.reducer';

export const selectAdminState = createFeatureSelector<AdminState>('admin');

export const selectAllAdmins = createSelector(
  selectAdminState,
  (state) => state.admins
);

export const selectSelectedAdmin = createSelector(
  selectAdminState,
  (state) => state.selectedAdmin
);

export const selectAdminDashboardStats = createSelector(
  selectAdminState,
  (state) => state.dashboardStats
);

export const selectAdminLoading = createSelector(
  selectAdminState,
  (state) => state.loading
);

export const selectAdminError = createSelector(
  selectAdminState,
  (state) => state.error
);

// Derived selectors
export const selectAdminById = (id: number) =>
  createSelector(selectAllAdmins, (admins) =>
    admins.find((a) => a.id === id)
  );

export const selectAdminsByDepartment = (department: string) =>
  createSelector(selectAllAdmins, (admins) =>
    admins.filter((a) => a.department === department)
  );
