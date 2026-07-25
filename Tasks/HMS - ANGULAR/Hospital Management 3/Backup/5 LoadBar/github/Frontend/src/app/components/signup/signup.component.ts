import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardComponent } from '../card/card.component';
import { ButtonComponent } from '../button/button.component';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardComponent, ButtonComponent],
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit, OnDestroy {
  registerRole = '';
  registerForm!: FormGroup;
  registerError: string | null = null;
  registerSuccess: string | null = null;
  isSubmitting = false;
  subs = new Subscription();

  readonly registrationRoles = ['Doctor', 'Nurse', 'Patient'];

  readonly roleIcons: Record<string, string> = {
    Doctor: '👨‍⚕️', Nurse: '👩‍⚕️', Patient: '🧑‍🤝‍🧑'
  };

  readonly roleFields: Record<string, any[]> = {
    Doctor: [
      { key: 'username', label: 'Username', type: 'text', required: true, placeholder: 'Enter username' },
      { key: 'password', label: 'Password', type: 'password', required: true, placeholder: 'Min 6 characters', minLength: 6 },
      { key: 'name', label: 'Full Name', type: 'text', required: true, placeholder: 'Dr. John Doe' },
      { key: 'email', label: 'Email', type: 'email', required: true, placeholder: 'doctor@hospital.com' },
      { key: 'phoneNumber', label: 'Phone', type: 'tel', required: true, placeholder: '9876543210' },
      { key: 'specialization', label: 'Specialization', type: 'select', required: true, options: [
        'Cardiologist','Neurologist','Pediatrician','Orthopedic',
        'Dermatologist','General Physician','Psychiatrist','Oncologist','Radiologist','Anesthesiologist'
      ]},
      { key: 'yearsOfExperience', label: 'Experience (yrs)', type: 'number', required: false, placeholder: '5' },
      { key: 'licenseNumber', label: 'License No.', type: 'text', required: false, placeholder: 'LIC12345' }
    ],
    Nurse: [
      { key: 'username', label: 'Username', type: 'text', required: true, placeholder: 'Enter username' },
      { key: 'password', label: 'Password', type: 'password', required: true, placeholder: 'Min 6 characters', minLength: 6 },
      { key: 'name', label: 'Full Name', type: 'text', required: true, placeholder: 'Jane Doe' },
      { key: 'email', label: 'Email', type: 'email', required: true, placeholder: 'nurse@hospital.com' },
      { key: 'department', label: 'Department', type: 'text', required: true, placeholder: 'ICU' },
      { key: 'shift', label: 'Shift', type: 'select', required: false, options: ['Morning','Evening','Night'] },
      { key: 'yearsOfExperience', label: 'Experience (yrs)', type: 'number', required: false, placeholder: '3' },
      { key: 'phoneNumber', label: 'Phone', type: 'tel', required: true, placeholder: '9876543210' }
    ],
    Patient: [
      { key: 'username', label: 'Username', type: 'text', required: true, placeholder: 'Enter username' },
      { key: 'password', label: 'Password', type: 'password', required: true, placeholder: 'Min 6 characters', minLength: 6 },
      { key: 'name', label: 'Full Name', type: 'text', required: true, placeholder: 'John Doe' },
      { key: 'email', label: 'Email', type: 'email', required: true, placeholder: 'patient@email.com' },
      { key: 'age', label: 'Age', type: 'number', required: true, placeholder: '25' },
      { key: 'gender', label: 'Gender', type: 'select', required: true, options: ['Male','Female','Other'] },
      { key: 'phoneNumber', label: 'Phone', type: 'tel', required: true, placeholder: '9876543210' },
      { key: 'bloodGroup', label: 'Blood Group', type: 'select', required: false, options: ['A+','A-','B+','B-','AB+','AB-','O+','O-'] },
      { key: 'condition', label: 'Condition', type: 'text', required: false, placeholder: 'e.g. Stable' },
      { key: 'address', label: 'Address', type: 'text', required: false, placeholder: '123 Main St' }
    ]
  };

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }

  chooseRole(role: string) {
    this.registerRole = role;
    this.createForm();
    this.registerError = null;
  }

  private createForm() {
    const fields = this.roleFields[this.registerRole];
    const group: Record<string, any> = {};
    fields.forEach(field => {
      const validators = [];
      if (field.required) validators.push(Validators.required);
      if (field.minLength) validators.push(Validators.minLength(field.minLength));
      if (field.type === 'email') validators.push(Validators.email);
      group[field.key] = [{ value: '', disabled: false }, validators];
    });
    this.registerForm = this.fb.group(group);
  }

  submit() {
    if (!this.registerRole) {
      this.registerError = 'Please select a role';
      return;
    }
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      this.registerError = 'Please fill in all required fields correctly';
      return;
    }

    this.isSubmitting = true;
    const formValue = this.registerForm.getRawValue();
    const payload = { ...formValue, role: this.registerRole };

    const registerSub = this.authService.register(payload).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        console.log("res", res)
        if (res.success) {
          this.registerSuccess = 'Account created successfully! Redirecting to login...';
          console.log("successfully logged in")
          this.router.navigate(['/login']);
          console.log("3000")
        } else {
          this.registerError = res.message || 'Registration failed. Please try again.';
        }
      },
      error: () => {
        this.isSubmitting = false;
        this.registerError = 'Registration failed. Please try again.';
      }
    });
    this.subs.add(registerSub);
  }

  goBack() {
    if (this.registerRole) {
      this.registerRole = '';
      this.registerError = null;
    } else {
      console.log("100")
      this.router.navigate(['/']);
    }
  }

  getFormFields() {
    return this.roleFields[this.registerRole] || [];
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
