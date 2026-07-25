import { createReducer, on } from '@ngrx/store';
import { StatisticsActions } from './statistics.actions';

export interface StatisticsState {
  totalPatients: number;
  totalDoctors: number;
  totalAppointments: number;
  appointmentsByStatus: { [status: string]: any[] };
  todayAppointments: any[];
  upcomingAppointments: any[];
  loading: boolean;
  error: string | null;
}

const initialState: StatisticsState = {
  totalPatients: 0,
  totalDoctors: 0,
  totalAppointments: 0,
  appointmentsByStatus: {},
  todayAppointments: [],
  upcomingAppointments: [],
  loading: false,
  error: null
};

export const statisticsReducer = createReducer(
  initialState,
  
  // Total patients
  on(StatisticsActions.getTotalPatients, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(StatisticsActions.getTotalPatientsSuccess, (state, { count }) => ({
    ...state,
    loading: false,
    totalPatients: count
  })),
  on(StatisticsActions.getTotalPatientsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  // Total doctors
  on(StatisticsActions.getTotalDoctors, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(StatisticsActions.getTotalDoctorsSuccess, (state, { count }) => ({
    ...state,
    loading: false,
    totalDoctors: count
  })),
  on(StatisticsActions.getTotalDoctorsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  // Total appointments
  on(StatisticsActions.getTotalAppointments, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(StatisticsActions.getTotalAppointmentsSuccess, (state, { count }) => ({
    ...state,
    loading: false,
    totalAppointments: count
  })),
  on(StatisticsActions.getTotalAppointmentsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  // Appointments by status
  on(StatisticsActions.getAppointmentsByStatus, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(StatisticsActions.getAppointmentsByStatusSuccess, (state, { appointments, status }) => ({
    ...state,
    loading: false,
    appointmentsByStatus: {
      ...state.appointmentsByStatus,
      [status]: appointments
    }
  })),
  on(StatisticsActions.getAppointmentsByStatusFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  // Today's appointments
  on(StatisticsActions.getTodayAppointments, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(StatisticsActions.getTodayAppointmentsSuccess, (state, { appointments }) => ({
    ...state,
    loading: false,
    todayAppointments: appointments
  })),
  on(StatisticsActions.getTodayAppointmentsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  // Upcoming appointments
  on(StatisticsActions.getUpcomingAppointments, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(StatisticsActions.getUpcomingAppointmentsSuccess, (state, { appointments }) => ({
    ...state,
    loading: false,
    upcomingAppointments: appointments
  })),
  on(StatisticsActions.getUpcomingAppointmentsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  // Load all statistics
  on(StatisticsActions.loadAllStatistics, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(StatisticsActions.loadAllStatisticsSuccess, state => ({
    ...state,
    loading: false
  })),
  on(StatisticsActions.loadAllStatisticsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
