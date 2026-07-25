import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import * as AdminActions from './admin.actions';
import { AdminService } from '../../services/admin.service';

@Injectable()
export class AdminEffects {
  // Load all admins
  loadAdmins$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.loadAdmins),
      switchMap(() =>
        this.adminService.getAllAdmins().pipe(
          map((admins) => AdminActions.loadAdminsSuccess({ admins })),
          catchError((error) =>
            of(AdminActions.loadAdminsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // Load admin by ID
  loadAdminById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.loadAdminById),
      switchMap(({ id }) =>
        this.adminService.getAdminById(id).pipe(
          map((admin) => AdminActions.loadAdminByIdSuccess({ admin })),
          catchError((error) =>
            of(AdminActions.loadAdminByIdFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // Load dashboard stats
  loadAdminDashboardStats$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.loadAdminDashboardStats),
      switchMap(() =>
        this.adminService.getAdminDashboardStats().pipe(
          map((stats) => AdminActions.loadAdminDashboardStatsSuccess({ stats })),
          catchError((error) =>
            of(AdminActions.loadAdminDashboardStatsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // Update admin
  updateAdmin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.updateAdmin),
      switchMap(({ id, data }) =>
        this.adminService.updateAdmin(id, data).pipe(
          map((admin) => AdminActions.updateAdminSuccess({ admin })),
          catchError((error) =>
            of(AdminActions.updateAdminFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // Delete admin
  deleteAdmin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.deleteAdmin),
      switchMap(({ id }) =>
        this.adminService.deleteAdmin(id).pipe(
          map(() => AdminActions.deleteAdminSuccess({ id })),
          catchError((error) =>
            of(AdminActions.deleteAdminFailure({ error: error.message }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private adminService: AdminService
  ) {}
}
