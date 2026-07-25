import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ApiService } from '../../services/api.service';
import { PatientsActions } from '../../store/patients/patients.actions';
import { selectAllPatients, selectPatientsLoading } from '../../store/patients/patients.selectors';
import { ModalComponent } from '../modal/modal.component';
import { FormComponent } from '../form/form.component';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent, FormComponent],
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  meta: any = null;
  patients$ = this.store.select(selectAllPatients);
  loading$ = this.store.select(selectPatientsLoading);
  
  showAddModal = false;
  selectedPatient: any = null;
  searchQuery = '';
  genderFilter = '';
  conditionFilter = '';

  constructor(
    private store: Store, 
    private api: ApiService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.api.getMetadata<any>('patients').subscribe(m => this.meta = m);
    this.store.dispatch(PatientsActions.loadPatients());
  }

  filterPatients(patients: any[]): any[] {
    return patients.filter(p => {
      const q = this.searchQuery.toLowerCase();
      const matchesSearch = !q ||
        p.name?.toLowerCase().includes(q) ||
        p.patientId?.toLowerCase().includes(q) ||
        p.condition?.toLowerCase().includes(q) ||
        p.phoneNumber?.toLowerCase().includes(q);
      const matchesGender = !this.genderFilter || p.gender === this.genderFilter;
      const matchesCondition = !this.conditionFilter || p.condition?.toLowerCase().includes(this.conditionFilter.toLowerCase());
      return matchesSearch && matchesGender && matchesCondition;
    });
  }

  handleAction(action: any) {
    switch(action.key) {
      case 'add':
        this.showAddModal = true;
        break;
      case 'export':
        this.toastService.info('Export functionality coming soon');
        break;
      default:
        console.log('Unknown action:', action.key);
    }
  }

  handleFormSubmit(formData: any) {
    const payload = {
      username: formData.username,
      password: formData.password,
      name: formData.name,
      email: formData.email,
      age: Number(formData.age) || 0,
      gender: formData.gender || 'Male',
      phoneNumber: formData.phone || formData.phoneNumber || '',
      bloodGroup: formData.bloodGroup || 'O+',
      condition: formData.condition || 'Stable',
      address: formData.address || 'N/A'
    };

    this.api.http.post<any>(`${this.api.getApiBase()}/auth/register/patient`, payload).subscribe({
      next: (res) => {
        if (res?.success) {
          this.toastService.success('Patient registered successfully');
          this.showAddModal = false;
          this.store.dispatch(PatientsActions.loadPatients());
        } else {
          this.toastService.error(res?.message || 'Failed to register patient');
        }
      },
      error: (err) => {
        const msg = err?.error?.message || '';
        this.toastService.error(msg || 'Failed to register patient. Please try again.');
      }
    });
  }
  
  closeModal() {
    this.showAddModal = false;
  }

  selectPatient(patient: any) {
    this.selectedPatient = patient;
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  getStatusClass(status: string): string {
    const statusMap: any = {
      'Active': 's-active',
      'Inactive': 's-done',
      'Review': 's-pending'
    };
    return statusMap[status] || 's-active';
  }
}
