import { Nurse } from '../../core/models/nurse.model';

export interface NurseState {
  nurses: Nurse[];
  selectedNurse: Nurse | null;
  loading: boolean;
  error: string | null;
}

export const initialNurseState: NurseState = {
  nurses: [],
  selectedNurse: null,
  loading: false,
  error: null
};
