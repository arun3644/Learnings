import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PatientsState } from './patients.reducer';

const selectPatientsState = createFeatureSelector<PatientsState>('patients');

export const selectAllPatients = createSelector(selectPatientsState, s => s.patients);
export const selectPatientsLoading = createSelector(selectPatientsState, s => s.loading);
export const selectPatientsError   = createSelector(selectPatientsState, s => s.error);
