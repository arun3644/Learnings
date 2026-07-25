import { createReducer, on, State } from "@ngrx/store";
import * as LoginActions  from "./login.actions";

export interface LoginState {
    loginData: any, loading: boolean, error: string | null
}

const initialState: LoginState = {
    loginData: {}, loading: false, error: null
}

export const loginReducer = createReducer(
    initialState,
    on(LoginActions.loadLogin, (state) => ({
        ...state, loading: true, error: null
    })),
    on(LoginActions.loadLoginSuccess, (state, { loginData }) => ({
        ...state, loading: false, loginData
    })),
    on(LoginActions.loadLoginFailure,(state, {error}) =>({
        ...state, loading: false, error
    }))
)