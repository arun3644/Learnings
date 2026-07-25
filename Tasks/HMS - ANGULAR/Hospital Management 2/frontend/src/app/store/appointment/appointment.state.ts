import { Appointment } from '../../core/models/appointment.model';

export interface AppointmentState {
  appointments: Appointment[];
  selectedAppointment: Appointment | null;
  loading: boolean;
  error: string | null;
}

export const initialAppointmentState: AppointmentState = {
  appointments: [],
  selectedAppointment: null,
  loading: false,
  error: null
};
