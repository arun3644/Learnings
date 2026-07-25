import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import * as DoctorsActions from './doctors.actions';
import { DoctorService } from '../../services/doctor.service';

@Injectable()
export class DoctorsEffects {
  // Load all doctors
  loadDoctors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DoctorsActions.loadDoctors),
      switchMap(() =>
        this.doctorService.getAllDoctors().pipe(
          map((doctors) => DoctorsActions.loadDoctorsSuccess({ doctors })),
          catchError((error) =>
            of(DoctorsActions.loadDoctorsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // Load doctor by ID
  loadDoctorById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DoctorsActions.loadDoctorById),
      switchMap(({ id }) =>
        this.doctorService.getDoctorById(id).pipe(
          map((doctor) => DoctorsActions.loadDoctorByIdSuccess({ doctor })),
          catchError((error) =>
            of(DoctorsActions.loadDoctorByIdFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // Load dashboard stats
  loadDoctorDashboardStats$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DoctorsActions.loadDoctorDashboardStats),
      switchMap(({ doctorId }) =>
        this.doctorService.getDoctorDashboardStats(doctorId).pipe(
          map((stats) => DoctorsActions.loadDoctorDashboardStatsSuccess({ stats })),
          catchError((error) =>
            of(DoctorsActions.loadDoctorDashboardStatsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // Load available slots
  loadAvailableSlots$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DoctorsActions.loadAvailableSlots),
      switchMap(({ doctorId, date }) =>
        this.doctorService.getAvailableSlots(doctorId, date).pipe(
          map((slots) => DoctorsActions.loadAvailableSlotsSuccess({ slots })),
          catchError((error) =>
            of(DoctorsActions.loadAvailableSlotsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // Load doctor appointments
  loadDoctorAppointments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DoctorsActions.loadDoctorAppointments),
      switchMap(({ doctorId }) =>
        this.doctorService.getDoctorAppointments(doctorId).pipe(
          map((appointments) =>
            DoctorsActions.loadDoctorAppointmentsSuccess({ appointments })
          ),
          catchError((error) =>
            of(DoctorsActions.loadDoctorAppointmentsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // Update doctor
  updateDoctor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DoctorsActions.updateDoctor),
      switchMap(({ id, data }) =>
        this.doctorService.updateDoctor(id, data).pipe(
          map((doctor) => DoctorsActions.updateDoctorSuccess({ doctor })),
          catchError((error) =>
            of(DoctorsActions.updateDoctorFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // Delete doctor
  deleteDoctor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DoctorsActions.deleteDoctor),
      switchMap(({ id }) =>
        this.doctorService.deleteDoctor(id).pipe(
          map(() => DoctorsActions.deleteDoctorSuccess({ id })),
          catchError((error) =>
            of(DoctorsActions.deleteDoctorFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // Generate slots
  generateSlots$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DoctorsActions.generateSlots),
      switchMap(({ doctorId }) =>
        this.doctorService.generateSlots(doctorId).pipe(
          map(({ message }) => DoctorsActions.generateSlotsSuccess({ message })),
          catchError((error) =>
            of(DoctorsActions.generateSlotsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private doctorService: DoctorService
  ) {}
}
