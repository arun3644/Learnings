import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TimeSlotState } from "./timeSlots.reducer";

const TimeslotSelector = createFeatureSelector<TimeSlotState>('timslot');

export const selectAvailableTimeSlot = createSelector(TimeslotSelector, (state: TimeSlotState) => state.availableTimeSlot);
export const selectBookedTimeSlot = createSelector(TimeslotSelector, (state => state.bookedTimeSlot));
export const seelctTImeSlotError = createSelector(TimeslotSelector, (state => state.error));
export const selectTimeSlotLoading = createSelector(TimeslotSelector, (state => state.loading));
