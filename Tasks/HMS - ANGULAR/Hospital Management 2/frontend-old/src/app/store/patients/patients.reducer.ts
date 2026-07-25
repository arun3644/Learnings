import { createReducer, on } from '@ngrx/store';
import { PatientsActions } from './patients.actions';
import { Patient, PatientDashboardStats } from '../../services/patient.service';

export interface PatientsState {
  patients: Patient[];
  selectedPatient: Patient | null;
  dashboardStats: PatientDashboardStats | null;
  loading: boolean;
  error: string | null;
}

const initialState: PatientsState = {
  patients: [],
  selectedPatient: null,
  dashboardStats: null,
  loading: false,
  error: null
};

export const patientsReducer = createReducer(
  initialState,
  
  // Load all patients
  on(PatientsActions.loadPatients, state => ({ 
    ...state, 
    loading: true, 
    error: null 
  })),
  on(PatientsActions.loadPatientsSuccess, (state, { patients }) => ({ 
    ...state, 
    loading: false, 
    patients 
  })),
  on(PatientsActions.loadPatientsFailure, (state, { error }) => ({ 
    ...state, 
    loading: false, 
    error 
  })),
  
  // Load patient by ID
  on(PatientsActions.loadPatientById, state => ({ 
    ...state, 
    loading: true, 
    error: null 
  })),
  on(PatientsActions.loadPatientByIdSuccess, (state, { patient }) => ({ 
    ...state, 
    loading: false, 
    selectedPatient: patient 
  })),
  on(PatientsActions.loadPatientByIdFailure, (state, { error }) => ({ 
    ...state, 
    loading: false, 
    error 
  })),
  
  // Load patient dashboard stats
  on(PatientsActions.loadPatientDashboardStats, state => ({ 
    ...state, 
    loading: true, 
    error: null 
  })),
  on(PatientsActions.loadPatientDashboardStatsSuccess, (state, { stats }) => ({ 
    ...state, 
    loading: false, 
    dashboardStats: stats 
  })),
  on(PatientsActions.loadPatientDashboardStatsFailure, (state, { error }) => ({ 
    ...state, 
    loading: false, 
    error 
  })),
  
  // Update patient
  on(PatientsActions.updatePatient, state => ({ 
    ...state, 
    loading: true, 
    error: null 
  })),
  on(PatientsActions.updatePatientSuccess, (state, { patient }) => ({ 
    ...state, 
    loading: false,
    patients: state.patients.map(p => p.id === patient.id ? patient : p),
    selectedPatient: state.selectedPatient?.id === patient.id ? patient : state.selectedPatient
  })),
  on(PatientsActions.updatePatientFailure, (state, { error }) => ({ 
    ...state, 
    loading: false, 
    error 
  })),
  
  // Delete patient
  on(PatientsActions.deletePatient, state => ({ 
    ...state, 
    loading: true, 
    error: null 
  })),
  on(PatientsActions.deletePatientSuccess, (state, { id }) => ({ 
    ...state, 
    loading: false,
    patients: state.patients.filter(p => p.id !== id)
  })),
  on(PatientsActions.deletePatientFailure, (state, { error }) => ({ 
    ...state, 
    loading: false, 
    error 
  }))
);
