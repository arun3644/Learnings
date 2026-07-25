import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Patient, PatientDashboardStats } from '../../services/patient.service';

export const PatientsActions = createActionGroup({
  source: 'Patients',
  events: {
    // Load all patients
    'Load Patients': emptyProps(),
    'Load Patients Success': props<{ patients: Patient[] }>(),
    'Load Patients Failure': props<{ error: string }>(),
    
    // Load patient by ID
    'Load Patient By Id': props<{ id: number }>(),
    'Load Patient By Id Success': props<{ patient: Patient }>(),
    'Load Patient By Id Failure': props<{ error: string }>(),
    
    // Load patient dashboard stats
    'Load Patient Dashboard Stats': props<{ patientId: number }>(),
    'Load Patient Dashboard Stats Success': props<{ stats: PatientDashboardStats }>(),
    'Load Patient Dashboard Stats Failure': props<{ error: string }>(),
    
    // Update patient
    'Update Patient': props<{ id: number; data: any }>(),
    'Update Patient Success': props<{ patient: Patient }>(),
    'Update Patient Failure': props<{ error: string }>(),
    
    // Delete patient
    'Delete Patient': props<{ id: number }>(),
    'Delete Patient Success': props<{ id: number }>(),
    'Delete Patient Failure': props<{ error: string }>(),
  }
});
