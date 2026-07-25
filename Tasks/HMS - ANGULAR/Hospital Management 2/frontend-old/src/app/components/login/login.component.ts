import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as selector from '../../store/login/login.selectors';
import { LoginActions } from '../../store/login/login.actions';
import { CardComponent } from '../card/card.component';
import { ButtonComponent } from '../button/button.component';
import { buildFormGroupFromFields } from '../../utility/utilities';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardComponent, ButtonComponent],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {
  loginData: any = null;
  loginForm: FormGroup = new FormGroup({});
  loginFields: any[] = [];
  selectedCard = '';
  isRegisterMode = false;
  registerFields: any[] = [];
  registrationRoles: string[] = ['Doctor', 'Nurse', 'Patient'];
  authError: string | null = null;
  isSubmitting = false;

  layout$ = this.store.select(selector.selectLoginLayout);
  cards$ = this.store.select(selector.selectLoginCards);
  loading$ = this.store.select(selector.selectLoginLoading);
  error$ = this.store.select(selector.selectLoginError);
  successMessage$ = this.store.select(selector.selectLoginSuccessMessage);
  isAuthenticated$ = this.store.select(selector.selectIsAuthenticated);
  
  subs = new Subscription();

  constructor(
    private store: Store,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/app']);
      return;
    }

    // Load login metadata for form configuration
    this.store.dispatch(LoginActions.loadLoginMetadata());
    
    const metaSub = this.store.select(selector.selectLoginMetaData).subscribe(data => {
      if (data) {
        this.loginData = data;
        this.loginFields = data.fields || [];
        this.registerFields = data.register?.fields || [];
        this.loginForm = buildFormGroupFromFields(this.loginFields);
      }
    });
    this.subs.add(metaSub);

    // Listen for errors
    const errorSub = this.error$.subscribe(error => {
      this.authError = error;
      this.isSubmitting = false;
    });
    this.subs.add(errorSub);

    // Listen for loading state
    const loadingSub = this.loading$.subscribe(loading => {
      this.isSubmitting = loading;
    });
    this.subs.add(loadingSub);

    // Listen for successful registration
    const successSub = this.successMessage$.subscribe(message => {
      if (message && this.isRegisterMode) {
        alert(message);
        // Switch to login mode after successful registration
        this.isRegisterMode = false;
        this.selectedCard = '';
        this.loginForm = buildFormGroupFromFields(this.loginFields);
        this.authError = null;
      }
    });
    this.subs.add(successSub);
  }

  get activeFields(): any[] {
    return this.isRegisterMode ? [...this.loginFields, ...this.registerFields] : this.loginFields;
  }

  toggleMode() {
    this.isRegisterMode = !this.isRegisterMode;
    this.selectedCard = '';
    this.authError = null;
    this.loginForm = buildFormGroupFromFields(
      this.isRegisterMode ? [...this.loginFields, ...this.registerFields] : this.loginFields
    );
  }

  chooseRole(name: string) {
    this.selectedCard = name;
    this.authError = null;
  }

  submit() {
    if (!this.selectedCard) {
      alert('Please select a role');
      return;
    }

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      alert('Please fill in all required fields');
      return;
    }

    if (this.isRegisterMode) {
      this.register();
    } else {
      this.login();
    }
  }

  private login() {
    const credentials = {
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value,
      role: this.selectedCard
    };

    // Dispatch login action - effects will handle the API call and navigation
    this.store.dispatch(LoginActions.login({ credentials }));
  }

  private register() {
    const role = this.selectedCard; // Admin, Doctor, Nurse, Patient
    
    // Build credentials based on role
    const credentials: any = {
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value,
      name: this.loginForm.get('name')?.value,
      email: this.loginForm.get('email')?.value
    };

    // Add role-specific fields
    if (role === 'Doctor') {
      credentials.specialization = this.loginForm.get('specialization')?.value;
      credentials.yearsOfExperience = this.loginForm.get('experience')?.value;
      credentials.phoneNumber = this.loginForm.get('phone')?.value;
      credentials.licenseNumber = this.loginForm.get('licenseNumber')?.value;
    } else if (role === 'Nurse') {
      credentials.department = this.loginForm.get('department')?.value;
      credentials.yearsOfExperience = this.loginForm.get('experience')?.value || 0;
      credentials.phoneNumber = this.loginForm.get('phone')?.value;
      credentials.shift = this.loginForm.get('shift')?.value || 'Morning';
    } else if (role === 'Patient') {
      credentials.age = this.loginForm.get('age')?.value;
      credentials.gender = this.loginForm.get('gender')?.value;
      credentials.phoneNumber = this.loginForm.get('phone')?.value;
      credentials.bloodGroup = this.loginForm.get('bloodGroup')?.value || 'O+';
      credentials.condition = 'Stable';
      credentials.address = this.loginForm.get('address')?.value;
    }

    // Dispatch register action - effects will handle the API call
    this.store.dispatch(LoginActions.register({ role, credentials }));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
