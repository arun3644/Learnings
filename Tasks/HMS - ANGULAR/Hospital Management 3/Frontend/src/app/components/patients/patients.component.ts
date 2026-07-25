import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ApiService } from '../../services/api.service';
import { PatientsActions } from '../../store/patients/patients.actions';
import { selectAllPatients, selectPatientsLoading, selectMetaData, selectPageHeader } from '../../store/patients/patients.selectors';
import { ModalComponent } from '../modal/modal.component';
import { FormComponent } from '../form/form.component';
import { ToastService } from '../../services/toast.service';
import { DataTableComponent } from '../data-table/data-table.component';
import { ButtonComponent } from '../button/button.component';
import { InputComponent } from '../input/input.component';
import { SelectComponent } from '../select/select.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent, FormComponent, DataTableComponent, ButtonComponent, InputComponent, SelectComponent],
  templateUrl: './patients.component.html'
})
export class PatientsComponent implements OnInit {
  meta$ = this.store.select(selectMetaData);
  patients$ = this.store.select(selectAllPatients);
  loading$ = this.store.select(selectPatientsLoading);
  pageHeader$ = this.store.select(selectPageHeader);
  
  showAddModal = false;
  selectedPatient: any = null;
  searchQuery = '';
  genderFilter = '';
  conditionFilter = '';
  currentUserRole: string | null = null;
  canAddPatient: boolean = false;

  constructor(
    private store: Store, 
    private api: ApiService,
    private toastService: ToastService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.currentUserRole = this.authService.getRole();
    this.canAddPatient = this.authService.hasAnyRole(['Admin', 'Doctor', 'Nurse']);
    
    this.store.dispatch(PatientsActions.loadMetadata());
    this.store.dispatch(PatientsActions.loadPatients());
  }

  handleButtonClick(action: any) {
    console.log('Button clicked:', action);
    this.showAddModal = true;
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
    console.log('Patient selected:', patient);
  }
}
