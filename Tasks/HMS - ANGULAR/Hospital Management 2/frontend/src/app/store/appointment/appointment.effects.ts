import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { API_ENDPOINTS } from '../../core/constants/api.constants';
import * as AppointmentActions from './appointment.actions';

@Injectable()
export class AppointmentEffects {
  private actions$ = inject(Actions);
  private http = inject(HttpClient);

  loadAppointments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppointmentActions.loadAppointments),
      switchMap(() =>
        this.http.get<any[]>(API_ENDPOINTS.APPOINTMENTS).pipe(
          map((appointments) => AppointmentActions.loadAppointmentsSuccess({ appointments })),
          catchError((error) =>
            of(AppointmentActions.loadAppointmentsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  loadAppointment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppointmentActions.loadAppointment),
      switchMap(({ id }) =>
        this.http.get<any>(`${API_ENDPOINTS.APPOINTMENTS}/${id}`).pipe(
          map((appointment) => AppointmentActions.loadAppointmentSuccess({ appointment })),
          catchError((error) =>
            of(AppointmentActions.loadAppointmentFailure({ error: error.message }))
          )
        )
      )
    )
  );

  bookAppointment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppointmentActions.bookAppointment),
      switchMap(({ appointment }) =>
        this.http.post<any>(API_ENDPOINTS.APPOINTMENTS, appointment).pipe(
          map((newAppointment) => AppointmentActions.bookAppointmentSuccess({ appointment: newAppointment })),
          catchError((error) =>
            of(AppointmentActions.bookAppointmentFailure({ error: error.message }))
          )
        )
      )
    )
  );

  updateAppointment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppointmentActions.updateAppointment),
      switchMap(({ id, appointment }) =>
        this.http.put<any>(`${API_ENDPOINTS.APPOINTMENTS}/${id}`, appointment).pipe(
          map((updatedAppointment) => AppointmentActions.updateAppointmentSuccess({ appointment: updatedAppointment })),
          catchError((error) =>
            of(AppointmentActions.updateAppointmentFailure({ error: error.message }))
          )
        )
      )
    )
  );

  deleteAppointment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppointmentActions.deleteAppointment),
      switchMap(({ id }) =>
        this.http.delete(`${API_ENDPOINTS.APPOINTMENTS}/${id}`).pipe(
          map(() => AppointmentActions.deleteAppointmentSuccess({ id })),
          catchError((error) =>
            of(AppointmentActions.deleteAppointmentFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
