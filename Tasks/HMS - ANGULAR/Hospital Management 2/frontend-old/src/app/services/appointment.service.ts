import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

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

export interface Appointment {
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

export interface BookAppointmentRequest {
  patientId: number;
  doctorId: number;
  date: string;
  time: string;
  duration: number;
  reason: string;
  notes?: string;
}

export interface UpdateAppointmentRequest {
  date?: string;
  time?: string;
  doctorId?: number;
  status?: string;
  notes?: string;
}

export interface AppointmentResponse {
  success: boolean;
  message: string;
  appointment: Appointment | null;
}

@Injectable({ providedIn: 'root' })
export class AppointmentService {
  private apiBase = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  // Get all appointments
  getAllAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiBase}/appointments`);
  }

  // Get appointment by ID
  getAppointmentById(id: number): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.apiBase}/appointments/${id}`);
  }

  // Book appointment
  bookAppointment(data: BookAppointmentRequest): Observable<AppointmentResponse> {
    return this.http.post<AppointmentResponse>(`${this.apiBase}/appointments`, data);
  }

  // Update appointment
  updateAppointment(id: number, data: UpdateAppointmentRequest): Observable<AppointmentResponse> {
    return this.http.put<AppointmentResponse>(`${this.apiBase}/appointments/${id}`, data);
  }

  // Delete appointment
  deleteAppointment(id: number): Observable<AppointmentResponse> {
    return this.http.delete<AppointmentResponse>(`${this.apiBase}/appointments/${id}`);
  }
}
