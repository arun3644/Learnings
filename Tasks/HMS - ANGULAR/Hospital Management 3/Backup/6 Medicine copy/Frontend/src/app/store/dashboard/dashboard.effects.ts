import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { DashboardActions } from './dashboard.actions';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class DashboardEffects {
  loadStats$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.loadStats),
      switchMap(() => {
        const currentUser = this.authService.getCurrentUser();
        if (!currentUser) {
          return of(DashboardActions.loadStatsFailure({ error: 'User not authenticated' }));
        }

        let statsRequest = this.api.http.get<any>(`${this.api.getApiBase()}/admins/dashboard-stats`);
        if (currentUser.role === 'Doctor') {
          statsRequest = this.api.http.get<any>(`${this.api.getApiBase()}/doctors/${currentUser.id}/dashboard-stats`);
        } else if (currentUser.role === 'Patient') {
          statsRequest = this.api.http.get<any>(`${this.api.getApiBase()}/patients/${currentUser.id}/dashboard-stats`);
        }

        return statsRequest.pipe(
          map(response => {
            const stats = response?.stats || {};
            const enrichedStats = {
              ...stats,
              recentActivity: response?.recentActivity || [],
              upcomingAppointments: response?.upcomingAppointments || [],
              criticalPatients: response?.criticalPatients || [],
              todaySchedule: response?.todaySchedule || []
            };
            return DashboardActions.loadStatsSuccess({ stats: enrichedStats });
          }),
          catchError(error => of(DashboardActions.loadStatsFailure({ error: error.message })))
        );
      })
    )
  );
  
  constructor(private actions$: Actions, private api: ApiService, private authService: AuthService) {}
}
