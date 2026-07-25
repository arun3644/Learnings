import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface CountResponse {
  success: boolean;
  count: number;
}

export interface AppointmentPatient {
  id: number;
  name: string;
  patientId: string;
}

export interface AppointmentDoctor {
  id: number;
  name: string;
  specialization: string;
}

export interface StatisticsAppointment {
  id: number;
  appointmentId: string;
  patient: AppointmentPatient;
  doctor: AppointmentDoctor;
  date: string;
  time: string;
  duration: number;
  reason: string;
  status: string;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class StatisticsService {
  private apiBase = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  // Get total patients count
  getTotalPatients(): Observable<CountResponse> {
    return this.http.get<CountResponse>(`${this.apiBase}/statistics/total-patients`);
  }

  // Get total doctors count
  getTotalDoctors(): Observable<CountResponse> {
    return this.http.get<CountResponse>(`${this.apiBase}/statistics/total-doctors`);
  }

  // Get total appointments count
  getTotalAppointments(): Observable<CountResponse> {
    return this.http.get<CountResponse>(`${this.apiBase}/statistics/total-appointments`);
  }

  // Get appointments by status
  getAppointmentsByStatus(status: string): Observable<StatisticsAppointment[]> {
    const params = new HttpParams().set('status', status);
    return this.http.get<StatisticsAppointment[]>(
      `${this.apiBase}/statistics/appointments-by-status`,
      { params }
    );
  }

  // Get today's appointments
  getTodayAppointments(): Observable<StatisticsAppointment[]> {
    return this.http.get<StatisticsAppointment[]>(`${this.apiBase}/statistics/today-appointments`);
  }

  // Get upcoming appointments
  getUpcomingAppointments(): Observable<StatisticsAppointment[]> {
    return this.http.get<StatisticsAppointment[]>(`${this.apiBase}/statistics/upcoming-appointments`);
  }
}
