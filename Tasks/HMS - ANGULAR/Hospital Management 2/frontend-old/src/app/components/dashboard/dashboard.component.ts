import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { DashboardActions } from '../../store/dashboard/dashboard.actions';
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
  private staffConfigs: any = {};

  constructor(
    private store: Store,
    private api: ApiService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.role = this.authService.getRole();
    console.log('Dashboard ngOnInit - Role:', this.role);
    this.loadDashboardData();
    this.store.dispatch(DashboardActions.loadStats());
  }

  private loadDashboardData() {
    console.log('Loading dashboard metadata...');
    this.api.getMetadata<any>('dashboard').subscribe({
      next: m => {
        console.log('Dashboard metadata loaded:', m);
        this.meta = m;
        this.staffConfigs = m.staffConfigs || {};
        
        const roleContent = m.roleContents?.[this.role || 'Patient'];
        console.log('Role content for', this.role, ':', roleContent);
        
        if (roleContent) {
          this.roleName = roleContent.title;
          this.roleDescription = roleContent.description;
          this.statCards = roleContent.statCards || [];
          this.navigationCards = roleContent.navigationCards || [];
          this.quickActions = roleContent.quickActions || [];
          this.features = roleContent.features || [];
          
          console.log('Dashboard initialized:', {
            roleName: this.roleName,
            statCards: this.statCards.length,
            quickActions: this.quickActions.length
          });
        } else {
          console.warn('No role content found for role:', this.role);
        }
      },
      error: err => {
        console.error('Failed to load dashboard metadata:', err);
        // Set default values so dashboard still shows
        this.roleName = this.role + ' Dashboard';
        this.roleDescription = 'Welcome to your dashboard';
        this.statCards = [];
        this.quickActions = [];
      }
    });
  }

  executeAction(action: any) {
    console.log("action", action)
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
    this.modalErrorMessage = '';
    this.modalSuccessMessage = '';
  }

  handleModalSubmit(formData: any) {
    if (!this.currentStaffConfig) return;
    
    this.isSubmitting = true;
    this.modalErrorMessage = '';
    this.modalSuccessMessage = '';
    
    const config = this.currentStaffConfig;
    
    // Determine role from config action
    const roleMap: any = {
      'add_doctor': 'Doctor',
      'add_nurse': 'Nurse',
      'add_admin': 'Admin',
      'add_staff': 'Admin'
    };
    
    const role = roleMap[config.action] || 'Admin';
    
    // Build credentials based on role
    const credentials: any = {
      username: formData.username,
      password: formData.password,
      name: formData.name,
      email: formData.email
    };
    
    // Add role-specific fields
    if (role === 'Doctor') {
      credentials.specialization = formData.specialization;
      credentials.yearsOfExperience = formData.yearsOfExperience || formData.experience || 0;
      credentials.phoneNumber = formData.phoneNumber || formData.phone;
      credentials.licenseNumber = formData.licenseNumber;
    } else if (role === 'Nurse') {
      credentials.department = formData.department;
      credentials.yearsOfExperience = formData.yearsOfExperience || formData.experience || 0;
      credentials.phoneNumber = formData.phoneNumber || formData.phone;
      credentials.shift = formData.shift || 'Morning';
    } else if (role === 'Admin') {
      credentials.department = formData.department || 'Administration';
      credentials.phoneNumber = formData.phoneNumber || formData.phone;
    }
    
    // Register using AuthService
    this.authService.register(role, credentials).subscribe({
      next: (response) => {
        if (response.success) {
          this.modalSuccessMessage = config.successMessage || response.message;
          this.isSubmitting = false;
          setTimeout(() => {
            this.closeModal();
            // Reload statistics
            this.store.dispatch(DashboardActions.loadStats());
          }, 1500);
        } else {
          this.isSubmitting = false;
          this.modalErrorMessage = response.message || 'Registration failed';
        }
      },
      error: (error) => {
        this.isSubmitting = false;
        this.modalErrorMessage = error.error?.message || 'Failed to add staff. Please try again.';
      }
    });
  }

  navigatePage(page: string) {
    this.pageNavigate.emit(page);
  }
}
