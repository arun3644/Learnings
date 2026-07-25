import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface Patient {
  id: number;
  patientId: string;
  username: string;
  name: string;
  email: string;
  age: number;
  gender: string;
  phoneNumber: string;
  bloodGroup: string;
  address: string;
  status: string;
  condition?: string;
  createdAt: string;
  error?: string | null;
  message?: string | null;
}

export interface PatientDashboardStats {
  success: boolean;
  stats: {
    totalAppointments: number;
    upcomingAppointments: number;
    completedAppointments: number;
    cancelledAppointments: number;
    nextAppointmentDate: string;
    lastVisitDate: string;
  };
  upcomingAppointments: Array<{
    id: number;
    appointmentId: string;
    doctorName: string;
    doctorId: number;
    specialization: string;
    appointmentDate: string;
    time: string;
    status: string;
  }>;
  recentAppointments: Array<{
    id: number;
    appointmentId: string;
    doctorName: string;
    doctorId: number;
    specialization: string;
    appointmentDate: string;
    time: string;
    status: string;
  }>;
  error?: string | null;
  message?: string | null;
}

export interface UpdatePatientRequest {
  name: string;
  email: string;
  age: number;
  gender: string;
  phoneNumber: string;
  bloodGroup: string;
  address: string;
  status: string;
}

@Injectable({ providedIn: 'root' })
export class PatientService {
  private apiBase = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  // Get all patients
  getAllPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.apiBase}/patients`);
  }

  // Get patient by ID
  getPatientById(id: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiBase}/patients/${id}`);
  }

  // Update patient
  updatePatient(id: number, data: UpdatePatientRequest): Observable<Patient> {
    return this.http.put<Patient>(`${this.apiBase}/patients/${id}`, data);
  }

  // Delete patient
  deletePatient(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiBase}/patients/${id}`);
  }

  // Get patient dashboard stats
  getPatientDashboardStats(patientId: number): Observable<PatientDashboardStats> {
    return this.http.get<PatientDashboardStats>(`${this.apiBase}/patients/${patientId}/dashboard-stats`);
  }
}
