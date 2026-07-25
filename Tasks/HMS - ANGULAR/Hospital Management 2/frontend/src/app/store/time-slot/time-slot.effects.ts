import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { API_ENDPOINTS } from '../../core/constants/api.constants';
import * as TimeSlotActions from './time-slot.actions';

@Injectable()
export class TimeSlotEffects {
  private actions$ = inject(Actions);
  private http = inject(HttpClient);

  loadTimeSlots$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TimeSlotActions.loadTimeSlots),
      switchMap(({ doctorId, date }) =>
        this.http.get<any[]>(`${API_ENDPOINTS.DOCTORS}/${doctorId}/available-slots?date=${date}`).pipe(
          map((timeSlots) => TimeSlotActions.loadTimeSlotsSuccess({ timeSlots })),
          catchError((error) =>
            of(TimeSlotActions.loadTimeSlotsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  generateTimeSlots$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TimeSlotActions.generateTimeSlots),
      switchMap(({ doctorId }) =>
        this.http.get<any>(`${API_ENDPOINTS.DOCTORS}/${doctorId}/generate-slots`).pipe(
          map((response) => TimeSlotActions.generateTimeSlotsSuccess({ message: response.message })),
          catchError((error) =>
            of(TimeSlotActions.generateTimeSlotsFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
