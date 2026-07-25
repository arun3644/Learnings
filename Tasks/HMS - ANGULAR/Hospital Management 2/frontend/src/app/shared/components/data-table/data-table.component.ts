import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, LoaderComponent],
  templateUrl: './data-table.component.html'
})
export class DataTableComponent {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() loading: boolean = false;
  @Output() rowClick = new EventEmitter<any>();
  @Output() sort = new EventEmitter<{ column: string; direction: 'asc' | 'desc' }>();

  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  onRowClick(row: any): void {
    this.rowClick.emit(row);
  }

  onSort(column: TableColumn): void {
    if (!column.sortable) return;
    
    if (this.sortColumn === column.key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column.key;
      this.sortDirection = 'asc';
    }
    
    this.sort.emit({ column: column.key, direction: this.sortDirection });
  }
}
