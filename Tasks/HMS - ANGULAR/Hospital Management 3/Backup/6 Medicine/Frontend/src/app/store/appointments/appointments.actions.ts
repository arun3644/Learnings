import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const AppointmentsActions = createActionGroup({
  source: 'Appointments',
  events: {
    'Load Appointments':         emptyProps(),
    'Load Appointments Success': props<{ appointments: any[] }>(),
    'Load Appointments Failure': props<{ error: string }>(),
    'Add Appointment':           props<{ appointment: any }>(),
    'Update Appointment':        props<{ appointment: any }>(),
    'Delete Appointment':        props<{ id: string }>(),
  }
});
