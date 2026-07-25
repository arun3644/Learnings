import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { TimeSlotAction } from './timeSlots.actions';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class TimeSlotsEffects {
    loadAvailableTimeSlots$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TimeSlotAction.getAvailableTimeSlots),
            switchMap((req) => {
                const request = this.api.get(req.avlbSlotUrl);
                return request.pipe(
                    map(timeSlots => TimeSlotAction.loadAvailableTimeSlotsSuccess({ timeSlots : timeSlots|| [] })),
                    catchError(error => of(TimeSlotAction.loadTimeSlotsFailure({ error: error.message })))
                );
            })
        ),
    );
    loadBookedTimeSlots$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TimeSlotAction.getBookedTimeSlots),
            switchMap((req) => {
                const request = this.api.get(req.bookedSlotUrl);
                return request.pipe(
                    map(timeSlots => TimeSlotAction.loadBookedTimeSlotsSuccess({ timeSlots : timeSlots|| [] })),
                    catchError(error => of(TimeSlotAction.loadTimeSlotsFailure({ error: error.message })))
                );
            })
        ),
    );
    constructor(private actions$: Actions, private api: ApiService, private authService: AuthService) { }
}
