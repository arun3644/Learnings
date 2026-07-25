import { Routes } from '@angular/router';
import { DoctorLayoutComponent } from './components/doctor-layout/doctor-layout.component';
import { DoctorDashboardComponent } from './components/doctor-dashboard/doctor-dashboard.component';
import { DoctorProfileComponent } from './components/doctor-profile/doctor-profile.component';
import { AppointmentsListComponent } from './components/appointments-list/appointments-list.component';
import { TimeSlotsComponent } from './components/time-slots/time-slots.component';
import { PatientsListComponent } from './components/patients-list/patients-list.component';
import { TodayScheduleComponent } from './components/today-schedule/today-schedule.component';

export const doctorRoutes: Routes = [
  {
    path: '',
    component: DoctorLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DoctorDashboardComponent },
      { path: 'profile', component: DoctorProfileComponent },
      { path: 'appointments', component: AppointmentsListComponent },
      { path: 'time-slots', component: TimeSlotsComponent },
      { path: 'patients', component: PatientsListComponent },
      { path: 'schedule', component: TodayScheduleComponent }
    ]
  }
];
