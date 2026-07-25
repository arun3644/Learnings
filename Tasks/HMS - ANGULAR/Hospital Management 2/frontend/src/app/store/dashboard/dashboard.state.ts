export interface DashboardStats {
  totalPatients?: number;
  totalDoctors?: number;
  totalAppointments?: number;
  todayAppointments?: number;
  upcomingAppointments?: number;
  completedAppointments?: number;
  [key: string]: any;
}

export interface DashboardState {
  stats: DashboardStats | null;
  loading: boolean;
  error: string | null;
}

export const initialDashboardState: DashboardState = {
  stats: null,
  loading: false,
  error: null
};
