import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as DoctorActions from '../../../../store/doctor/doctor.actions';
import { selectAllDoctors, selectDoctorLoading } from '../../../../store/doctor/doctor.selectors';
import { Doctor } from '../../../../core/models/doctor.model';
import { DataTableComponent, TableColumn } from '../../../../shared/components/data-table/data-table.component';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';

@Component({
  selector: 'app-manage-doctors',
  standalone: true,
  imports: [CommonModule, DataTableComponent, CardComponent, LoaderComponent],
  templateUrl: './manage-doctors.component.html'
})
export class ManageDoctorsComponent implements OnInit {
  doctors$!: Observable<Doctor[]>;
  loading$!: Observable<boolean>;

  columns: TableColumn[] = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'firstName', label: 'First Name', sortable: true },
    { key: 'lastName', label: 'Last Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'specialization', label: 'Specialization', sortable: true },
    { key: 'phone', label: 'Phone', sortable: false }
  ];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.doctors$ = this.store.select(selectAllDoctors);
    this.loading$ = this.store.select(selectDoctorLoading);
    this.store.dispatch(DoctorActions.loadDoctors());
  }

  onRowClick(doctor: Doctor): void {
    console.log('Doctor clicked:', doctor);
  }

  onSort(event: { column: string; direction: 'asc' | 'desc' }): void {
    console.log('Sort:', event);
  }
}
