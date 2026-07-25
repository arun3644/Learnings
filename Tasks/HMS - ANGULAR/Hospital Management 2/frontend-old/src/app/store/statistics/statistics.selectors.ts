import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StatisticsState } from './statistics.reducer';

const selectStatisticsState = createFeatureSelector<StatisticsState>('statistics');

// Count selectors
export const selectTotalPatients = createSelector(
  selectStatisticsState,
  state => state.totalPatients
);

export const selectTotalDoctors = createSelector(
  selectStatisticsState,
  state => state.totalDoctors
);

export const selectTotalAppointments = createSelector(
  selectStatisticsState,
  state => state.totalAppointments
);

// Appointments selectors
export const selectAppointmentsByStatus = (status: string) => createSelector(
  selectStatisticsState,
  state => state.appointmentsByStatus[status] || []
);

export const selectTodayAppointments = createSelector(
  selectStatisticsState,
  state => state.todayAppointments
);

export const selectUpcomingAppointments = createSelector(
  selectStatisticsState,
  state => state.upcomingAppointments
);

// All appointments by status
export const selectAllAppointmentsByStatus = createSelector(
  selectStatisticsState,
  state => state.appointmentsByStatus
);

// Scheduled appointments
export const selectScheduledAppointments = createSelector(
  selectStatisticsState,
  state => state.appointmentsByStatus['Scheduled'] || []
);

// Completed appointments
export const selectCompletedAppointments = createSelector(
  selectStatisticsState,
  state => state.appointmentsByStatus['Completed'] || []
);

// Cancelled appointments
export const selectCancelledAppointments = createSelector(
  selectStatisticsState,
  state => state.appointmentsByStatus['Cancelled'] || []
);

// Rescheduled appointments
export const selectRescheduledAppointments = createSelector(
  selectStatisticsState,
  state => state.appointmentsByStatus['Rescheduled'] || []
);

// Loading and error
export const selectStatisticsLoading = createSelector(
  selectStatisticsState,
  state => state.loading
);

export const selectStatisticsError = createSelector(
  selectStatisticsState,
  state => state.error
);

// Combined statistics for dashboard
export const selectDashboardStats = createSelector(
  selectTotalPatients,
  selectTotalDoctors,
  selectTotalAppointments,
  selectTodayAppointments,
  selectUpcomingAppointments,
  (totalPatients, totalDoctors, totalAppointments, todayAppointments, upcomingAppointments) => ({
    totalPatients,
    totalDoctors,
    totalAppointments,
    todayAppointmentsCount: todayAppointments.length,
    upcomingAppointmentsCount: upcomingAppointments.length,
    todayAppointments,
    upcomingAppointments
  })
);
