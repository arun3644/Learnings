import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppointmentState } from './appointment.state';

export const selectAppointmentState = createFeatureSelector<AppointmentState>('appointment');

export const selectAllAppointments = createSelector(
  selectAppointmentState,
  (state) => state.appointments
);

export const selectSelectedAppointment = createSelector(
  selectAppointmentState,
  (state) => state.selectedAppointment
);

export const selectAppointmentLoading = createSelector(
  selectAppointmentState,
  (state) => state.loading
);

export const selectAppointmentError = createSelector(
  selectAppointmentState,
  (state) => state.error
);
