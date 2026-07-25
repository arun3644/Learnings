import { createAction, props } from '@ngrx/store';
import { Patient } from '../../core/models/patient.model';

export const loadPatients = createAction('[Patient] Load Patients');

export const loadPatientsSuccess = createAction(
  '[Patient] Load Patients Success',
  props<{ patients: Patient[] }>()
);

export const loadPatientsFailure = createAction(
  '[Patient] Load Patients Failure',
  props<{ error: string }>()
);

export const loadPatient = createAction(
  '[Patient] Load Patient',
  props<{ id: number }>()
);

export const loadPatientSuccess = createAction(
  '[Patient] Load Patient Success',
  props<{ patient: Patient }>()
);

export const loadPatientFailure = createAction(
  '[Patient] Load Patient Failure',
  props<{ error: string }>()
);

export const updatePatient = createAction(
  '[Patient] Update Patient',
  props<{ id: number; patient: Partial<Patient> }>()
);

export const updatePatientSuccess = createAction(
  '[Patient] Update Patient Success',
  props<{ patient: Patient }>()
);

export const updatePatientFailure = createAction(
  '[Patient] Update Patient Failure',
  props<{ error: string }>()
);
