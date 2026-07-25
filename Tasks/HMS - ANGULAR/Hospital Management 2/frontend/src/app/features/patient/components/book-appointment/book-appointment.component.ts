import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AppointmentActions from '../../../../store/appointment/appointment.actions';
import * as DoctorActions from '../../../../store/doctor/doctor.actions';
import { selectAllDoctors } from '../../../../store/doctor/doctor.selectors';
import { selectAppointmentLoading } from '../../../../store/appointment/appointment.selectors';
import { Doctor } from '../../../../core/models/doctor.model';
import { CardComponent } from '../../../../shared/components/card/card.component';

@Component({
  selector: 'app-book-appointment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardComponent],
  templateUrl: './book-appointment.component.html'
})
export class BookAppointmentComponent implements OnInit {
  appointmentForm!: FormGroup;
  doctors$!: Observable<Doctor[]>;
  loading$!: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.doctors$ = this.store.select(selectAllDoctors);
    this.loading$ = this.store.select(selectAppointmentLoading);
    
    this.store.dispatch(DoctorActions.loadDoctors());

    this.appointmentForm = this.fb.group({
      doctorId: ['', Validators.required],
      appointmentDate: ['', Validators.required],
      timeSlot: ['', Validators.required],
      reason: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.appointmentForm.valid) {
      this.store.dispatch(AppointmentActions.bookAppointment({ 
        appointment: this.appointmentForm.value 
      }));
    }
  }
}
