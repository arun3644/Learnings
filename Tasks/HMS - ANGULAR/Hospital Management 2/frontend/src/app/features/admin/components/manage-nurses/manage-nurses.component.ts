import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as NurseActions from '../../../../store/nurse/nurse.actions';
import { selectAllNurses, selectNurseLoading } from '../../../../store/nurse/nurse.selectors';
import { Nurse } from '../../../../core/models/nurse.model';
import { DataTableComponent, TableColumn } from '../../../../shared/components/data-table/data-table.component';
import { CardComponent } from '../../../../shared/components/card/card.component';

@Component({
  selector: 'app-manage-nurses',
  standalone: true,
  imports: [CommonModule, DataTableComponent, CardComponent],
  templateUrl: './manage-nurses.component.html'
})
export class ManageNursesComponent implements OnInit {
  nurses$!: Observable<Nurse[]>;
  loading$!: Observable<boolean>;

  columns: TableColumn[] = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'firstName', label: 'First Name', sortable: true },
    { key: 'lastName', label: 'Last Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'department', label: 'Department', sortable: true },
    { key: 'phone', label: 'Phone', sortable: false }
  ];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.nurses$ = this.store.select(selectAllNurses);
    this.loading$ = this.store.select(selectNurseLoading);
    this.store.dispatch(NurseActions.loadNurses());
  }

  onRowClick(nurse: Nurse): void {
    console.log('Nurse clicked:', nurse);
  }

  onSort(event: { column: string; direction: 'asc' | 'desc' }): void {
    console.log('Sort:', event);
  }
}
