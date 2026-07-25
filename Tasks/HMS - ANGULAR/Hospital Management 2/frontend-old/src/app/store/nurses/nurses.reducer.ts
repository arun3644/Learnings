import { createReducer, on } from '@ngrx/store';
import * as NursesActions from './nurses.actions';
import { Nurse } from '../../services/nurse.service';

export interface NursesState {
  nurses: Nurse[];
  selectedNurse: Nurse | null;
  loading: boolean;
  error: string | null;
}

const initialState: NursesState = {
  nurses: [],
  selectedNurse: null,
  loading: false,
  error: null
};

export const nursesReducer = createReducer(
  initialState,

  // Load all nurses
  on(NursesActions.loadNurses, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(NursesActions.loadNursesSuccess, (state, { nurses }) => ({
    ...state,
    nurses,
    loading: false
  })),
  on(NursesActions.loadNursesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Load nurse by ID
  on(NursesActions.loadNurseById, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(NursesActions.loadNurseByIdSuccess, (state, { nurse }) => ({
    ...state,
    selectedNurse: nurse,
    loading: false
  })),
  on(NursesActions.loadNurseByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Update nurse
  on(NursesActions.updateNurse, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(NursesActions.updateNurseSuccess, (state, { nurse }) => ({
    ...state,
    nurses: state.nurses.map(n => n.id === nurse.id ? nurse : n),
    selectedNurse: state.selectedNurse?.id === nurse.id ? nurse : state.selectedNurse,
    loading: false
  })),
  on(NursesActions.updateNurseFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Delete nurse
  on(NursesActions.deleteNurse, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(NursesActions.deleteNurseSuccess, (state, { id }) => ({
    ...state,
    nurses: state.nurses.filter(n => n.id !== id),
    loading: false
  })),
  on(NursesActions.deleteNurseFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
