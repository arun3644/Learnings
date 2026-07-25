import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AppointmentsActions } from './appointments.actions';
import { AppointmentService } from '../../services/appointment.service';

@Injectable()
export class AppointmentsEffects {
  // Load all appointments
  loadAppointments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppointmentsActions.loadAppointments),
      switchMap(() =>
        this.appointmentService.getAllAppointments().pipe(
          map(appointments => AppointmentsActions.loadAppointmentsSuccess({ appointments })),
          catchError(error => of(AppointmentsActions.loadAppointmentsFailure({ 
            error: error.error?.message || error.message || 'Failed to load appointments' 
          })))
        )
      )
    )
  );

  // Get appointment by ID
  getAppointment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppointmentsActions.getAppointment),
      switchMap(({ id }) =>
        this.appointmentService.getAppointmentById(id).pipe(
          map(appointment => AppointmentsActions.getAppointmentSuccess({ appointment })),
          catchError(error => of(AppointmentsActions.getAppointmentFailure({ 
            error: error.error?.message || error.message || 'Failed to get appointment' 
          })))
        )
      )
    )
  );

  // Book appointment
  bookAppointment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppointmentsActions.bookAppointment),
      switchMap(({ data }) =>
        this.appointmentService.bookAppointment(data).pipe(
          map(response => {
            if (response.success && response.appointment) {
              return AppointmentsActions.bookAppointmentSuccess({ 
                appointment: response.appointment, 
                message: response.message 
              });
            } else {
              return AppointmentsActions.bookAppointmentFailure({ 
                error: response.message || 'Failed to book appointment' 
              });
            }
          }),
          catchError(error => of(AppointmentsActions.bookAppointmentFailure({ 
            error: error.error?.message || error.message || 'Failed to book appointment' 
          })))
        )
      )
    )
  );

  // Update appointment
  updateAppointment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppointmentsActions.updateAppointment),
      switchMap(({ id, data }) =>
        this.appointmentService.updateAppointment(id, data).pipe(
          map(response => {
            if (response.success && response.appointment) {
              return AppointmentsActions.updateAppointmentSuccess({ 
                appointment: response.appointment, 
                message: response.message 
              });
            } else {
              return AppointmentsActions.updateAppointmentFailure({ 
                error: response.message || 'Failed to update appointment' 
              });
            }
          }),
          catchError(error => of(AppointmentsActions.updateAppointmentFailure({ 
            error: error.error?.message || error.message || 'Failed to update appointment' 
          })))
        )
      )
    )
  );

  // Delete appointment
  deleteAppointment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppointmentsActions.deleteAppointment),
      switchMap(({ id }) =>
        this.appointmentService.deleteAppointment(id).pipe(
          map(response => {
            if (response.success) {
              return AppointmentsActions.deleteAppointmentSuccess({ 
                id, 
                message: response.message 
              });
            } else {
              return AppointmentsActions.deleteAppointmentFailure({ 
                error: response.message || 'Failed to delete appointment' 
              });
            }
          }),
          catchError(error => of(AppointmentsActions.deleteAppointmentFailure({ 
            error: error.error?.message || error.message || 'Failed to delete appointment' 
          })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions, 
    private appointmentService: AppointmentService
  ) {}
}
