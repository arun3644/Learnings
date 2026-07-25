import { createAction, props} from "@ngrx/store";

export const loadLogin = createAction('[Load Login]')
export const loadLoginSuccess = createAction('[Load Login Success]', props<{loginData: any}>());
export const loadLoginFailure = createAction('[Load Login Failure]', props<{error: string}>());
