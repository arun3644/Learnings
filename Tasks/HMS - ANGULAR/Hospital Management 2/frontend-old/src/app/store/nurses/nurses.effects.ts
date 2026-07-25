import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import * as NursesActions from './nurses.actions';
import { NurseService } from '../../services/nurse.service';

@Injectable()
export class NursesEffects {
  // Load all nurses
  loadNurses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NursesActions.loadNurses),
      switchMap(() =>
        this.nurseService.getAllNurses().pipe(
          map((nurses) => NursesActions.loadNursesSuccess({ nurses })),
          catchError((error) =>
            of(NursesActions.loadNursesFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // Load nurse by ID
  loadNurseById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NursesActions.loadNurseById),
      switchMap(({ id }) =>
        this.nurseService.getNurseById(id).pipe(
          map((nurse) => NursesActions.loadNurseByIdSuccess({ nurse })),
          catchError((error) =>
            of(NursesActions.loadNurseByIdFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // Update nurse
  updateNurse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NursesActions.updateNurse),
      switchMap(({ id, data }) =>
        this.nurseService.updateNurse(id, data).pipe(
          map((nurse) => NursesActions.updateNurseSuccess({ nurse })),
          catchError((error) =>
            of(NursesActions.updateNurseFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // Delete nurse
  deleteNurse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NursesActions.deleteNurse),
      switchMap(({ id }) =>
        this.nurseService.deleteNurse(id).pipe(
          map(() => NursesActions.deleteNurseSuccess({ id })),
          catchError((error) =>
            of(NursesActions.deleteNurseFailure({ error: error.message }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private nurseService: NurseService
  ) {}
}
