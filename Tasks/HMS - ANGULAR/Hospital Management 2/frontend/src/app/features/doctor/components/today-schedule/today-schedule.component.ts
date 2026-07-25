import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AppointmentActions from '../../../../store/appointment/appointment.actions';
import { selectAllAppointments, selectAppointmentLoading } from '../../../../store/appointment/appointment.selectors';
import { Appointment } from '../../../../core/models/appointment.model';
import { CardComponent } from '../../../../shared/components/card/card.component';

@Component({
  selector: 'app-today-schedule',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './today-schedule.component.html'
})
export class TodayScheduleComponent implements OnInit {
  todayAppointments$!: Observable<Appointment[]>;
  loading$!: Observable<boolean>;
  currentDate = new Date();

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.todayAppointments$ = this.store.select(selectAllAppointments);
    this.loading$ = this.store.select(selectAppointmentLoading);
    this.store.dispatch(AppointmentActions.loadAppointments());
  }

  updateStatus(appointmentId: number, status: string): void {
    this.store.dispatch(AppointmentActions.updateAppointment({ 
      id: appointmentId, 
      appointment: { status: status as 'Scheduled' | 'Completed' | 'Cancelled' | 'Rescheduled' } 
    }));
  }
}
