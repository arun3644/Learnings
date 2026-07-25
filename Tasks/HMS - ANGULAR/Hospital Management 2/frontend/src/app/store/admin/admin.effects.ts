import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { API_ENDPOINTS } from '../../core/constants/api.constants';
import * as AdminActions from './admin.actions';

@Injectable()
export class AdminEffects {
  private actions$ = inject(Actions);
  private http = inject(HttpClient);

  loadAdmins$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.loadAdmins),
      switchMap(() =>
        this.http.get<any[]>(API_ENDPOINTS.ADMINS).pipe(
          map((admins) => AdminActions.loadAdminsSuccess({ admins })),
          catchError((error) =>
            of(AdminActions.loadAdminsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  loadAdmin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.loadAdmin),
      switchMap(({ id }) =>
        this.http.get<any>(`${API_ENDPOINTS.ADMINS}/${id}`).pipe(
          map((admin) => AdminActions.loadAdminSuccess({ admin })),
          catchError((error) =>
            of(AdminActions.loadAdminFailure({ error: error.message }))
          )
        )
      )
    )
  );

  updateAdmin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.updateAdmin),
      switchMap(({ id, admin }) =>
        this.http.put<any>(`${API_ENDPOINTS.ADMINS}/${id}`, admin).pipe(
          map((updatedAdmin) => AdminActions.updateAdminSuccess({ admin: updatedAdmin })),
          catchError((error) =>
            of(AdminActions.updateAdminFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
