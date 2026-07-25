import { createReducer, on } from '@ngrx/store';
import * as AdminActions from './admin.actions';
import { Admin, AdminDashboardStats } from '../../services/admin.service';

export interface AdminState {
  admins: Admin[];
  selectedAdmin: Admin | null;
  dashboardStats: AdminDashboardStats | null;
  loading: boolean;
  error: string | null;
}

const initialState: AdminState = {
  admins: [],
  selectedAdmin: null,
  dashboardStats: null,
  loading: false,
  error: null
};

export const adminReducer = createReducer(
  initialState,

  // Load all admins
  on(AdminActions.loadAdmins, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(AdminActions.loadAdminsSuccess, (state, { admins }) => ({
    ...state,
    admins,
    loading: false
  })),
  on(AdminActions.loadAdminsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Load admin by ID
  on(AdminActions.loadAdminById, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(AdminActions.loadAdminByIdSuccess, (state, { admin }) => ({
    ...state,
    selectedAdmin: admin,
    loading: false
  })),
  on(AdminActions.loadAdminByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Load dashboard stats
  on(AdminActions.loadAdminDashboardStats, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(AdminActions.loadAdminDashboardStatsSuccess, (state, { stats }) => ({
    ...state,
    dashboardStats: stats,
    loading: false
  })),
  on(AdminActions.loadAdminDashboardStatsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Update admin
  on(AdminActions.updateAdmin, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(AdminActions.updateAdminSuccess, (state, { admin }) => ({
    ...state,
    admins: state.admins.map(a => a.id === admin.id ? admin : a),
    selectedAdmin: state.selectedAdmin?.id === admin.id ? admin : state.selectedAdmin,
    loading: false
  })),
  on(AdminActions.updateAdminFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Delete admin
  on(AdminActions.deleteAdmin, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(AdminActions.deleteAdminSuccess, (state, { id }) => ({
    ...state,
    admins: state.admins.filter(a => a.id !== id),
    loading: false
  })),
  on(AdminActions.deleteAdminFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
