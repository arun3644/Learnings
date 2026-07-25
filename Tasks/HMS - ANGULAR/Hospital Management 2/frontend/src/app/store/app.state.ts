import { AuthState } from './auth/auth.state';
import { DoctorState } from './doctor/doctor.state';
import { PatientState } from './patient/patient.state';
import { AppointmentState } from './appointment/appointment.state';
import { NurseState } from './nurse/nurse.state';
import { AdminState } from './admin/admin.state';
import { TimeSlotState } from './time-slot/time-slot.state';
import { DashboardState } from './dashboard/dashboard.state';

export interface AppState {
  auth: AuthState;
  doctor: DoctorState;
  patient: PatientState;
  appointment: AppointmentState;
  nurse: NurseState;
  admin: AdminState;
  timeSlot: TimeSlotState;
  dashboard: DashboardState;
}
