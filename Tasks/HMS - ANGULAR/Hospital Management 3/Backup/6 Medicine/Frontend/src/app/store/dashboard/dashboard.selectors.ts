import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardState } from './dashboard.reducer';

const selectDashboardState = createFeatureSelector<DashboardState>('dashboard');

export const selectStats          = createSelector(selectDashboardState, s => s.stats);
export const selectDashboardLoading = createSelector(selectDashboardState, s => s.loading);
export const selectDashboardError   = createSelector(selectDashboardState, s => s.error);
