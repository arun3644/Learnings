import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { PatientsActions } from './patients.actions';
import { PatientService } from '../../services/patient.service';

@Injectable()
export class PatientsEffects {
  // Load all patients
  loadPatients$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PatientsActions.loadPatients),
      switchMap(() =>
        this.patientService.getAllPatients().pipe(
          map(patients => PatientsActions.loadPatientsSuccess({ patients })),
          catchError(error => of(PatientsActions.loadPatientsFailure({ error: error.message })))
        )
      )
    )
  );

  // Load patient by ID
  loadPatientById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PatientsActions.loadPatientById),
      switchMap(({ id }) =>
        this.patientService.getPatientById(id).pipe(
          map(patient => PatientsActions.loadPatientByIdSuccess({ patient })),
          catchError(error => of(PatientsActions.loadPatientByIdFailure({ error: error.message })))
        )
      )
    )
  );

  // Load patient dashboard stats
  loadPatientDashboardStats$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PatientsActions.loadPatientDashboardStats),
      switchMap(({ patientId }) =>
        this.patientService.getPatientDashboardStats(patientId).pipe(
          map(stats => PatientsActions.loadPatientDashboardStatsSuccess({ stats })),
          catchError(error => of(PatientsActions.loadPatientDashboardStatsFailure({ error: error.message })))
        )
      )
    )
  );

  // Update patient
  updatePatient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PatientsActions.updatePatient),
      switchMap(({ id, data }) =>
        this.patientService.updatePatient(id, data).pipe(
          map(patient => PatientsActions.updatePatientSuccess({ patient })),
          catchError(error => of(PatientsActions.updatePatientFailure({ error: error.message })))
        )
      )
    )
  );

  // Delete patient
  deletePatient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PatientsActions.deletePatient),
      switchMap(({ id }) =>
        this.patientService.deletePatient(id).pipe(
          map(() => PatientsActions.deletePatientSuccess({ id })),
          catchError(error => of(PatientsActions.deletePatientFailure({ error: error.message })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions, 
    private patientService: PatientService
  ) {}
}
