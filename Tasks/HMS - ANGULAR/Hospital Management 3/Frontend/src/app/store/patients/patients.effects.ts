import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { PatientsActions } from './patients.actions';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class PatientsEffects {
  loadPatients$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PatientsActions.loadPatients),
      switchMap(() => {
        const currentUser = this.authService.getCurrentUser();
        if (currentUser?.role === 'Patient') {
          return of(PatientsActions.loadPatientsSuccess({ patients: [] }));
        }
        return this.api.getAll<any[]>('patients').pipe(
          map(patients => PatientsActions.loadPatientsSuccess({ patients: patients || [] })),
          catchError(error => of(PatientsActions.loadPatientsFailure({ error: error.message })))
        );
      })
    )
  );

  loadMetaData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PatientsActions.loadMetadata),
      switchMap(() => {
        return this.api.getMetadata<any>('patients').pipe(
          map(metadata => PatientsActions.loadMetadataSuccess({ metaData: metadata || {} })),
          catchError(error => of(PatientsActions.loadPatientsFailure({ error: error.message })))
        );
      })
    )
  );

  constructor(private actions$: Actions, private api: ApiService, private authService: AuthService) {}
}
