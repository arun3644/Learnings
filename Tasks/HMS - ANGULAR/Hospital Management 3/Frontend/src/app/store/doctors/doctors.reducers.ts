import { createReducer, on } from "@ngrx/store";
import { DoctorsActions } from "./doctors.actions";

export interface DoctorsState{
    doctors: any[];
    loading: boolean;
    error: string | null;
    metaData: any;
};

export const initialDoctorsState: DoctorsState = {
    doctors: [],
    loading : false,
    error: null,
    metaData: null
};


export const doctorsReducer = createReducer(
    initialDoctorsState,
    on(DoctorsActions.loadDoctors, state => ({...state, loading: true, error: null })),
    on(DoctorsActions.loadDoctorsSuccess, (state, {doctors}) => ({...state, doctors, loading : false, error: null})),
    on(DoctorsActions.loadDoctorsFailure, (state, {error}) => ({...state, loading: false, error})),
    on(DoctorsActions.loadMetadataSuccess, (state, {metaData}) => ({...state, metaData}))
);