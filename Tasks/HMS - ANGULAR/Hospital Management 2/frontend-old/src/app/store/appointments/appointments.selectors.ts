import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppointmentsState } from './appointments.reducer';

const selectAppointmentsState = createFeatureSelector<AppointmentsState>('appointments');

export const selectAllAppointments = createSelector(
  selectAppointmentsState, 
  s => s.appointments
);

export const selectSelectedAppointment = createSelector(
  selectAppointmentsState, 
  s => s.selectedAppointment
);

export const selectAppointmentsLoading = createSelector(
  selectAppointmentsState, 
  s => s.loading
);

export const selectAppointmentsError = createSelector(
  selectAppointmentsState, 
  s => s.error
);

export const selectAppointmentsSuccessMessage = createSelector(
  selectAppointmentsState, 
  s => s.successMessage
);

export const selectAppointmentById = (id: number) => createSelector(
  selectAllAppointments,
  appointments => appointments.find(a => a.id === id)
);

export const selectAppointmentsByStatus = (status: string) => createSelector(
  selectAllAppointments,
  appointments => appointments.filter(a => a.status === status)
);

export const selectAppointmentsByPatientId = (patientId: number) => createSelector(
  selectAllAppointments,
  appointments => appointments.filter(a => a.patient.id === patientId)
);

export const selectAppointmentsByDoctorId = (doctorId: number) => createSelector(
  selectAllAppointments,
  appointments => appointments.filter(a => a.doctor.id === doctorId)
);
