import { createReducer, on } from '@ngrx/store';
import { initialAdminState } from './admin.state';
import * as AdminActions from './admin.actions';

export const adminReducer = createReducer(
  initialAdminState,
  on(AdminActions.loadAdmins, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(AdminActions.loadAdminsSuccess, (state, { admins }) => ({
    ...state,
    admins,
    loading: false,
    error: null
  })),
  on(AdminActions.loadAdminsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(AdminActions.loadAdminSuccess, (state, { admin }) => ({
    ...state,
    selectedAdmin: admin,
    loading: false,
    error: null
  })),
  on(AdminActions.updateAdminSuccess, (state, { admin }) => ({
    ...state,
    selectedAdmin: admin,
    admins: state.admins.map(a => a.id === admin.id ? admin : a),
    loading: false,
    error: null
  }))
);
