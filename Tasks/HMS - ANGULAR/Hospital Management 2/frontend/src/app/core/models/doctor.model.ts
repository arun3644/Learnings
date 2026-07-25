import { User } from './user.model';

export interface Doctor extends User {
  doctorId?: string;
  firstName: string;
  lastName: string;
  phone: string;
  specialization: string;
  experience: number;
  yearsOfExperience?: number;
  phoneNumber?: string;
  licenseNumber: string;
}
