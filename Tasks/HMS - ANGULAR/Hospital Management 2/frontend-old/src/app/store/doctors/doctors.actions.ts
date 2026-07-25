import { createAction, props } from '@ngrx/store';
import { Doctor, DoctorDashboardStats, TimeSlot, DoctorAppointment } from '../../services/doctor.service';

// Load all doctors
export const loadDoctors = createAction('[Doctors] Load Doctors');
export const loadDoctorsSuccess = createAction(
  '[Doctors] Load Doctors Success',
  props<{ doctors: Doctor[] }>()
);
export const loadDoctorsFailure = createAction(
  '[Doctors] Load Doctors Failure',
  props<{ error: string }>()
);

// Load doctor by ID
export const loadDoctorById = createAction(
  '[Doctors] Load Doctor By ID',
  props<{ id: number }>()
);
export const loadDoctorByIdSuccess = createAction(
  '[Doctors] Load Doctor By ID Success',
  props<{ doctor: Doctor }>()
);
export const loadDoctorByIdFailure = createAction(
  '[Doctors] Load Doctor By ID Failure',
  props<{ error: string }>()
);

// Load doctor dashboard stats
export const loadDoctorDashboardStats = createAction(
  '[Doctors] Load Dashboard Stats',
  props<{ doctorId: number }>()
);
export const loadDoctorDashboardStatsSuccess = createAction(
  '[Doctors] Load Dashboard Stats Success',
  props<{ stats: DoctorDashboardStats }>()
);
export const loadDoctorDashboardStatsFailure = createAction(
  '[Doctors] Load Dashboard Stats Failure',
  props<{ error: string }>()
);

// Load available time slots
export const loadAvailableSlots = createAction(
  '[Doctors] Load Available Slots',
  props<{ doctorId: number; date: string }>()
);
export const loadAvailableSlotsSuccess = createAction(
  '[Doctors] Load Available Slots Success',
  props<{ slots: TimeSlot[] }>()
);
export const loadAvailableSlotsFailure = createAction(
  '[Doctors] Load Available Slots Failure',
  props<{ error: string }>()
);

// Load doctor appointments
export const loadDoctorAppointments = createAction(
  '[Doctors] Load Doctor Appointments',
  props<{ doctorId: number }>()
);
export const loadDoctorAppointmentsSuccess = createAction(
  '[Doctors] Load Doctor Appointments Success',
  props<{ appointments: DoctorAppointment[] }>()
);
export const loadDoctorAppointmentsFailure = createAction(
  '[Doctors] Load Doctor Appointments Failure',
  props<{ error: string }>()
);

// Update doctor
export const updateDoctor = createAction(
  '[Doctors] Update Doctor',
  props<{ id: number; data: any }>()
);
export const updateDoctorSuccess = createAction(
  '[Doctors] Update Doctor Success',
  props<{ doctor: Doctor }>()
);
export const updateDoctorFailure = createAction(
  '[Doctors] Update Doctor Failure',
  props<{ error: string }>()
);

// Delete doctor
export const deleteDoctor = createAction(
  '[Doctors] Delete Doctor',
  props<{ id: number }>()
);
export const deleteDoctorSuccess = createAction(
  '[Doctors] Delete Doctor Success',
  props<{ id: number }>()
);
export const deleteDoctorFailure = createAction(
  '[Doctors] Delete Doctor Failure',
  props<{ error: string }>()
);

// Generate slots
export const generateSlots = createAction(
  '[Doctors] Generate Slots',
  props<{ doctorId: number }>()
);
export const generateSlotsSuccess = createAction(
  '[Doctors] Generate Slots Success',
  props<{ message: string }>()
);
export const generateSlotsFailure = createAction(
  '[Doctors] Generate Slots Failure',
  props<{ error: string }>()
);
