import { createActionGroup, emptyProps, props } from '@ngrx/store';

export interface BookAppointmentRequest {
  patientId: number;
  doctorId: number;
  date: string;
  time: string;
  duration: number;
  reason: string;
  notes?: string;
}

export interface UpdateAppointmentRequest {
  date?: string;
  time?: string;
  doctorId?: number;
  status?: string;
  notes?: string;
}

export const AppointmentsActions = createActionGroup({
  source: 'Appointments',
  events: {
    // Load all appointments
    'Load Appointments':         emptyProps(),
    'Load Appointments Success': props<{ appointments: any[] }>(),
    'Load Appointments Failure': props<{ error: string }>(),
    
    // Get appointment by ID
    'Get Appointment':           props<{ id: number }>(),
    'Get Appointment Success':   props<{ appointment: any }>(),
    'Get Appointment Failure':   props<{ error: string }>(),
    
    // Book appointment
    'Book Appointment':          props<{ data: BookAppointmentRequest }>(),
    'Book Appointment Success':  props<{ appointment: any; message: string }>(),
    'Book Appointment Failure':  props<{ error: string }>(),
    
    // Update appointment
    'Update Appointment':        props<{ id: number; data: UpdateAppointmentRequest }>(),
    'Update Appointment Success': props<{ appointment: any; message: string }>(),
    'Update Appointment Failure': props<{ error: string }>(),
    
    // Delete appointment
    'Delete Appointment':        props<{ id: number }>(),
    'Delete Appointment Success': props<{ id: number; message: string }>(),
    'Delete Appointment Failure': props<{ error: string }>(),
  }
});
