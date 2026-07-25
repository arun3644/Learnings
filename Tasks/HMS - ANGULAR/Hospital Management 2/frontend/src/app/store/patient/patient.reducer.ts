import { createReducer, on } from '@ngrx/store';
import { initialPatientState } from './patient.state';
import * as PatientActions from './patient.actions';

export const patientReducer = createReducer(
  initialPatientState,
  on(PatientActions.loadPatients, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(PatientActions.loadPatientsSuccess, (state, { patients }) => ({
    ...state,
    patients,
    loading: false,
    error: null
  })),
  on(PatientActions.loadPatientsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(PatientActions.loadPatientSuccess, (state, { patient }) => ({
    ...state,
    selectedPatient: patient,
    loading: false,
    error: null
  })),
  on(PatientActions.updatePatientSuccess, (state, { patient }) => ({
    ...state,
    selectedPatient: patient,
    patients: state.patients.map(p => p.id === patient.id ? patient : p),
    loading: false,
    error: null
  }))
);
