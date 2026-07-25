import { TimeSlot } from '../../core/models/time-slot.model';

export interface TimeSlotState {
  timeSlots: TimeSlot[];
  loading: boolean;
  error: string | null;
}

export const initialTimeSlotState: TimeSlotState = {
  timeSlots: [],
  loading: false,
  error: null
};
