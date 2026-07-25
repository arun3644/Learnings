import { createAction, props } from '@ngrx/store';
import { Admin } from '../../core/models/admin.model';

export const loadAdmins = createAction('[Admin] Load Admins');

export const loadAdminsSuccess = createAction(
  '[Admin] Load Admins Success',
  props<{ admins: Admin[] }>()
);

export const loadAdminsFailure = createAction(
  '[Admin] Load Admins Failure',
  props<{ error: string }>()
);

export const loadAdmin = createAction(
  '[Admin] Load Admin',
  props<{ id: number }>()
);

export const loadAdminSuccess = createAction(
  '[Admin] Load Admin Success',
  props<{ admin: Admin }>()
);

export const loadAdminFailure = createAction(
  '[Admin] Load Admin Failure',
  props<{ error: string }>()
);

export const updateAdmin = createAction(
  '[Admin] Update Admin',
  props<{ id: number; admin: Partial<Admin> }>()
);

export const updateAdminSuccess = createAction(
  '[Admin] Update Admin Success',
  props<{ admin: Admin }>()
);

export const updateAdminFailure = createAction(
  '[Admin] Update Admin Failure',
  props<{ error: string }>()
);
