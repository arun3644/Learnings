import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ManageDoctorsComponent } from './components/manage-doctors/manage-doctors.component';
import { ManagePatientsComponent } from './components/manage-patients/manage-patients.component';
import { ManageNursesComponent } from './components/manage-nurses/manage-nurses.component';
import { ManageAppointmentsComponent } from './components/manage-appointments/manage-appointments.component';
import { StatisticsComponent } from './components/statistics/statistics.component';

export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'doctors', component: ManageDoctorsComponent },
      { path: 'patients', component: ManagePatientsComponent },
      { path: 'nurses', component: ManageNursesComponent },
      { path: 'appointments', component: ManageAppointmentsComponent },
      { path: 'statistics', component: StatisticsComponent }
    ]
  }
];
