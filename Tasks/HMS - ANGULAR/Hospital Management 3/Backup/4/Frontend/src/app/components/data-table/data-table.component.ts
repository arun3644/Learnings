import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-table.component.html'
})
export class DataTableComponent {
  @Input() columns: any[] = [];
  @Input() data: any[] = [];
  @Input() totalCount: number = 0;
  @Input() title: string = 'Data List';
  @Input() loading: boolean = false;
  @Output() rowClick = new EventEmitter<any>();

  onRowClick(item: any) {
    this.rowClick.emit(item);
  }

  getInitials(name: string): string {
    return (name || '').split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
  }

  getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  }

  getIdValue(item: any): string {
    return item.doctorId || item.patientId || item.nurseId || item.id || 'N/A';
  }

  getStatusClass(status: string): string {
    const statusMap: any = {
      'Active': 's-active',
      'Inactive': 's-done',
      'Review': 's-pending'
    };
    return statusMap[status] || 's-active';
  }
}
