import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';

import { authReducer } from './store/auth/auth.reducer';
import { doctorReducer } from './store/doctor/doctor.reducer';
import { patientReducer } from './store/patient/patient.reducer';
import { appointmentReducer } from './store/appointment/appointment.reducer';
import { nurseReducer } from './store/nurse/nurse.reducer';
import { adminReducer } from './store/admin/admin.reducer';
import { timeSlotReducer } from './store/time-slot/time-slot.reducer';
import { dashboardReducer } from './store/dashboard/dashboard.reducer';

import { AuthEffects } from './store/auth/auth.effects';
import { DoctorEffects } from './store/doctor/doctor.effects';
import { PatientEffects } from './store/patient/patient.effects';
import { AppointmentEffects } from './store/appointment/appointment.effects';
import { NurseEffects } from './store/nurse/nurse.effects';
import { AdminEffects } from './store/admin/admin.effects';
import { TimeSlotEffects } from './store/time-slot/time-slot.effects';
import { DashboardEffects } from './store/dashboard/dashboard.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor, errorInterceptor])
    ),
    provideStore({
      auth: authReducer,
      doctor: doctorReducer,
      patient: patientReducer,
      appointment: appointmentReducer,
      nurse: nurseReducer,
      admin: adminReducer,
      timeSlot: timeSlotReducer,
      dashboard: dashboardReducer
    }),
    provideEffects([
      AuthEffects,
      DoctorEffects,
      PatientEffects,
      AppointmentEffects,
      NurseEffects,
      AdminEffects,
      TimeSlotEffects,
      DashboardEffects
    ]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode()
    })
  ]
};
