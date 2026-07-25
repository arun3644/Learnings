import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { API_ENDPOINTS } from '../../core/constants/api.constants';
import * as DashboardActions from './dashboard.actions';

@Injectable()
export class DashboardEffects {
  private actions$ = inject(Actions);
  private http = inject(HttpClient);

  loadDashboardStats$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.loadDashboardStats),
      switchMap(({ role, userId }) => {
        let endpoint = '';
        switch (role.toUpperCase()) {
          case 'ADMIN':
            endpoint = `${API_ENDPOINTS.ADMINS}/dashboard-stats`;
            break;
          case 'DOCTOR':
            endpoint = `${API_ENDPOINTS.DOCTORS}/${userId}/dashboard-stats`;
            break;
          case 'PATIENT':
            endpoint = `${API_ENDPOINTS.PATIENTS}/${userId}/dashboard-stats`;
            break;
          case 'NURSE':
            endpoint = `${API_ENDPOINTS.NURSES}/${userId}/dashboard-stats`;
            break;
          default:
            return of(DashboardActions.loadDashboardStatsFailure({ error: 'Invalid role' }));
        }

        return this.http.get<any>(endpoint).pipe(
          map((response) => DashboardActions.loadDashboardStatsSuccess({ stats: response.stats || response })),
          catchError((error) =>
            of(DashboardActions.loadDashboardStatsFailure({ error: error.message }))
          )
        );
      })
    )
  );
}
