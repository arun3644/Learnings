import { createActionGroup, emptyProps, props } from "@ngrx/store";


export const DoctorsActions = createActionGroup({
    source: 'Doctors',
    events:{
        'Load Doctors': emptyProps(),
        'Load Doctors Success': props<{doctors: any[]}>(),
        'Load Doctors Failure': props<{error: string}>(),
        'Load Metadata': emptyProps(),
        'Load Metadata Success': props<{metaData: any}>()
    }   
})