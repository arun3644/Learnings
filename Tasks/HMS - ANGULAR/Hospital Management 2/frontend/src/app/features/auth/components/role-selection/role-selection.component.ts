import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AuthActions from '../../../../store/auth/auth.actions';
import { selectAuthLoading, selectAuthError } from '../../../../store/auth/auth.selectors';

interface Role {
  id: string;
  name: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-role-selection',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './role-selection.component.html'
})
export class RoleSelectionComponent {
  selectedRole: string | null = null;
  registerForm!: FormGroup;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  roles: Role[] = [
    {
      id: 'PATIENT',
      name: 'Patient',
      description: 'Book appointments and manage your health records',
      icon: '🏥'
    },
    {
      id: 'DOCTOR',
      name: 'Doctor',
      description: 'Manage appointments and patient care',
      icon: '👨‍⚕️'
    },
    {
      id: 'NURSE',
      name: 'Nurse',
      description: 'Assist in patient care and management',
      icon: '👩‍⚕️'
    },
    {
      id: 'ADMIN',
      name: 'Administrator',
      description: 'Manage hospital operations and staff',
      icon: '⚙️'
    }
  ];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private store: Store
  ) {}

  selectRole(role: Role): void {
    this.selectedRole = role.id;
    this.initForm();
    this.loading$ = this.store.select(selectAuthLoading);
    this.error$ = this.store.select(selectAuthError);
  }

  backToRoles(): void {
    this.selectedRole = null;
    this.registerForm.reset();
  }

  initForm(): void {
    const baseFields = {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required]
    };

    const roleSpecificFields = this.getRoleSpecificFields();
    this.registerForm = this.fb.group({ ...baseFields, ...roleSpecificFields });
  }

  getRoleSpecificFields(): any {
    switch (this.selectedRole) {
      case 'DOCTOR':
        return {
          specialization: ['', Validators.required],
          licenseNumber: ['', Validators.required],
          experience: ['', Validators.required]
        };
      case 'PATIENT':
        return {
          dateOfBirth: ['', Validators.required],
          gender: ['', Validators.required],
          address: ['', Validators.required]
        };
      case 'NURSE':
        return {
          department: ['', Validators.required],
          licenseNumber: ['', Validators.required]
        };
      case 'ADMIN':
        return {
          department: ['', Validators.required]
        };
      default:
        return {};
    }
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { confirmPassword, ...formData } = this.registerForm.value;
      if (formData.password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      this.store.dispatch(AuthActions.register({ 
        userData: { ...formData },
        role: this.selectedRole!
      }));
    }
  }

  goToLogin(): void {
    this.router.navigate(['/auth/login']);
  }
}
