import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { StaffActions } from './staff.actions';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class StaffEffects {
  loadStaff$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StaffActions.loadStaff),
      switchMap(() => {
        const currentUser = this.authService.getCurrentUser();
        if (currentUser?.role === 'Nurse') {
          return of(StaffActions.loadStaffSuccess({ staff: [] }));
        }
        return this.api.getAll<any[]>('nurses').pipe(
          map(staff => StaffActions.loadStaffSuccess({ staff: staff || [] })),
          catchError(error => of(StaffActions.loadStaffFailure({ error: error.message })))
        );
      })
    )
  );

  loadMetaData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StaffActions.loadMetadata),
      switchMap(() => {
        return this.api.getMetadata<any>('staff').pipe(
          map(metadata => StaffActions.loadMetadataSuccess({ metaData: metadata || {} })),
          catchError(error => of(StaffActions.loadStaffFailure({ error: error.message })))
        );
      })
    )
  );

  constructor(private actions$: Actions, private api: ApiService, private authService: AuthService) {}
}
