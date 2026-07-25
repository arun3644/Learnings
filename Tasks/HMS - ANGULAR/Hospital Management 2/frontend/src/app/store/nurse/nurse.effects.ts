import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { API_ENDPOINTS } from '../../core/constants/api.constants';
import * as NurseActions from './nurse.actions';

@Injectable()
export class NurseEffects {
  private actions$ = inject(Actions);
  private http = inject(HttpClient);

  loadNurses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NurseActions.loadNurses),
      switchMap(() =>
        this.http.get<any[]>(API_ENDPOINTS.NURSES).pipe(
          map((nurses) => NurseActions.loadNursesSuccess({ nurses })),
          catchError((error) =>
            of(NurseActions.loadNursesFailure({ error: error.message }))
          )
        )
      )
    )
  );

  loadNurse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NurseActions.loadNurse),
      switchMap(({ id }) =>
        this.http.get<any>(`${API_ENDPOINTS.NURSES}/${id}`).pipe(
          map((nurse) => NurseActions.loadNurseSuccess({ nurse })),
          catchError((error) =>
            of(NurseActions.loadNurseFailure({ error: error.message }))
          )
        )
      )
    )
  );

  updateNurse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NurseActions.updateNurse),
      switchMap(({ id, nurse }) =>
        this.http.put<any>(`${API_ENDPOINTS.NURSES}/${id}`, nurse).pipe(
          map((updatedNurse) => NurseActions.updateNurseSuccess({ nurse: updatedNurse })),
          catchError((error) =>
            of(NurseActions.updateNurseFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
