import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { API_ENDPOINTS } from '../../core/constants/api.constants';
import * as PatientActions from './patient.actions';

@Injectable()
export class PatientEffects {
  private actions$ = inject(Actions);
  private http = inject(HttpClient);

  loadPatients$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PatientActions.loadPatients),
      switchMap(() =>
        this.http.get<any[]>(API_ENDPOINTS.PATIENTS).pipe(
          map((patients) => PatientActions.loadPatientsSuccess({ patients })),
          catchError((error) =>
            of(PatientActions.loadPatientsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  loadPatient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PatientActions.loadPatient),
      switchMap(({ id }) =>
        this.http.get<any>(`${API_ENDPOINTS.PATIENTS}/${id}`).pipe(
          map((patient) => PatientActions.loadPatientSuccess({ patient })),
          catchError((error) =>
            of(PatientActions.loadPatientFailure({ error: error.message }))
          )
        )
      )
    )
  );

  updatePatient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PatientActions.updatePatient),
      switchMap(({ id, patient }) =>
        this.http.put<any>(`${API_ENDPOINTS.PATIENTS}/${id}`, patient).pipe(
          map((updatedPatient) => PatientActions.updatePatientSuccess({ patient: updatedPatient })),
          catchError((error) =>
            of(PatientActions.updatePatientFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
