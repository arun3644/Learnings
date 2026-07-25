import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectAllDoctors, selectDoctorsLoading, selectMetaData, selectPageHeader } from '../../store/doctors/doctors.selectors';
import { DoctorsActions } from '../../store/doctors/doctors.actions';
import { ButtonComponent } from '../button/button.component';
import { InputComponent } from '../input/input.component';
import { SelectComponent } from '../select/select.component';
import { DataTableComponent } from '../data-table/data-table.component';
import { ModalComponent } from '../modal/modal.component';
import { FormComponent } from '../form/form.component';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent, InputComponent, SelectComponent, DataTableComponent, ModalComponent, FormComponent],
  templateUrl: './doctors.component.html'
})
export class DoctorsComponent implements OnInit {
  meta$ = this.store.select(selectMetaData);
  doctors$ = this.store.select(selectAllDoctors);
  loading$ = this.store.select(selectDoctorsLoading);
  searchQuery = '';
  specializationFilter = '';
  specializations: string[] = [];
  pageHeader$: {} = this.store.select(selectPageHeader);
  showAddModal = false;
  currentUserRole: string | null = null;
  canAddDoctor: boolean = false;

  constructor(private store: Store, private api: ApiService, private toastService: ToastService, private authService: AuthService) { }

  ngOnInit() {
    this.currentUserRole = this.authService.getRole();
    this.canAddDoctor = this.authService.hasAnyRole(['Admin', 'Doctor']);
    
    this.store.dispatch(DoctorsActions.loadMetadata());
    this.store.dispatch(DoctorsActions.loadDoctors());

    this.doctors$.subscribe(d => {
      this.specializations = [...new Set(d.map(doc => doc.specialization).filter(Boolean))];
    });
  }

  handleButtonClick(action: any) {
    console.log('Button clicked:', action);
    this.showAddModal = true;
  }

  filterDoctors(doctors: any[]): any[] {
    return doctors.filter(d => {
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

  selectDoctor(doctor: any){
    console.log('Doctor selected:', doctor);
  }

  handleFormSubmit(formData: any) {
    const payload = {
      username: formData.username,
      password: formData.password,
      name: formData.name,
      email: formData.email,
      specialization: formData.specialization || 'General',
      yearsOfExperience: Number(formData.yearsOfExperience) || 0,
      phoneNumber: formData.phone || '',
      licenseNumber: formData.licenseNumber || ''
    };

    this.api.http.post<any>(`${this.api.getApiBase()}/auth/register/doctor`, payload).subscribe({
      next: (res) => {
        if (res?.success) {
          this.toastService.success('Doctor registered successfully');
          this.showAddModal = false;
          this.store.dispatch(DoctorsActions.loadDoctors());
        } else {
          this.toastService.error(res?.message || 'Failed to register doctor');
        }
      },
      error: (err) => {
        const msg = err?.error?.message || '';
        this.toastService.error(msg || 'Failed to register doctor. Please try again.');
      }
    });
  }

  closeModal() {
    this.showAddModal = false;
  }
}
