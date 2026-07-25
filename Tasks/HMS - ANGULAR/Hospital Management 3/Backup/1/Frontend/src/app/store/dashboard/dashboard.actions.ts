import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const DashboardActions = createActionGroup({
  source: 'Dashboard',
  events: {
    'Load Stats':         emptyProps(),
    'Load Stats Success': props<{ stats: any }>(),
    'Load Stats Failure': props<{ error: string }>(),
  }
});
