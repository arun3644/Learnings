import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const PatientsActions = createActionGroup({
  source: 'Patients',
  events: {
    'Load Patients':    emptyProps(),
    'Load Patients Success': props<{ patients: any[] }>(),
    'Load Patients Failure': props<{ error: string }>(),
    'Add Patient':      props<{ patient: any }>(),
    'Update Patient':   props<{ patient: any }>(),
    'Delete Patient':   props<{ id: string }>(),
  }
});
