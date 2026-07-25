import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { API_ENDPOINTS } from '../../core/constants/api.constants';
import * as DoctorActions from './doctor.actions';

@Injectable()
export class DoctorEffects {
  private actions$ = inject(Actions);
  private http = inject(HttpClient);

  loadDoctors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DoctorActions.loadDoctors),
      switchMap(() =>
        this.http.get<any[]>(API_ENDPOINTS.DOCTORS).pipe(
          map((doctors) => DoctorActions.loadDoctorsSuccess({ doctors })),
          catchError((error) =>
            of(DoctorActions.loadDoctorsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  loadDoctor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DoctorActions.loadDoctor),
      switchMap(({ id }) =>
        this.http.get<any>(`${API_ENDPOINTS.DOCTORS}/${id}`).pipe(
          map((doctor) => DoctorActions.loadDoctorSuccess({ doctor })),
          catchError((error) =>
            of(DoctorActions.loadDoctorFailure({ error: error.message }))
          )
        )
      )
    )
  );

  updateDoctor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DoctorActions.updateDoctor),
      switchMap(({ id, doctor }) =>
        this.http.put<any>(`${API_ENDPOINTS.DOCTORS}/${id}`, doctor).pipe(
          map((updatedDoctor) => DoctorActions.updateDoctorSuccess({ doctor: updatedDoctor })),
          catchError((error) =>
            of(DoctorActions.updateDoctorFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
