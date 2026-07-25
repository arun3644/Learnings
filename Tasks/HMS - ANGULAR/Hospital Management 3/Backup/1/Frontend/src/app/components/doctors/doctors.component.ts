import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {
  doctors: any[] = [];
  loading = false;
  searchQuery = '';
  specializationFilter = '';
  specializations: string[] = [];

  constructor(private api: ApiService, private toastService: ToastService) {}

  ngOnInit() {
    this.loadDoctors();
  }

  loadDoctors() {
    this.loading = true;
    this.api.getAll<any[]>('doctors').subscribe({
      next: (data) => {
        this.doctors = data || [];
        this.specializations = [...new Set(this.doctors.map(d => d.specialization).filter(Boolean))];
        this.loading = false;
      },
      error: () => {
        this.toastService.error('Failed to load doctors');
        this.loading = false;
      }
    });
  }

  filterDoctors(): any[] {
    return this.doctors.filter(d => {
      const q = this.searchQuery.toLowerCase();
      const matchesSearch = !q ||
        d.name?.toLowerCase().includes(q) ||
        d.doctorId?.toLowerCase().includes(q) ||
        d.specialization?.toLowerCase().includes(q) ||
        d.email?.toLowerCase().includes(q);
      const matchesSpec = !this.specializationFilter || d.specialization === this.specializationFilter;
      return matchesSearch && matchesSpec;
    });
  }

  getInitials(name: string): string {
    return (name || '').split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
  }
}
