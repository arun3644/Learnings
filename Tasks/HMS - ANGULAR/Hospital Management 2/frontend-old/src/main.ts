import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { AuthInterceptor } from './app/services/auth.interceptor';

import { dashboardReducer }    from './app/store/dashboard/dashboard.reducer';
import { patientsReducer }     from './app/store/patients/patients.reducer';
import { appointmentsReducer } from './app/store/appointments/appointments.reducer';
import { loginReducer } from './app/store/login/login.reducer';
import { doctorsReducer } from './app/store/doctors/doctors.reducer';
import { adminReducer } from './app/store/admin/admin.reducer';
import { nursesReducer } from './app/store/nurses/nurses.reducer';
import { statisticsReducer } from './app/store/statistics/statistics.reducer';

import { LoginEffects } from './app/store/login/login.effects';
import { DashboardEffects }    from './app/store/dashboard/dashboard.effects';
import { PatientsEffects }     from './app/store/patients/patients.effects';
import { AppointmentsEffects } from './app/store/appointments/appointments.effects';
import { DoctorsEffects } from './app/store/doctors/doctors.effects';
import { AdminEffects } from './app/store/admin/admin.effects';
import { NursesEffects } from './app/store/nurses/nurses.effects';
import { StatisticsEffects } from './app/store/statistics/statistics.effects';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideStore({
      login:        loginReducer,
      dashboard:    dashboardReducer,
      patients:     patientsReducer,
      appointments: appointmentsReducer,
      doctors:      doctorsReducer,
      admin:        adminReducer,
      nurses:       nursesReducer,
      statistics:   statisticsReducer,
    }),
    provideEffects([
      LoginEffects,
      DashboardEffects,
      PatientsEffects,
      AppointmentsEffects,
      DoctorsEffects,
      AdminEffects,
      NursesEffects,
      StatisticsEffects,
    ]),
    provideStoreDevtools({ maxAge: 25, logOnly: false })
  ]
});

