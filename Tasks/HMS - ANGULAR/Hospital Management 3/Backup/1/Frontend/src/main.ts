import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
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

import { LoginEffects } from './app/store/login/login.effects';
import { DashboardEffects }    from './app/store/dashboard/dashboard.effects';
import { PatientsEffects }     from './app/store/patients/patients.effects';
import { AppointmentsEffects } from './app/store/appointments/appointments.effects';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([AuthInterceptor])),
    provideStore({
      login:        loginReducer,
      dashboard:    dashboardReducer,
      patients:     patientsReducer,
      appointments: appointmentsReducer,
    }),
    provideEffects([
      LoginEffects,
      DashboardEffects,
      PatientsEffects,
      AppointmentsEffects,
    ]),
    provideStoreDevtools({ maxAge: 25, logOnly: false })
  ]
});
