import { createReducer, on } from '@ngrx/store';
import { initialTimeSlotState } from './time-slot.state';
import * as TimeSlotActions from './time-slot.actions';

export const timeSlotReducer = createReducer(
  initialTimeSlotState,
  on(TimeSlotActions.loadTimeSlots, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TimeSlotActions.loadTimeSlotsSuccess, (state, { timeSlots }) => ({
    ...state,
    timeSlots,
    loading: false,
    error: null
  })),
  on(TimeSlotActions.loadTimeSlotsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(TimeSlotActions.generateTimeSlots, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TimeSlotActions.generateTimeSlotsSuccess, (state) => ({
    ...state,
    loading: false,
    error: null
  })),
  on(TimeSlotActions.generateTimeSlotsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
