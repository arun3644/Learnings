import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as PatientActions from '../../../../store/patient/patient.actions';
import { selectAllPatients, selectPatientLoading } from '../../../../store/patient/patient.selectors';
import { Patient } from '../../../../core/models/patient.model';
import { CardComponent } from '../../../../shared/components/card/card.component';

@Component({
  selector: 'app-patient-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardComponent],
  templateUrl: './patient-profile.component.html'
})
export class PatientProfileComponent implements OnInit {
  profileForm!: FormGroup;
  patient$!: Observable<Patient[] | null>;
  loading$!: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.patient$ = this.store.select(selectAllPatients);
    this.loading$ = this.store.select(selectPatientLoading);
    
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required]
    });

    this.patient$.subscribe(patients => {
      if (patients && patients.length > 0) {
        this.profileForm.patchValue(patients[0]);
      }
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid && this.patient$ && this.patient$.subscribe) {
      this.patient$.subscribe(patients => {
        if (patients && patients.length > 0) {
          this.store.dispatch(PatientActions.updatePatient({ 
            id: patients[0].id,
            patient: this.profileForm.value 
          }));
        }
      }).unsubscribe();
    }
  }
}
