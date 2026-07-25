import { environment } from '../../../environments/environment';

const BASE_URL = environment.apiUrl;

export const API_ENDPOINTS = {
  AUTH: `${BASE_URL}/api/auth`,
  ADMINS: `${BASE_URL}/api/admins`,
  DOCTORS: `${BASE_URL}/api/doctors`,
  PATIENTS: `${BASE_URL}/api/patients`,
  NURSES: `${BASE_URL}/api/nurses`,
  APPOINTMENTS: `${BASE_URL}/apiointments`,
  STATISTICS: `${BASE_URL}/api/statistics`
};
