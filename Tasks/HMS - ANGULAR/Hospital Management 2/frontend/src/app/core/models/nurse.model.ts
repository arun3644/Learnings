import { User } from './user.model';

export interface Nurse extends User {
  nurseId: string;
  department: string;
  yearsOfExperience: number;
  phoneNumber: string;
  shift: string;
}
