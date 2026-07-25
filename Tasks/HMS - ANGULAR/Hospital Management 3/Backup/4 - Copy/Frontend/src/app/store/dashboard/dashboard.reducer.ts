import { createReducer, on } from '@ngrx/store';
import { DashboardActions } from './dashboard.actions';

export interface DashboardState {
  stats: any;
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = { stats: null, loading: false, error: null };

export const dashboardReducer = createReducer(
  initialState,
  on(DashboardActions.loadStats,        state          => ({ ...state, loading: true, error: null })),
  on(DashboardActions.loadStatsSuccess, (state, { stats }) => ({ ...state, loading: false, stats })),
  on(DashboardActions.loadStatsFailure, (state, { error }) => ({ ...state, loading: false, error }))
);
