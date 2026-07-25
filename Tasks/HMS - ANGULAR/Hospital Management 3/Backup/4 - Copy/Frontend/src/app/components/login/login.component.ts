import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as selector from '../../store/login/login.selectors';
import * as LoginActions from '../../store/login/login.actions';
import { CardComponent } from '../card/card.component';
import { ButtonComponent } from '../button/button.component';
import { buildFormGroupFromFields } from '../../utility/utilities';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, CardComponent, ButtonComponent],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {
  loginData: any = null;
  loginForm: FormGroup = new FormGroup({});
  loginFields: any[] = [];
  selectedCard = '';
  isSubmitting = false;
  authError: string | null = null;
  subs = new Subscription();

  // Register flow
  registerStep: 0 | 1 | 2 = 0; // 0=login, 1=pick role, 2=fill form
  registerRole = '';
  registerForm!: FormGroup;
  registerError: string | null = null;
  registerSuccess: string | null = null;

  layout$ = this.store.select(selector.selectLoginLayout);
  cards$ = this.store.select(selector.selectLoginCards);
  loading$ = this.store.select(selector.selectLoginLoading);
  error$ = this.store.select(selector.selectLoginError);

  readonly registrationRoles = ['Doctor', 'Nurse', 'Patient'];

  readonly roleIcons: Record<string, string> = {
    Doctor: '👨‍⚕️', Nurse: '👩‍⚕️', Patient: '🧑‍🤝‍🧑'
  };

  readonly roleFields: Record<string, any[]> = {
    Doctor: [
      { key: 'username',          label: 'Username',            type: 'text',     required: true,  placeholder: 'Enter username' },
      { key: 'password',          label: 'Password',            type: 'password', required: true,  placeholder: 'Min 6 characters', minLength: 6 },
      { key: 'name',              label: 'Full Name',           type: 'text',     required: true,  placeholder: 'Dr. John Doe' },
      { key: 'email',             label: 'Email',               type: 'email',    required: true,  placeholder: 'doctor@hospital.com' },
      { key: 'phoneNumber',       label: 'Phone',               type: 'tel',      required: true,  placeholder: '9876543210' },
      { key: 'specialization',    label: 'Specialization',      type: 'select',   required: true,  options: [
        'Cardiologist','Neurologist','Pediatrician','Orthopedic',
        'Dermatologist','General Physician','Psychiatrist','Oncologist','Radiologist','Anesthesiologist'
      ]},
      { key: 'yearsOfExperience', label: 'Experience (yrs)',    type: 'number',   required: false, placeholder: '5' },
      { key: 'licenseNumber',     label: 'License No.',         type: 'text',     required: false, placeholder: 'LIC12345' }
    ],
    Nurse: [
      { key: 'username',          label: 'Username',            type: 'text',     required: true,  placeholder: 'Enter username' },
      { key: 'password',          label: 'Password',            type: 'password', required: true,  placeholder: 'Min 6 characters', minLength: 6 },
      { key: 'name',              label: 'Full Name',           type: 'text',     required: true,  placeholder: 'Jane Doe' },
      { key: 'email',             label: 'Email',               type: 'email',    required: true,  placeholder: 'nurse@hospital.com' },
      { key: 'department',        label: 'Department',          type: 'text',     required: true,  placeholder: 'ICU' },
      { key: 'shift',             label: 'Shift',               type: 'select',   required: false, options: ['Morning','Evening','Night'] },
      { key: 'yearsOfExperience', label: 'Experience (yrs)',    type: 'number',   required: false, placeholder: '3' },
      { key: 'phoneNumber',       label: 'Phone',               type: 'tel',      required: true,  placeholder: '9876543210' }
    ],
    Patient: [
      { key: 'username',    label: 'Username',     type: 'text',     required: true,  placeholder: 'Enter username' },
      { key: 'password',    label: 'Password',     type: 'password', required: true,  placeholder: 'Min 6 characters', minLength: 6 },
      { key: 'name',        label: 'Full Name',    type: 'text',     required: true,  placeholder: 'John Doe' },
      { key: 'email',       label: 'Email',        type: 'email',    required: true,  placeholder: 'patient@email.com' },
      { key: 'age',         label: 'Age',          type: 'number',   required: true,  placeholder: '25' },
      { key: 'gender',      label: 'Gender',       type: 'select',   required: true,  options: ['Male','Female','Other'] },
      { key: 'phoneNumber', label: 'Phone',        type: 'tel',      required: true,  placeholder: '9876543210' },
      { key: 'bloodGroup',  label: 'Blood Group',  type: 'select',   required: false, options: ['A+','A-','B+','B-','AB+','AB-','O+','O-'] },
      { key: 'condition',   label: 'Condition',    type: 'text',     required: false, placeholder: 'e.g. Stable' },
      { key: 'address',     label: 'Address',      type: 'text',     required: false, placeholder: '123 Main St' }
    ]
  };

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/app']);
      return;
    }
    this.store.dispatch(LoginActions.loadLogin());
    const metaSub = this.store.select(selector.selectLoginMetaData).subscribe(data => {
      if (data) {
        this.loginData = data;
        this.loginFields = data.fields || [];
        this.loginForm = buildFormGroupFromFields(this.loginFields);
      }
    });
    const paramsSub = this.route.queryParamMap.subscribe(params => {
      const openRegister = params.get('register') === '1' || params.get('mode') === 'register';
      if (openRegister) {
        this.openRegister();
      }
    });
    this.subs.add(metaSub);
    this.subs.add(paramsSub);
  }

  // Login flow
  chooseRole(name: string) {
    this.selectedCard = name;
    this.authError = null;
  }

  submit() {
    this.authError = null;
    if (!this.selectedCard) { this.authError = 'Please select a role'; return; }
    if (this.loginForm.invalid) { this.loginForm.markAllAsTouched(); return; }
    this.isSubmitting = true;
    this.login();
  }

  private login() {
    const loginSub = this.authService.login({
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value,
      role: this.selectedCard
    }).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        if (res.success) { this.router.navigate(['/app']); }
        else { this.authError = res.message || 'Invalid credentials.'; }
      },
      error: () => { this.isSubmitting = false; this.authError = 'Login failed. Please try again.'; }
    });
    this.subs.add(loginSub);
  }

  // Register flow — step 1: open role picker
  openRegister() {
    this.registerStep = 1;
    this.registerRole = '';
    this.registerError = null;
    this.registerSuccess = null;
  }

  cancelRegister() {
    this.registerStep = 0;
    this.registerRole = '';
    this.registerError = null;
    this.registerSuccess = null;
  }

  chooseRegisterRole(role: string) {
    this.registerRole = role;
  }

  // Register flow — step 2: show role fields
  proceedToForm() {
    if (!this.registerRole) { this.registerError = 'Please select a role'; return; }
    this.registerError = null;
    this.buildRegisterForm();
    this.registerStep = 2;
  }

  private buildRegisterForm() {
    const fields = this.roleFields[this.registerRole] || [];
    const group: any = {};
    fields.forEach(f => {
      const validators = [];
      if (f.required) validators.push(Validators.required);
      if (f.type === 'email') validators.push(Validators.email);
      if (f.minLength) validators.push(Validators.minLength(f.minLength));
      group[f.key] = ['', validators];
    });
    this.registerForm = this.fb.group(group);
  }

  backToRolePicker() {
    this.registerStep = 1;
    this.registerError = null;
    this.registerSuccess = null;
  }

  submitRegister() {
    if (this.registerForm.invalid) { this.registerForm.markAllAsTouched(); return; }
    this.isSubmitting = true;
    this.registerError = null;
    this.registerSuccess = null;

    const v = this.registerForm.value;
    const payload: any = {
      username: v.username, password: v.password,
      name: v.name, email: v.email
    };

    if (this.registerRole === 'Doctor') {
      payload.specialization    = v.specialization || 'General';
      payload.yearsOfExperience = Number(v.yearsOfExperience) || 0;
      payload.phoneNumber       = v.phoneNumber || '';
      payload.licenseNumber     = v.licenseNumber || '';
    } else if (this.registerRole === 'Nurse') {
      payload.department        = v.department || 'General';
      payload.yearsOfExperience = Number(v.yearsOfExperience) || 0;
      payload.phoneNumber       = v.phoneNumber || '';
      payload.shift             = v.shift || 'Morning';
    } else if (this.registerRole === 'Patient') {
      payload.age         = Number(v.age) || 0;
      payload.gender      = v.gender || 'Male';
      payload.phoneNumber = v.phoneNumber || '';
      payload.bloodGroup  = v.bloodGroup || 'O+';
      payload.condition   = v.condition || 'Stable';
      payload.address     = v.address || 'N/A';
    }

    const regSub = this.authService.register({ ...payload, role: this.registerRole }).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        if (res.success) {
          this.registerSuccess = 'Account created! Please login.';
          setTimeout(() => this.cancelRegister(), 1800);
        } else {
          this.registerError = res.message || 'Registration failed.';
        }
      },
      error: (err) => {
        this.isSubmitting = false;
        this.registerError = err?.error?.message || 'Registration failed. Please try again.';
      }
    });
    this.subs.add(regSub);
  }

  getRegisterFields(): any[] {
    return this.roleFields[this.registerRole] || [];
  }

  goHome() {
    this.router.navigate(['']);
  }

  ngOnDestroy(): void { this.subs.unsubscribe(); }
}
