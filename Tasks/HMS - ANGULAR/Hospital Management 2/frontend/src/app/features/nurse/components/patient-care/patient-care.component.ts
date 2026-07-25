import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as PatientActions from '../../../../store/patient/patient.actions';
import { selectAllPatients, selectPatientLoading } from '../../../../store/patient/patient.selectors';
import { Patient } from '../../../../core/models/patient.model';
import { DataTableComponent, TableColumn } from '../../../../shared/components/data-table/data-table.component';
import { CardComponent } from '../../../../shared/components/card/card.component';

@Component({
  selector: 'app-patient-care',
  standalone: true,
  imports: [CommonModule, DataTableComponent, CardComponent],
  templateUrl: './patient-care.component.html'
})
export class PatientCareComponent implements OnInit {
  patients$!: Observable<Patient[]>;
  loading$!: Observable<boolean>;

  columns: TableColumn[] = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'firstName', label: 'First Name', sortable: true },
    { key: 'lastName', label: 'Last Name', sortable: true },
    { key: 'room', label: 'Room', sortable: true },
    { key: 'condition', label: 'Condition', sortable: false },
    { key: 'lastCheckup', label: 'Last Checkup', sortable: true }
  ];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.patients$ = this.store.select(selectAllPatients);
    this.loading$ = this.store.select(selectPatientLoading);
    this.store.dispatch(PatientActions.loadPatients());
  }

  onRowClick(patient: Patient): void {
    console.log('Patient clicked:', patient);
  }

  onSort(event: { column: string; direction: 'asc' | 'desc' }): void {
    console.log('Sort:', event);
  }
}
