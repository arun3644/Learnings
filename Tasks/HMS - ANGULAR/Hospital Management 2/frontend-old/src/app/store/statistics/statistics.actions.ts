import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const StatisticsActions = createActionGroup({
  source: 'Statistics',
  events: {
    // Get total patients count
    'Get Total Patients':         emptyProps(),
    'Get Total Patients Success': props<{ count: number }>(),
    'Get Total Patients Failure': props<{ error: string }>(),
    
    // Get total doctors count
    'Get Total Doctors':          emptyProps(),
    'Get Total Doctors Success':  props<{ count: number }>(),
    'Get Total Doctors Failure':  props<{ error: string }>(),
    
    // Get total appointments count
    'Get Total Appointments':         emptyProps(),
    'Get Total Appointments Success': props<{ count: number }>(),
    'Get Total Appointments Failure': props<{ error: string }>(),
    
    // Get appointments by status
    'Get Appointments By Status':         props<{ status: string }>(),
    'Get Appointments By Status Success': props<{ appointments: any[]; status: string }>(),
    'Get Appointments By Status Failure': props<{ error: string }>(),
    
    // Get today's appointments
    'Get Today Appointments':         emptyProps(),
    'Get Today Appointments Success': props<{ appointments: any[] }>(),
    'Get Today Appointments Failure': props<{ error: string }>(),
    
    // Get upcoming appointments
    'Get Upcoming Appointments':         emptyProps(),
    'Get Upcoming Appointments Success': props<{ appointments: any[] }>(),
    'Get Upcoming Appointments Failure': props<{ error: string }>(),
    
    // Load all statistics at once
    'Load All Statistics':         emptyProps(),
    'Load All Statistics Success': emptyProps(),
    'Load All Statistics Failure': props<{ error: string }>(),
  }
});
