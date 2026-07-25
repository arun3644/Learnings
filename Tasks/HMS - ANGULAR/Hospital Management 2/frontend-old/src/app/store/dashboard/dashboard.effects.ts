import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of, forkJoin } from 'rxjs';
import { DashboardActions } from './dashboard.actions';
import { StatisticsService } from '../../services/statistics.service';

@Injectable()
export class DashboardEffects {
  loadStats$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.loadStats),
      switchMap(() =>
        forkJoin({
          totalPatients: this.statisticsService.getTotalPatients().pipe(catchError(() => of({ success: false, count: 0 }))),
          totalDoctors: this.statisticsService.getTotalDoctors().pipe(catchError(() => of({ success: false, count: 0 }))),
          totalAppointments: this.statisticsService.getTotalAppointments().pipe(catchError(() => of({ success: false, count: 0 }))),
          todayAppointments: this.statisticsService.getTodayAppointments().pipe(catchError(() => of([]))),
          upcomingAppointments: this.statisticsService.getUpcomingAppointments().pipe(catchError(() => of([])))
        }).pipe(
          map(results => {
            const stats = {
              totalPatients: results.totalPatients.count,
              myPatients: results.totalPatients.count,
              patients: results.totalPatients.count,
              
              totalDoctors: results.totalDoctors.count,
              doctors: results.totalDoctors.count,
              
              totalAppointments: results.totalAppointments.count,
              appointments: results.todayAppointments.length,
              
              todayAppointments: results.todayAppointments.length,
              todayAppointmentsList: results.todayAppointments,
              
              upcomingAppointments: results.upcomingAppointments.length,
              upcomingAppointmentsList: results.upcomingAppointments,
              
              totalStaff: 0,
              availableBeds: 0,
              pendingBills: 0,
              bills: 0,
              medicinesInStock: 0,
              medicines: 0,
              reports: 0,
              tests: 0,
              completed: 0,
              prescriptions: 0,
              pendingReports: 0,
              
               recentActivity: []
            };
            
            return DashboardActions.loadStatsSuccess({ stats });
          }),
          catchError(error => {
             console.warn('Failed to load statistics, using empty stats:', error);
            return of(DashboardActions.loadStatsSuccess({ 
              stats: {
                totalPatients: 0,
                myPatients: 0,
                patients: 0,
                totalDoctors: 0,
                doctors: 0,
                totalAppointments: 0,
                appointments: 0,
                todayAppointments: 0,
                todayAppointmentsList: [],
                upcomingAppointments: 0,
                upcomingAppointmentsList: [],
                totalStaff: 0,
                availableBeds: 0,
                pendingBills: 0,
                bills: 0,
                medicinesInStock: 0,
                medicines: 0,
                reports: 0,
                tests: 0,
                completed: 0,
                prescriptions: 0,
                pendingReports: 0,
                recentActivity: []
              }
            }));
          })
        )
      )
    )
  );
  
  constructor(
    private actions$: Actions,
    private statisticsService: StatisticsService
  ) {}
}
