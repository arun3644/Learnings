import { createSelector, createFeatureSelector } from "@ngrx/store";
import { LoginState } from "./login.reducer";

export const selectLoginState = createFeatureSelector<LoginState>('login');

export const selectLoginMetaData = createSelector(selectLoginState, s => s.loginData);
export const selectLoginLoading = createSelector(selectLoginState, s => s.loading)
export const selectLoginError = createSelector(selectLoginState, s => s.error)
export const selectLoginLayout = createSelector(selectLoginState, s => s.loginData.Layout);
export const selectLoginCards = createSelector(selectLoginState, s => s.loginData.cards);