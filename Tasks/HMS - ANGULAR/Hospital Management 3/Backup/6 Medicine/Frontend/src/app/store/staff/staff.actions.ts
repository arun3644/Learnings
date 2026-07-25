import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const StaffActions = createActionGroup({
  source: 'Staff',
  events: {
    'Load Staff': emptyProps(),
    'Load Staff Success': props<{ staff: any[] }>(),
    'Load Staff Failure': props<{ error: string }>(),
    'Load Metadata': emptyProps(),
    'Load Metadata Success': props<{ metaData: any }>()
  }
});
