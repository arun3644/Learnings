import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './staff.component.html'
})
export class StaffComponent implements OnInit {
  staff: any[] = [];
  loading = false;
  searchQuery = '';
  shiftFilter = '';

  constructor(private api: ApiService, private toastService: ToastService) {}

  ngOnInit() {
    this.loadStaff();
  }

  loadStaff() {
    this.loading = true;
    this.api.getAll<any[]>('nurses').subscribe({
      next: (data) => {
        this.staff = data || [];
        this.loading = false;
      },
      error: () => {
        this.toastService.error('Failed to load staff');
        this.loading = false;
      }
    });
  }

  filterStaff(): any[] {
    return this.staff.filter(s => {
      const q = this.searchQuery.toLowerCase();
      const matchesSearch = !q ||
        s.name?.toLowerCase().includes(q) ||
        s.nurseId?.toLowerCase().includes(q) ||
        s.department?.toLowerCase().includes(q) ||
        s.email?.toLowerCase().includes(q);
      const matchesShift = !this.shiftFilter || s.shift === this.shiftFilter;
      return matchesSearch && matchesShift;
    });
  }

  getInitials(name: string): string {
    return (name || '').split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
  }
}
