import { createReducer, on } from '@ngrx/store';
import { initialAppointmentState } from './appointment.state';
import * as AppointmentActions from './appointment.actions';

export const appointmentReducer = createReducer(
  initialAppointmentState,
  on(AppointmentActions.loadAppointments, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(AppointmentActions.loadAppointmentsSuccess, (state, { appointments }) => ({
    ...state,
    appointments,
    loading: false,
    error: null
  })),
  on(AppointmentActions.loadAppointmentsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(AppointmentActions.loadAppointmentSuccess, (state, { appointment }) => ({
    ...state,
    selectedAppointment: appointment,
    loading: false,
    error: null
  })),
  on(AppointmentActions.bookAppointmentSuccess, (state, { appointment }) => ({
    ...state,
    appointments: [...state.appointments, appointment],
    loading: false,
    error: null
  })),
  on(AppointmentActions.updateAppointmentSuccess, (state, { appointment }) => ({
    ...state,
    selectedAppointment: appointment,
    appointments: state.appointments.map(a => a.id === appointment.id ? appointment : a),
    loading: false,
    error: null
  })),
  on(AppointmentActions.deleteAppointmentSuccess, (state, { id }) => ({
    ...state,
    appointments: state.appointments.filter(a => a.id !== id),
    loading: false,
    error: null
  }))
);
