import { createActionGroup, emptyProps, props } from "@ngrx/store";

export const TimeSlotAction = createActionGroup({
    source: "TimeSlots",
    events: {
        "Get Available Time Slots":  props<{ avlbSlotUrl: string }>(),
        "Get Booked Time Slots": props<{ bookedSlotUrl: string }>(),
        // "Load Available Time Slots ": emptyProps(),
        // "Load Booked Time Slots": emptyProps(),
        "Load Available TimeSlots Success": props<{timeSlots: any}>(),
        "Load Booked TimeSlots Success": props<{timeSlots: any}>(),
        "Load TimeSlots Failure": props<{error: string}>()
    }
})