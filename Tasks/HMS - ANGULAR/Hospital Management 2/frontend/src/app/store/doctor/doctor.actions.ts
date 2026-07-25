import { createAction, props } from '@ngrx/store';
import { Doctor } from '../../core/models/doctor.model';

export const loadDoctors = createAction('[Doctor] Load Doctors');

export const loadDoctorsSuccess = createAction(
  '[Doctor] Load Doctors Success',
  props<{ doctors: Doctor[] }>()
);

export const loadDoctorsFailure = createAction(
  '[Doctor] Load Doctors Failure',
  props<{ error: string }>()
);

export const loadDoctor = createAction(
  '[Doctor] Load Doctor',
  props<{ id: number }>()
);

export const loadDoctorSuccess = createAction(
  '[Doctor] Load Doctor Success',
  props<{ doctor: Doctor }>()
);

export const loadDoctorFailure = createAction(
  '[Doctor] Load Doctor Failure',
  props<{ error: string }>()
);

export const updateDoctor = createAction(
  '[Doctor] Update Doctor',
  props<{ id: number; doctor: Partial<Doctor> }>()
);

export const updateDoctorSuccess = createAction(
  '[Doctor] Update Doctor Success',
  props<{ doctor: Doctor }>()
);

export const updateDoctorFailure = createAction(
  '[Doctor] Update Doctor Failure',
  props<{ error: string }>()
);
