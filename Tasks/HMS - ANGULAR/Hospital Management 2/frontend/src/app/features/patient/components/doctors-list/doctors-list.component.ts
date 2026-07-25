import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as DoctorActions from '../../../../store/doctor/doctor.actions';
import { selectAllDoctors, selectDoctorLoading } from '../../../../store/doctor/doctor.selectors';
import { Doctor } from '../../../../core/models/doctor.model';
import { CardComponent } from '../../../../shared/components/card/card.component';

@Component({
  selector: 'app-doctors-list',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './doctors-list.component.html'
})
export class DoctorsListComponent implements OnInit {
  doctors$!: Observable<Doctor[]>;
  loading$!: Observable<boolean>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.doctors$ = this.store.select(selectAllDoctors);
    this.loading$ = this.store.select(selectDoctorLoading);
    this.store.dispatch(DoctorActions.loadDoctors());
  }

  bookAppointment(doctorId: number): void {
    console.log('Book appointment with doctor:', doctorId);
  }
}
