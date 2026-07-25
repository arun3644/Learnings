import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface Nurse {
  id: number;
  nurseId: string;
  username: string;
  name: string;
  email: string;
  department: string;
  yearsOfExperience: number;
  phoneNumber: string;
  shift: string;
  createdAt: string;
  error?: string | null;
  message?: string | null;
}

export interface UpdateNurseRequest {
  name: string;
  email: string;
  department: string;
  shift: string;
  phoneNumber: string;
}

@Injectable({ providedIn: 'root' })
export class NurseService {
  private apiBase = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  // Get all nurses
  getAllNurses(): Observable<Nurse[]> {
    return this.http.get<Nurse[]>(`${this.apiBase}/nurses`);
  }

  // Get nurse by ID
  getNurseById(id: number): Observable<Nurse> {
    return this.http.get<Nurse>(`${this.apiBase}/nurses/${id}`);
  }

  // Update nurse
  updateNurse(id: number, data: UpdateNurseRequest): Observable<Nurse> {
    return this.http.put<Nurse>(`${this.apiBase}/nurses/${id}`, data);
  }

  // Delete nurse
  deleteNurse(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiBase}/nurses/${id}`);
  }
}
