import { createReducer, on } from '@ngrx/store';
import { initialNurseState } from './nurse.state';
import * as NurseActions from './nurse.actions';

export const nurseReducer = createReducer(
  initialNurseState,
  on(NurseActions.loadNurses, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(NurseActions.loadNursesSuccess, (state, { nurses }) => ({
    ...state,
    nurses,
    loading: false,
    error: null
  })),
  on(NurseActions.loadNursesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(NurseActions.loadNurseSuccess, (state, { nurse }) => ({
    ...state,
    selectedNurse: nurse,
    loading: false,
    error: null
  })),
  on(NurseActions.updateNurseSuccess, (state, { nurse }) => ({
    ...state,
    selectedNurse: nurse,
    nurses: state.nurses.map(n => n.id === nurse.id ? nurse : n),
    loading: false,
    error: null
  }))
);
