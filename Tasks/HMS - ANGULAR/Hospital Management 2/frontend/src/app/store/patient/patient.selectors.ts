import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PatientState } from './patient.state';

export const selectPatientState = createFeatureSelector<PatientState>('patient');

export const selectAllPatients = createSelector(
  selectPatientState,
  (state) => state.patients
);

export const selectSelectedPatient = createSelector(
  selectPatientState,
  (state) => state.selectedPatient
);

export const selectPatientLoading = createSelector(
  selectPatientState,
  (state) => state.loading
);

export const selectPatientError = createSelector(
  selectPatientState,
  (state) => state.error
);
