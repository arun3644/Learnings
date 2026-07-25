import { Routes } from '@angular/router';
import { PatientLayoutComponent } from './components/patient-layout/patient-layout.component';
import { PatientDashboardComponent } from './components/patient-dashboard/patient-dashboard.component';
import { PatientProfileComponent } from './components/patient-profile/patient-profile.component';
import { BookAppointmentComponent } from './components/book-appointment/book-appointment.component';
import { MyAppointmentsComponent } from './components/my-appointments/my-appointments.component';
import { DoctorsListComponent } from './components/doctors-list/doctors-list.component';
import { AppointmentHistoryComponent } from './components/appointment-history/appointment-history.component';

export const patientRoutes: Routes = [
  {
    path: '',
    component: PatientLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: PatientDashboardComponent },
      { path: 'profile', component: PatientProfileComponent },
      { path: 'book', component: BookAppointmentComponent },
      { path: 'appointments', component: MyAppointmentsComponent },
      { path: 'doctors', component: DoctorsListComponent },
      { path: 'history', component: AppointmentHistoryComponent }
    ]
  }
];
