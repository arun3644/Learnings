import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AuthActions from '../../../../store/auth/auth.actions';
import { selectAuthLoading, selectAuthError } from '../../../../store/auth/auth.selectors';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  selectedRole: string = '';
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loading$ = this.store.select(selectAuthLoading);
    this.error$ = this.store.select(selectAuthError);
    
    this.selectedRole = history.state?.role || '';
    if (!this.selectedRole) {
      this.router.navigate(['/auth/role-selection']);
      return;
    }
    this.initForm();
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
        role: this.selectedRole
      }));
    }
  }

  goBack(): void {
    this.router.navigate(['/auth/role-selection']);
  }
}
