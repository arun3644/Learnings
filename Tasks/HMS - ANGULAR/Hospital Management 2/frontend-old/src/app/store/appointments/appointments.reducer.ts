import { createReducer, on } from '@ngrx/store';
import { AppointmentsActions } from './appointments.actions';

export interface AppointmentsState { 
  appointments: any[];
  selectedAppointment: any | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: AppointmentsState = { 
  appointments: [], 
  selectedAppointment: null,
  loading: false, 
  error: null,
  successMessage: null
};

export const appointmentsReducer = createReducer(
  initialState,
  
  // Load appointments
  on(AppointmentsActions.loadAppointments, state => ({
     ...state, loading: true, error: null, successMessage: null
  })),
  on(AppointmentsActions.loadAppointmentsSuccess, (state, { appointments }) => ({
     ...state, loading: false, appointments
  })),
  on(AppointmentsActions.loadAppointmentsFailure, (state, { error }) => ({ 
    ...state, loading: false, error
  })),
  
  // Get appointment by ID
  on(AppointmentsActions.getAppointment, state => ({
    ...state, loading: true, error: null
  })),
  on(AppointmentsActions.getAppointmentSuccess, (state, { appointment }) => ({
    ...state, loading: false, selectedAppointment: appointment
  })),
  on(AppointmentsActions.getAppointmentFailure, (state, { error }) => ({
    ...state, loading: false, error
  })),
  
  // Book appointment
  on(AppointmentsActions.bookAppointment, state => ({
    ...state, loading: true, error: null, successMessage: null
  })),
  on(AppointmentsActions.bookAppointmentSuccess, (state, { appointment, message }) => ({
    ...state, 
    loading: false, 
    appointments: [...state.appointments, appointment],
    successMessage: message
  })),
  on(AppointmentsActions.bookAppointmentFailure, (state, { error }) => ({
    ...state, loading: false, error
  })),
  
  // Update appointment
  on(AppointmentsActions.updateAppointment, state => ({
    ...state, loading: true, error: null, successMessage: null
  })),
  on(AppointmentsActions.updateAppointmentSuccess, (state, { appointment, message }) => ({
    ...state,
    loading: false,
    appointments: state.appointments.map(a => a.id === appointment.id ? appointment : a),
    selectedAppointment: appointment,
    successMessage: message
  })),
  on(AppointmentsActions.updateAppointmentFailure, (state, { error }) => ({
    ...state, loading: false, error
  })),
  
  // Delete appointment
  on(AppointmentsActions.deleteAppointment, state => ({
    ...state, loading: true, error: null, successMessage: null
  })),
  on(AppointmentsActions.deleteAppointmentSuccess, (state, { id, message }) => ({
    ...state,
    loading: false,
    appointments: state.appointments.filter(a => a.id !== id),
    successMessage: message
  })),
  on(AppointmentsActions.deleteAppointmentFailure, (state, { error }) => ({
    ...state, loading: false, error
  }))
);