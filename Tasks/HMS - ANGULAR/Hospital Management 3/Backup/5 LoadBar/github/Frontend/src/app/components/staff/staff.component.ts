import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectAllStaff, selectStaffLoading, selectMetaData, selectPageHeader } from '../../store/staff/staff.selectors';
import { StaffActions } from '../../store/staff/staff.actions';
import { ButtonComponent } from '../button/button.component';
import { InputComponent } from '../input/input.component';
import { SelectComponent } from '../select/select.component';
import { DataTableComponent } from '../data-table/data-table.component';
import { ModalComponent } from '../modal/modal.component';
import { FormComponent } from '../form/form.component';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent, InputComponent, SelectComponent, DataTableComponent, ModalComponent, FormComponent],
  templateUrl: './staff.component.html'
})
export class StaffComponent implements OnInit {
  meta$ = this.store.select(selectMetaData);
  staff$ = this.store.select(selectAllStaff);
  loading$ = this.store.select(selectStaffLoading);
  searchQuery = '';
  shiftFilter = '';
  pageHeader$ = this.store.select(selectPageHeader);
  showAddModal = false;
  currentUserRole: string | null = null;
  canAddStaff: boolean = false;

  constructor(private store: Store, private api: ApiService, private toastService: ToastService, private authService: AuthService) { }

  ngOnInit() {
    this.currentUserRole = this.authService.getRole();
    this.canAddStaff = this.authService.hasAnyRole(['Admin', 'Doctor']);
    
    this.store.dispatch(StaffActions.loadMetadata());
    this.store.dispatch(StaffActions.loadStaff());
  }

  handleButtonClick(action: any) {
    console.log('Button clicked:', action);
    this.showAddModal = true;
  }

  filterStaff(staff: any[]): any[] {
    return staff.filter(s => {
      const q = this.searchQuery.toLowerCase();
      const matchesSearch = !q ||
        s.name?.toLowerCase().includes(q) ||
        s.nurseId?.toLowerCase().includes(q) ||
        s.department?.toLowerCase().includes(q) ||
        s.email?.toLowerCase().includes(q);
      const matchesShift = !this.shiftFilter || s.shift === this.shiftFilter;
      return matchesSearch && matchesShift;
    });
  }

  selectStaff(staff: any) {
    console.log('Staff selected:', staff);
  }

  handleFormSubmit(formData: any) {
    const payload = {
      username: formData.username,
      password: formData.password,
      name: formData.name,
      email: formData.email,
      department: formData.department || 'General',
      shift: formData.shift || 'Morning',
      yearsOfExperience: Number(formData.yearsOfExperience) || 0,
      phoneNumber: formData.phone || ''
    };

    this.api.http.post<any>(`${this.api.getApiBase()}/auth/register/nurse`, payload).subscribe({
      next: (res) => {
        if (res?.success) {
          this.toastService.success('Staff registered successfully');
          this.showAddModal = false;
          this.store.dispatch(StaffActions.loadStaff());
        } else {
          this.toastService.error(res?.message || 'Failed to register staff');
        }
      },
      error: (err) => {
        const msg = err?.error?.message || '';
        this.toastService.error(msg || 'Failed to register staff. Please try again.');
      }
    });
  }

  closeModal() {
    this.showAddModal = false;
  }
}
