import { createReducer, on } from '@ngrx/store';
import * as DoctorsActions from './doctors.actions';
import { Doctor, DoctorDashboardStats, TimeSlot, DoctorAppointment } from '../../services/doctor.service';

export interface DoctorsState {
  doctors: Doctor[];
  selectedDoctor: Doctor | null;
  dashboardStats: DoctorDashboardStats | null;
  availableSlots: TimeSlot[];
  appointments: DoctorAppointment[];
  loading: boolean;
  error: string | null;
}

const initialState: DoctorsState = {
  doctors: [],
  selectedDoctor: null,
  dashboardStats: null,
  availableSlots: [],
  appointments: [],
  loading: false,
  error: null
};

export const doctorsReducer = createReducer(
  initialState,

  // Load all doctors
  on(DoctorsActions.loadDoctors, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(DoctorsActions.loadDoctorsSuccess, (state, { doctors }) => ({
    ...state,
    doctors,
    loading: false
  })),
  on(DoctorsActions.loadDoctorsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Load doctor by ID
  on(DoctorsActions.loadDoctorById, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(DoctorsActions.loadDoctorByIdSuccess, (state, { doctor }) => ({
    ...state,
    selectedDoctor: doctor,
    loading: false
  })),
  on(DoctorsActions.loadDoctorByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Load dashboard stats
  on(DoctorsActions.loadDoctorDashboardStats, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(DoctorsActions.loadDoctorDashboardStatsSuccess, (state, { stats }) => ({
    ...state,
    dashboardStats: stats,
    loading: false
  })),
  on(DoctorsActions.loadDoctorDashboardStatsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Load available slots
  on(DoctorsActions.loadAvailableSlots, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(DoctorsActions.loadAvailableSlotsSuccess, (state, { slots }) => ({
    ...state,
    availableSlots: slots,
    loading: false
  })),
  on(DoctorsActions.loadAvailableSlotsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Load doctor appointments
  on(DoctorsActions.loadDoctorAppointments, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(DoctorsActions.loadDoctorAppointmentsSuccess, (state, { appointments }) => ({
    ...state,
    appointments,
    loading: false
  })),
  on(DoctorsActions.loadDoctorAppointmentsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Update doctor
  on(DoctorsActions.updateDoctor, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(DoctorsActions.updateDoctorSuccess, (state, { doctor }) => ({
    ...state,
    doctors: state.doctors.map(d => d.id === doctor.id ? doctor : d),
    selectedDoctor: state.selectedDoctor?.id === doctor.id ? doctor : state.selectedDoctor,
    loading: false
  })),
  on(DoctorsActions.updateDoctorFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Delete doctor
  on(DoctorsActions.deleteDoctor, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(DoctorsActions.deleteDoctorSuccess, (state, { id }) => ({
    ...state,
    doctors: state.doctors.filter(d => d.id !== id),
    loading: false
  })),
  on(DoctorsActions.deleteDoctorFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Generate slots
  on(DoctorsActions.generateSlots, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(DoctorsActions.generateSlotsSuccess, (state) => ({
    ...state,
    loading: false
  })),
  on(DoctorsActions.generateSlotsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
