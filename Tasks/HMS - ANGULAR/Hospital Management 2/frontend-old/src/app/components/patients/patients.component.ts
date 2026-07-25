import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
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

  constructor(
    private store: Store, 
    private api: ApiService,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.api.getMetadata<any>('patients').subscribe(m => this.meta = m);
    this.store.dispatch(PatientsActions.loadPatients());
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
    // Build patient registration credentials
    const credentials = {
      username: formData.username || formData.email.split('@')[0],
      password: formData.password || 'defaultPassword123',
      name: formData.name,
      email: formData.email,
      age: formData.age,
      gender: formData.gender,
      phoneNumber: formData.phoneNumber,
      bloodGroup: formData.bloodGroup || 'O+',
      condition: 'Stable',
      address: formData.address
    };

    // Register patient using AuthService
    this.authService.register('Patient', credentials).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.toastService.success('Patient registered successfully');
          this.showAddModal = false;
          this.store.dispatch(PatientsActions.loadPatients());
        } else {
          this.toastService.error(response.message || 'Failed to register patient');
        }
      },
      error: (error: any) => {
        this.toastService.error('Failed to register patient');
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
