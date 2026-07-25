import { Patient } from '../../core/models/patient.model';

export interface PatientState {
  patients: Patient[];
  selectedPatient: Patient | null;
  loading: boolean;
  error: string | null;
}

export const initialPatientState: PatientState = {
  patients: [],
  selectedPatient: null,
  loading: false,
  error: null
};
