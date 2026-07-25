import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectAllDoctors, selectDoctorsLoading, selectMetaData, selectPageHeader } from '../../store/doctors/doctors.selectors';
import { DoctorsActions } from '../../store/doctors/doctors.actions';
import { ButtonComponent } from '../button/button.component';
import { InputComponent } from '../input/input.component';
import { SelectComponent } from '../select/select.component';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent, InputComponent, SelectComponent],
  templateUrl: './doctors.component.html'
})
export class DoctorsComponent implements OnInit {
  meta$ = this.store.select(selectMetaData);
  doctors$ = this.store.select(selectAllDoctors);
  loading$ = this.store.select(selectDoctorsLoading);
  searchQuery = '';
  specializationFilter = '';
  specializations: string[] = [];
  pageHeader$: {} = this.store.select(selectPageHeader);
  showAddModal = false;

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(DoctorsActions.loadMetadata());
    this.store.dispatch(DoctorsActions.loadDoctors());

    this.doctors$.subscribe(d => {
      this.specializations = [...new Set(d.map(doc => doc.specialization).filter(Boolean))];
    });
  }

  handleButtonClick(action: any) {
    console.log('Button clicked:', action);
    this.showAddModal = true;
  }

  filterDoctors(doctors: any[]): any[] {
    return doctors.filter(d => {
      const q = this.searchQuery.toLowerCase();
      const matchesSearch = !q ||
        d.name?.toLowerCase().includes(q) ||
        d.doctorId?.toLowerCase().includes(q) ||
        d.specialization?.toLowerCase().includes(q) ||
        d.email?.toLowerCase().includes(q);
      const matchesSpec = !this.specializationFilter || d.specialization === this.specializationFilter;
      return matchesSearch && matchesSpec;
    });
  }

  getInitials(name: string): string {
    return (name || '').split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
  }
  
  selectDoctor(doctor: any){

  }
}
