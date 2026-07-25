import { createAction, props } from '@ngrx/store';
import { TimeSlot } from '../../core/models/time-slot.model';

export const loadTimeSlots = createAction(
  '[TimeSlot] Load Time Slots',
  props<{ doctorId: number; date: string }>()
);

export const loadTimeSlotsSuccess = createAction(
  '[TimeSlot] Load Time Slots Success',
  props<{ timeSlots: TimeSlot[] }>()
);

export const loadTimeSlotsFailure = createAction(
  '[TimeSlot] Load Time Slots Failure',
  props<{ error: string }>()
);

export const generateTimeSlots = createAction(
  '[TimeSlot] Generate Time Slots',
  props<{ doctorId: number }>()
);

export const generateTimeSlotsSuccess = createAction(
  '[TimeSlot] Generate Time Slots Success',
  props<{ message: string }>()
);

export const generateTimeSlotsFailure = createAction(
  '[TimeSlot] Generate Time Slots Failure',
  props<{ error: string }>()
);
