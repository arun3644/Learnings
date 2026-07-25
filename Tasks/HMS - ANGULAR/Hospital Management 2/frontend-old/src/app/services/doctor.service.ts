import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface Doctor {
  id: number;
  doctorId: string;
  username: string;
  name: string;
  email: string;
  specialization: string;
  yearsOfExperience: number;
  phoneNumber: string;
  licenseNumber: string;
  createdAt: string;
  error?: string | null;
  message?: string | null;
}

export interface TimeSlot {
  id: number;
  doctorId: number;
  date: string;
  time: string;
  isAvailable: boolean;
}

export interface DoctorAppointment {
  appointmentId: string;
  patientName: string;
  patientId: string;
  date: string;
  time: string;
  status: string;
  reason: string;
}

export interface DoctorDashboardStats {
  success: boolean;
  stats: {
    totalAppointments: number;
    todayAppointments: number;
    upcomingAppointments: number;
    completedAppointments: number;
    cancelledAppointments: number;
    totalPatients: number;
    availableSlots: number;
  };
  todaySchedule: Array<{
    id: number;
    appointmentId: string;
    patientName: string;
    patientId: number;
    time: string;
    duration: number;
    status: string;
    reason: string;
  }>;
  upcomingAppointments: Array<{
    id: number;
    appointmentId: string;
    patientName: string;
    patientId: number;
    appointmentDate: string;
    time: string;
    status: string;
  }>;
  error?: string | null;
  message?: string | null;
}

export interface UpdateDoctorRequest {
  name: string;
  email: string;
  specialization: string;
  yearsOfExperience: number;
  phoneNumber: string;
}

@Injectable({ providedIn: 'root' })
export class DoctorService {
  private apiBase = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  // Get all doctors
  getAllDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.apiBase}/doctors`);
  }

  // Get doctor by ID
  getDoctorById(id: number): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.apiBase}/doctors/${id}`);
  }

  // Update doctor
  updateDoctor(id: number, data: UpdateDoctorRequest): Observable<Doctor> {
    return this.http.put<Doctor>(`${this.apiBase}/doctors/${id}`, data);
  }

  // Delete doctor
  deleteDoctor(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiBase}/doctors/${id}`);
  }

  // Get doctor available time slots
  getAvailableSlots(doctorId: number, date: string): Observable<TimeSlot[]> {
    const params = new HttpParams().set('date', date);
    return this.http.get<TimeSlot[]>(`${this.apiBase}/doctors/${doctorId}/available-slots`, { params });
  }

  // Get doctor booked slots
  getBookedSlots(doctorId: number, date: string): Observable<TimeSlot[]> {
    const params = new HttpParams().set('date', date);
    return this.http.get<TimeSlot[]>(`${this.apiBase}/doctors/${doctorId}/booked-slots`, { params });
  }

  // Get doctor appointments
  getDoctorAppointments(doctorId: number): Observable<DoctorAppointment[]> {
    return this.http.get<DoctorAppointment[]>(`${this.apiBase}/doctors/${doctorId}/appointments`);
  }

  // Get all doctor slots
  getAllSlots(doctorId: number): Observable<TimeSlot[]> {
    return this.http.get<TimeSlot[]>(`${this.apiBase}/doctors/${doctorId}/all-slots`);
  }

  // Generate slots for doctor
  generateSlots(doctorId: number): Observable<{ message: string }> {
    return this.http.get<{ message: string }>(`${this.apiBase}/doctors/${doctorId}/generate-slots`);
  }

  // Get doctor dashboard stats
  getDoctorDashboardStats(doctorId: number): Observable<DoctorDashboardStats> {
    return this.http.get<DoctorDashboardStats>(`${this.apiBase}/doctors/${doctorId}/dashboard-stats`);
  }
}
