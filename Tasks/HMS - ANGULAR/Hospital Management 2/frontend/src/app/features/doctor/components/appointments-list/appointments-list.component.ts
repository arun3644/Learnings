import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AppointmentActions from '../../../../store/appointment/appointment.actions';
import { selectAllAppointments, selectAppointmentLoading } from '../../../../store/appointment/appointment.selectors';
import { Appointment } from '../../../../core/models/appointment.model';
import { DataTableComponent, TableColumn } from '../../../../shared/components/data-table/data-table.component';
import { CardComponent } from '../../../../shared/components/card/card.component';

@Component({
  selector: 'app-appointments-list',
  standalone: true,
  imports: [CommonModule, DataTableComponent, CardComponent],
  templateUrl: './appointments-list.component.html'
})
export class AppointmentsListComponent implements OnInit {
  appointments$!: Observable<Appointment[]>;
  loading$!: Observable<boolean>;

  columns: TableColumn[] = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'patientName', label: 'Patient', sortable: true },
    { key: 'appointmentDate', label: 'Date', sortable: true },
    { key: 'timeSlot', label: 'Time', sortable: false },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'reason', label: 'Reason', sortable: false }
  ];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.appointments$ = this.store.select(selectAllAppointments);
    this.loading$ = this.store.select(selectAppointmentLoading);
    this.store.dispatch(AppointmentActions.loadAppointments());
  }

  onRowClick(appointment: Appointment): void {
    console.log('Appointment clicked:', appointment);
  }

  onSort(event: { column: string; direction: 'asc' | 'desc' }): void {
    console.log('Sort:', event);
  }
}
