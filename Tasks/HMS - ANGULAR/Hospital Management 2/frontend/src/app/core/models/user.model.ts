export interface User {
  id: number;
  username?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  role: 'ADMIN' | 'DOCTOR' | 'PATIENT' | 'NURSE' | string;
  token?: string;
  createdAt?: Date;
}
