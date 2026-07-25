import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DoctorsState } from "./doctors.reducers";

const selectDoctorsState = createFeatureSelector<DoctorsState>('doctors');

export const selectAllDoctors = createSelector(selectDoctorsState, state => state.doctors);
export const selectDoctorsLoading = createSelector(selectDoctorsState, state => state.loading);
export const selectDoctorsError = createSelector(selectDoctorsState, state => state.error);
export const selectMetaData  = createSelector(selectDoctorsState, state => state.metaData);
export const selectPageHeader = createSelector(selectDoctorsState, state => state.metaData?.page?.header);
export const selectFilters = createSelector(selectDoctorsState, state => state.metaData?.filters);