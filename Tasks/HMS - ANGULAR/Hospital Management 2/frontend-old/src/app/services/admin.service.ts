import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface Admin {
  id: number;
  adminId: string;
  username: string;
  name: string;
  email: string;
  department: string;
  phoneNumber: string;
  createdAt: string;
  error?: string | null;
  message?: string | null;
}

export interface AdminDashboardStats {
  success: boolean;
  stats: {
    totalPatients: number;
    totalDoctors: number;
    totalStaff: number;
    appointments: number;
    totalNurse: number;
    todayAppointments: number;
  };
  recentActivity: Array<{
    id: number;
    type: string;
    message: string;
    timestamp: string;
    user: string;
  }>;
  upcomingAppointments: Array<{
    id: number;
    patientName: string;
    doctorName: string;
    date: string;
    time: string;
    status: string;
  }>;
  criticalPatients: Array<{
    id: number;
    name: string;
    condition: string;
    ward: string;
  }>;
  error?: string | null;
  message?: string | null;
}

export interface UpdateAdminRequest {
  name: string;
  email: string;
  department: string;
  phoneNumber: string;
}

@Injectable({ providedIn: 'root' })
export class AdminService {
  private apiBase = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  // Get all admins
  getAllAdmins(): Observable<Admin[]> {
    return this.http.get<Admin[]>(`${this.apiBase}/admins`);
  }

  // Get admin by ID
  getAdminById(id: number): Observable<Admin> {
    return this.http.get<Admin>(`${this.apiBase}/admins/${id}`);
  }

  // Update admin
  updateAdmin(id: number, data: UpdateAdminRequest): Observable<Admin> {
    return this.http.put<Admin>(`${this.apiBase}/admins/${id}`, data);
  }

  // Delete admin
  deleteAdmin(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiBase}/admins/${id}`);
  }

  // Get admin dashboard stats
  getAdminDashboardStats(): Observable<AdminDashboardStats> {
    return this.http.get<AdminDashboardStats>(`${this.apiBase}/admins/dashboard-stats`);
  }
}
