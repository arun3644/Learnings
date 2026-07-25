import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, mergeMap } from 'rxjs/operators';
import { of, forkJoin } from 'rxjs';
import { StatisticsActions } from './statistics.actions';
import { StatisticsService } from '../../services/statistics.service';

@Injectable()
export class StatisticsEffects {
  // Get total patients
  getTotalPatients$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StatisticsActions.getTotalPatients),
      switchMap(() =>
        this.statisticsService.getTotalPatients().pipe(
          map(response => StatisticsActions.getTotalPatientsSuccess({ count: response.count })),
          catchError(error => of(StatisticsActions.getTotalPatientsFailure({ 
            error: error.error?.message || error.message || 'Failed to get total patients' 
          })))
        )
      )
    )
  );

  // Get total doctors
  getTotalDoctors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StatisticsActions.getTotalDoctors),
      switchMap(() =>
        this.statisticsService.getTotalDoctors().pipe(
          map(response => StatisticsActions.getTotalDoctorsSuccess({ count: response.count })),
          catchError(error => of(StatisticsActions.getTotalDoctorsFailure({ 
            error: error.error?.message || error.message || 'Failed to get total doctors' 
          })))
        )
      )
    )
  );

  // Get total appointments
  getTotalAppointments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StatisticsActions.getTotalAppointments),
      switchMap(() =>
        this.statisticsService.getTotalAppointments().pipe(
          map(response => StatisticsActions.getTotalAppointmentsSuccess({ count: response.count })),
          catchError(error => of(StatisticsActions.getTotalAppointmentsFailure({ 
            error: error.error?.message || error.message || 'Failed to get total appointments' 
          })))
        )
      )
    )
  );

  // Get appointments by status
  getAppointmentsByStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StatisticsActions.getAppointmentsByStatus),
      switchMap(({ status }) =>
        this.statisticsService.getAppointmentsByStatus(status).pipe(
          map(appointments => StatisticsActions.getAppointmentsByStatusSuccess({ 
            appointments, 
            status 
          })),
          catchError(error => of(StatisticsActions.getAppointmentsByStatusFailure({ 
            error: error.error?.message || error.message || 'Failed to get appointments by status' 
          })))
        )
      )
    )
  );

  // Get today's appointments
  getTodayAppointments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StatisticsActions.getTodayAppointments),
      switchMap(() =>
        this.statisticsService.getTodayAppointments().pipe(
          map(appointments => StatisticsActions.getTodayAppointmentsSuccess({ appointments })),
          catchError(error => of(StatisticsActions.getTodayAppointmentsFailure({ 
            error: error.error?.message || error.message || 'Failed to get today appointments' 
          })))
        )
      )
    )
  );

  // Get upcoming appointments
  getUpcomingAppointments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StatisticsActions.getUpcomingAppointments),
      switchMap(() =>
        this.statisticsService.getUpcomingAppointments().pipe(
          map(appointments => StatisticsActions.getUpcomingAppointmentsSuccess({ appointments })),
          catchError(error => of(StatisticsActions.getUpcomingAppointmentsFailure({ 
            error: error.error?.message || error.message || 'Failed to get upcoming appointments' 
          })))
        )
      )
    )
  );

  // Load all statistics at once (parallel requests)
  loadAllStatistics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StatisticsActions.loadAllStatistics),
      mergeMap(() => [
        StatisticsActions.getTotalPatients(),
        StatisticsActions.getTotalDoctors(),
        StatisticsActions.getTotalAppointments(),
        StatisticsActions.getTodayAppointments(),
        StatisticsActions.getUpcomingAppointments()
      ])
    )
  );

  constructor(
    private actions$: Actions,
    private statisticsService: StatisticsService
  ) {}
}
