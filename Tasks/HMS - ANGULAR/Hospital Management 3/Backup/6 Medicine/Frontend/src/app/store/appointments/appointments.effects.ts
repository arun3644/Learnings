import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AppointmentsActions } from './appointments.actions';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class AppointmentsEffects {
  loadAppointments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppointmentsActions.loadAppointments),
      switchMap(() => {
        const currentUser = this.authService.getCurrentUser();
        const request = currentUser?.role === 'Doctor' && currentUser.id
          ? this.api.http.get<any[]>(`${this.api.getApiBase()}/doctors/${currentUser.id}/appointments`)
          : this.api.getAll<any[]>('appointments');
        return request.pipe(
          map(appointments => AppointmentsActions.loadAppointmentsSuccess({ appointments: appointments || [] })),
          catchError(error => of(AppointmentsActions.loadAppointmentsFailure({ error: error.message })))
        );
      })
    )
  );
  constructor(private actions$: Actions, private api: ApiService, private authService: AuthService) {}
}
