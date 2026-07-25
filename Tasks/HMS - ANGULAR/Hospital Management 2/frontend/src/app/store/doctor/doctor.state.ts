import { Doctor } from '../../core/models/doctor.model';

export interface DoctorState {
  doctors: Doctor[];
  selectedDoctor: Doctor | null;
  loading: boolean;
  error: string | null;
}

export const initialDoctorState: DoctorState = {
  doctors: [],
  selectedDoctor: null,
  loading: false,
  error: null
};
