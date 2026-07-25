import { createAction, props } from '@ngrx/store';
import { DashboardStats } from './dashboard.state';

export const loadDashboardStats = createAction(
  '[Dashboard] Load Dashboard Stats',
  props<{ role: string; userId: number }>()
);

export const loadDashboardStatsSuccess = createAction(
  '[Dashboard] Load Dashboard Stats Success',
  props<{ stats: DashboardStats }>()
);

export const loadDashboardStatsFailure = createAction(
  '[Dashboard] Load Dashboard Stats Failure',
  props<{ error: string }>()
);

export const clearDashboardStats = createAction('[Dashboard] Clear Dashboard Stats');
