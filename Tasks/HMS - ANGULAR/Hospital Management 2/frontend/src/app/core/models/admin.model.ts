import { User } from './user.model';

export interface Admin extends User {
  adminId: string;
  department?: string;
  phoneNumber?: string;
}
