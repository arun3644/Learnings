import { createReducer, on } from '@ngrx/store';
import { initialDoctorState } from './doctor.state';
import * as DoctorActions from './doctor.actions';

export const doctorReducer = createReducer(
  initialDoctorState,
  on(DoctorActions.loadDoctors, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(DoctorActions.loadDoctorsSuccess, (state, { doctors }) => ({
    ...state,
    doctors,
    loading: false,
    error: null
  })),
  on(DoctorActions.loadDoctorsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(DoctorActions.loadDoctorSuccess, (state, { doctor }) => ({
    ...state,
    selectedDoctor: doctor,
    loading: false,
    error: null
  })),
  on(DoctorActions.updateDoctorSuccess, (state, { doctor }) => ({
    ...state,
    selectedDoctor: doctor,
    doctors: state.doctors.map(d => d.id === doctor.id ? doctor : d),
    loading: false,
    error: null
  }))
);
