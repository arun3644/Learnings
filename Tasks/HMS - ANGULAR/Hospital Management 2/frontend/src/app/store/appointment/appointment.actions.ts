import { createAction, props } from '@ngrx/store';
import { Appointment } from '../../core/models/appointment.model';

export const loadAppointments = createAction('[Appointment] Load Appointments');

export const loadAppointmentsSuccess = createAction(
  '[Appointment] Load Appointments Success',
  props<{ appointments: Appointment[] }>()
);

export const loadAppointmentsFailure = createAction(
  '[Appointment] Load Appointments Failure',
  props<{ error: string }>()
);

export const loadAppointment = createAction(
  '[Appointment] Load Appointment',
  props<{ id: number }>()
);

export const loadAppointmentSuccess = createAction(
  '[Appointment] Load Appointment Success',
  props<{ appointment: Appointment }>()
);

export const loadAppointmentFailure = createAction(
  '[Appointment] Load Appointment Failure',
  props<{ error: string }>()
);

export const bookAppointment = createAction(
  '[Appointment] Book Appointment',
  props<{ appointment: Partial<Appointment> }>()
);

export const bookAppointmentSuccess = createAction(
  '[Appointment] Book Appointment Success',
  props<{ appointment: Appointment }>()
);

export const bookAppointmentFailure = createAction(
  '[Appointment] Book Appointment Failure',
  props<{ error: string }>()
);

export const updateAppointment = createAction(
  '[Appointment] Update Appointment',
  props<{ id: number; appointment: Partial<Appointment> }>()
);

export const updateAppointmentSuccess = createAction(
  '[Appointment] Update Appointment Success',
  props<{ appointment: Appointment }>()
);

export const updateAppointmentFailure = createAction(
  '[Appointment] Update Appointment Failure',
  props<{ error: string }>()
);

export const deleteAppointment = createAction(
  '[Appointment] Delete Appointment',
  props<{ id: number }>()
);

export const deleteAppointmentSuccess = createAction(
  '[Appointment] Delete Appointment Success',
  props<{ id: number }>()
);

export const deleteAppointmentFailure = createAction(
  '[Appointment] Delete Appointment Failure',
  props<{ error: string }>()
);
