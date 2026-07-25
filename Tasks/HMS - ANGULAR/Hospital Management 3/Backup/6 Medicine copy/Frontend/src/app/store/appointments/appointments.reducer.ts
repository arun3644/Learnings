import { createReducer, on } from '@ngrx/store';
import { AppointmentsActions } from './appointments.actions';

export interface AppointmentsState { 
  appointments: any[]; loading: boolean; error: string | null; 
}

const initialState: AppointmentsState = { appointments: [], loading: false, error: null };

export const appointmentsReducer = createReducer(
  initialState,
  on(AppointmentsActions.loadAppointments, state => ({
     ...state, loading: true, error: null 
  })),
  on(AppointmentsActions.loadAppointmentsSuccess, (state, { appointments }) =>({
     ...state, loading: false, appointments
  })),
  on(AppointmentsActions.loadAppointmentsFailure, (state, { error }) => ({ 
    ...state, loading: false, error
  })),
  on(AppointmentsActions.addAppointment, (state, { appointment }) => ({ 
    ...state, appointments: [...state.appointments, appointment] 
  })),
  on(AppointmentsActions.updateAppointment, (state, { appointment }) => ({ 
    ...state, appointments: state.appointments.map(a => a.id === appointment.id ? appointment : a) 
  })),
  on(AppointmentsActions.deleteAppointment, (state, { id }) => ({ 
    ...state, appointments: state.appointments.filter(a => a.id !== id) 
  }))
);