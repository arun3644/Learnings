import { User } from './user.model';

export interface Patient extends User {
  patientId: string;
  age: number;
  gender: string;
  phoneNumber: string;
  bloodGroup: string;
  address: string;
  status: string;
}
