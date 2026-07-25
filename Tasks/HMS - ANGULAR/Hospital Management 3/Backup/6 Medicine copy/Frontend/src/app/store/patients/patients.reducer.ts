import { createReducer, on } from '@ngrx/store';
import { PatientsActions } from './patients.actions';

export interface PatientsState {
  patients: any[];
  loading: boolean;
  error: string | null;
  metaData: any;
}

const initialState: PatientsState = {
  patients: [],
  loading: false,
  error: null,
  metaData: null
};

export const patientsReducer = createReducer(
  initialState,
  on(PatientsActions.loadPatients,        state => ({ ...state, loading: true, error: null })),
  on(PatientsActions.loadPatientsSuccess, (state, { patients }) => ({ ...state, loading: false, patients })),
  on(PatientsActions.loadPatientsFailure, (state, { error })    => ({ ...state, loading: false, error })),
  on(PatientsActions.loadMetadataSuccess, (state, { metaData }) => ({ ...state, metaData })),
  on(PatientsActions.addPatient,    (state, { patient })  => ({ ...state, patients: [...state.patients, patient] })),
  on(PatientsActions.updatePatient, (state, { patient })  => ({ ...state, patients: state.patients.map(p => p.id === patient.id ? patient : p) })),
  on(PatientsActions.deletePatient, (state, { id })       => ({ ...state, patients: state.patients.filter(p => p.id !== id) }))
);
