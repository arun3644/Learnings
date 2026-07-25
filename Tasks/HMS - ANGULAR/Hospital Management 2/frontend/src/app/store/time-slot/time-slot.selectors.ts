import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TimeSlotState } from './time-slot.state';

export const selectTimeSlotState = createFeatureSelector<TimeSlotState>('timeSlot');

export const selectAllTimeSlots = createSelector(
  selectTimeSlotState,
  (state) => state.timeSlots
);

export const selectAvailableTimeSlots = createSelector(
  selectAllTimeSlots,
  (timeSlots) => timeSlots.filter(slot => slot.isAvailable)
);

export const selectTimeSlotLoading = createSelector(
  selectTimeSlotState,
  (state) => state.loading
);

export const selectTimeSlotError = createSelector(
  selectTimeSlotState,
  (state) => state.error
);
