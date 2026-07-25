import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PatientsState } from './patients.reducer';

const selectPatientsState = createFeatureSelector<PatientsState>('patients');

export const selectAllPatients = createSelector(
  selectPatientsState, 
  s => s.patients
);

export const selectSelectedPatient = createSelector(
  selectPatientsState, 
  s => s.selectedPatient
);

export const selectPatientDashboardStats = createSelector(
  selectPatientsState, 
  s => s.dashboardStats
);

export const selectPatientsLoading = createSelector(
  selectPatientsState, 
  s => s.loading
);

export const selectPatientsError = createSelector(
  selectPatientsState, 
  s => s.error
);

// Derived selectors
export const selectPatientById = (id: number) =>
  createSelector(selectAllPatients, (patients) =>
    patients.find((p) => p.id === id)
  );

export const selectPatientsByStatus = (status: string) =>
  createSelector(selectAllPatients, (patients) =>
    patients.filter((p) => p.status === status)
  );

export const selectPatientsByBloodGroup = (bloodGroup: string) =>
  createSelector(selectAllPatients, (patients) =>
    patients.filter((p) => p.bloodGroup === bloodGroup)
  );
