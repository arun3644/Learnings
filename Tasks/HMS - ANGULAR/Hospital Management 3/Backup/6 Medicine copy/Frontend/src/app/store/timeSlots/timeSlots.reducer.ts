import { createReducer, on } from "@ngrx/store";
import { TimeSlotAction } from "./timeSlots.actions";

export interface TimeSlotState {
    availableTimeSlot: any[],
    bookedTimeSlot: any[],
    loading: boolean;
    error: string | null
}

export const initialTimeSlotState: TimeSlotState = {
    availableTimeSlot: [],
    bookedTimeSlot: [],
    loading: false,
    error: null
}

export const TimeSlotReducer = createReducer(
    initialTimeSlotState,
    on(TimeSlotAction.getAvailableTimeSlots, state => ({...state, loading: true})),
    on(TimeSlotAction.getBookedTimeSlots, state => ({...state, loading: true})),
    on(TimeSlotAction.loadAvailableTimeSlotsSuccess, (state, { timeSlots }) => ({...state, availableTimeSlot : timeSlots, loading: false, error: null})),
    on(TimeSlotAction.loadBookedTimeSlotsSuccess, (state, { timeSlots }) => ({...state, bookedTimeSlot : timeSlots, loading: false, error: null})),
    on(TimeSlotAction.loadTimeSlotsFailure, (state, {error}) =>({...state, loading: false, error}))
)