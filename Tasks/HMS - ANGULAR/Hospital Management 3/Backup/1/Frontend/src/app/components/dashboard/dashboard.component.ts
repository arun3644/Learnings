import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { DashboardActions } from '../../store/dashboard/dashboard.actions';
import { PatientsActions } from '../../store/patients/patients.actions';
import { selectStats, selectDashboardLoading } from '../../store/dashboard/dashboard.selectors';
import { CardComponent } from '../card/card.component';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardComponent, ModalComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  meta: any = null;
  stats$ = this.store.select(selectStats);
  loading$ = this.store.select(selectDashboardLoading);
  
  @Output() pageNavigate = new EventEmitter<string>();

  role: string | null = null;
  roleName = '';
  roleDescription = '';
  statCards: any[] = [];
  navigationCards: any[] = [];
  quickActions: any[] = [];
  features: string[] = [];

  isModalOpen = false;
  modalTitle = '';
  modalFields: any[] = [];
  modalForm!: FormGroup;
  isSubmitting = false;
  modalErrorMessage = '';
  modalSuccessMessage = '';
  
  private currentStaffConfig: any = null;
  private currentStaffAction = '';
  private staffConfigs: any = {};

  constructor(
    private store: Store,
    private api: ApiService,
    private authService: AuthService,
    private fb: FormBuilder,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.role = this.authService.getRole();
    this.loadDashboardData();
    this.store.dispatch(DashboardActions.loadStats());
  }

  private loadDashboardData() {
    this.api.getMetadata<any>('dashboard').subscribe({
      next: m => {
        this.meta = m;
        this.staffConfigs = m.staffConfigs || {};
        
        const roleContent = m.roleContents?.[this.role || 'Patient'];
        if (roleContent) {
          this.roleName = roleContent.title;
          this.roleDescription = roleContent.description;
          this.statCards = roleContent.statCards || [];
          this.navigationCards = roleContent.navigationCards || [];
          this.quickActions = roleContent.quickActions || [];
          this.features = roleContent.features || [];
        }
      },
      error: err => console.error('Failed to load dashboard metadata:', err)
    });
  }

  executeAction(action: any) {
    if (this.staffConfigs[action.action]) {
      this.openModal(action.action);
    } else if (action.action === 'view_patients') {
      this.pageNavigate.emit('patients');
    } else if (action.action === 'view_appointments' || action.action === 'book_appointment') {
      this.pageNavigate.emit('appointments');
    }
  }

  private openModal(actionKey: string) {
    const config = this.staffConfigs[actionKey];
    if (!config) return;

    this.currentStaffAction = actionKey;
    this.currentStaffConfig = config;
    this.modalTitle = config.title;
    this.modalFields = config.fields.filter((f: any) => f.type !== 'hidden');
    this.modalForm = this.createForm(config.fields);
    this.modalErrorMessage = '';
    this.modalSuccessMessage = '';
    this.isModalOpen = true;
  }

  private createForm(fields: any[]): FormGroup {
    const formConfig: any = {};
    fields.forEach(field => {
      const validators = [];
      if (field.required) validators.push(Validators.required);
      if (field.type === 'email') validators.push(Validators.email);
      if (field.minLength) validators.push(Validators.minLength(field.minLength));
      formConfig[field.key] = [field.defaultValue || '', validators];
    });
    return this.fb.group(formConfig);
  }

  closeModal() {
    this.isModalOpen = false;
    this.modalForm.reset();
    this.currentStaffConfig = null;
    this.currentStaffAction = '';
    this.modalErrorMessage = '';
    this.modalSuccessMessage = '';
  }

  handleModalSubmit(formData: any) {
    if (!this.currentStaffConfig) return;

    this.isSubmitting = true;
    this.modalErrorMessage = '';
    this.modalSuccessMessage = '';

    let endpoint = '';
    const payload: any = {
      username: formData.username,
      password: formData.password,
      name: formData.name,
      email: formData.email
    };

    if (this.currentStaffAction === 'add_doctor') {
      endpoint = '/auth/register/doctor';
      payload.specialization = formData.specialization || 'General';
      payload.yearsOfExperience = formData.yearsOfExperience ?? 0;
      payload.phoneNumber = formData.phone || '';
      payload.licenseNumber = formData.licenseNumber || '';
    } else if (this.currentStaffAction === 'add_nurse') {
      endpoint = '/auth/register/nurse';
      payload.department = formData.department || 'General';
      payload.yearsOfExperience = formData.yearsOfExperience ?? 0;
      payload.phoneNumber = formData.phone || '';
      payload.shift = formData.shift || 'Morning';
    } else if (this.currentStaffAction === 'add_patient') {
      endpoint = '/auth/register/patient';
      payload.age = formData.age ?? 0;
      payload.gender = formData.gender || 'Male';
      payload.phoneNumber = formData.phone || '';
      payload.bloodGroup = formData.bloodGroup || 'O+';
      payload.condition = formData.condition || 'Stable';
      payload.address = formData.address || 'N/A';
    } else {
      this.isSubmitting = false;
      this.modalErrorMessage = 'This action is not supported by the backend yet.';
      return;
    }

    this.api.http.post<any>(`${this.api.getApiBase()}${endpoint}`, payload).subscribe({
      next: (res) => {
        if (res?.success) {
          this.isSubmitting = false;
          this.toastService.success(this.currentStaffConfig.successMessage);
          this.closeModal();
          this.store.dispatch(DashboardActions.loadStats());
          if (this.currentStaffAction === 'add_patient') {
            this.store.dispatch(PatientsActions.loadPatients());
          }
        } else {
          this.isSubmitting = false;
          this.toastService.error(res?.message || 'Failed to add. Please try again.');
          this.modalErrorMessage = res?.message || 'Failed to add. Please try again.';
        }
      },
      error: (error) => {
        this.isSubmitting = false;
        const msg = error?.error?.message || 'Failed to add. Please try again.';
        this.toastService.error(msg);
        this.modalErrorMessage = msg;
      }
    });
  }

  navigatePage(page: string) {
    this.pageNavigate.emit(page);
  }
}
