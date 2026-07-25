import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as DoctorActions from '../../../../store/doctor/doctor.actions';
import { selectAllDoctors, selectDoctorLoading } from '../../../../store/doctor/doctor.selectors';
import { Doctor } from '../../../../core/models/doctor.model';
import { CardComponent } from '../../../../shared/components/card/card.component';

@Component({
  selector: 'app-doctor-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardComponent],
  templateUrl: './doctor-profile.component.html'
})
export class DoctorProfileComponent implements OnInit {
  profileForm!: FormGroup;
  doctor$!: Observable<Doctor[] | null>;
  loading$!: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.doctor$ = this.store.select(selectAllDoctors);
    this.loading$ = this.store.select(selectDoctorLoading);
    
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      specialization: ['', Validators.required],
      experience: ['', Validators.required]
    });

    this.doctor$.subscribe(doctors => {
      if (doctors && doctors.length > 0) {
        this.profileForm.patchValue(doctors[0]);
      }
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid && this.doctor$ && this.doctor$.subscribe) {
      this.doctor$.subscribe(doctors => {
        if (doctors && doctors.length > 0) {
          this.store.dispatch(DoctorActions.updateDoctor({ 
            id: doctors[0].id,
            doctor: this.profileForm.value 
          }));
        }
      }).unsubscribe();
    }
  }
}
