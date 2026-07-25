import { createReducer, on } from '@ngrx/store';
import { StaffActions } from './staff.actions';

export interface StaffState {
  staff: any[];
  loading: boolean;
  error: string | null;
  metaData: any;
}

export const initialStaffState: StaffState = {
  staff: [],
  loading: false,
  error: null,
  metaData: null
};

export const staffReducer = createReducer(
  initialStaffState,
  on(StaffActions.loadStaff, state => ({ ...state, loading: true, error: null })),
  on(StaffActions.loadStaffSuccess, (state, { staff }) => ({ ...state, staff, loading: false, error: null })),
  on(StaffActions.loadStaffFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(StaffActions.loadMetadataSuccess, (state, { metaData }) => ({ ...state, metaData }))
);
