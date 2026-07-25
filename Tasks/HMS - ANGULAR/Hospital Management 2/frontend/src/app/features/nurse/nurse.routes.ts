import { Routes } from '@angular/router';
import { NurseLayoutComponent } from './components/nurse-layout/nurse-layout.component';
import { NurseDashboardComponent } from './components/nurse-dashboard/nurse-dashboard.component';
import { NurseProfileComponent } from './components/nurse-profile/nurse-profile.component';
import { PatientCareComponent } from './components/patient-care/patient-care.component';

export const nurseRoutes: Routes = [
  {
    path: '',
    component: NurseLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: NurseDashboardComponent },
      { path: 'profile', component: NurseProfileComponent },
      { path: 'patient-care', component: PatientCareComponent }
    ]
  }
];
