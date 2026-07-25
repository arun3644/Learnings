import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StaffState } from './staff.reducer';

const selectStaffState = createFeatureSelector<StaffState>('staff');

export const selectAllStaff = createSelector(selectStaffState, state => state.staff);
export const selectStaffLoading = createSelector(selectStaffState, state => state.loading);
export const selectStaffError = createSelector(selectStaffState, state => state.error);
export const selectMetaData = createSelector(selectStaffState, state => state.metaData);
export const selectPageHeader = createSelector(selectStaffState, state => state.metaData?.page?.header);
export const selectFilters = createSelector(selectStaffState, state => state.metaData?.filters);
