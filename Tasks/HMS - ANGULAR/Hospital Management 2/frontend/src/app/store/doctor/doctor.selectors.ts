import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DoctorState } from './doctor.state';

export const selectDoctorState = createFeatureSelector<DoctorState>('doctor');

export const selectAllDoctors = createSelector(
  selectDoctorState,
  (state) => state.doctors
);

export const selectSelectedDoctor = createSelector(
  selectDoctorState,
  (state) => state.selectedDoctor
);

export const selectDoctorLoading = createSelector(
  selectDoctorState,
  (state) => state.loading
);

export const selectDoctorError = createSelector(
  selectDoctorState,
  (state) => state.error
);
