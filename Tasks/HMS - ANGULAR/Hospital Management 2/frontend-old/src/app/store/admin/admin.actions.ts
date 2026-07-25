import { createAction, props } from '@ngrx/store';
import { Admin, AdminDashboardStats } from '../../services/admin.service';

// Load all admins
export const loadAdmins = createAction('[Admin] Load Admins');
export const loadAdminsSuccess = createAction(
  '[Admin] Load Admins Success',
  props<{ admins: Admin[] }>()
);
export const loadAdminsFailure = createAction(
  '[Admin] Load Admins Failure',
  props<{ error: string }>()
);

// Load admin by ID
export const loadAdminById = createAction(
  '[Admin] Load Admin By ID',
  props<{ id: number }>()
);
export const loadAdminByIdSuccess = createAction(
  '[Admin] Load Admin By ID Success',
  props<{ admin: Admin }>()
);
export const loadAdminByIdFailure = createAction(
  '[Admin] Load Admin By ID Failure',
  props<{ error: string }>()
);

// Load admin dashboard stats
export const loadAdminDashboardStats = createAction('[Admin] Load Dashboard Stats');
export const loadAdminDashboardStatsSuccess = createAction(
  '[Admin] Load Dashboard Stats Success',
  props<{ stats: AdminDashboardStats }>()
);
export const loadAdminDashboardStatsFailure = createAction(
  '[Admin] Load Dashboard Stats Failure',
  props<{ error: string }>()
);

// Update admin
export const updateAdmin = createAction(
  '[Admin] Update Admin',
  props<{ id: number; data: any }>()
);
export const updateAdminSuccess = createAction(
  '[Admin] Update Admin Success',
  props<{ admin: Admin }>()
);
export const updateAdminFailure = createAction(
  '[Admin] Update Admin Failure',
  props<{ error: string }>()
);

// Delete admin
export const deleteAdmin = createAction(
  '[Admin] Delete Admin',
  props<{ id: number }>()
);
export const deleteAdminSuccess = createAction(
  '[Admin] Delete Admin Success',
  props<{ id: number }>()
);
export const deleteAdminFailure = createAction(
  '[Admin] Delete Admin Failure',
  props<{ error: string }>()
);
