import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NurseState } from './nurse.state';

export const selectNurseState = createFeatureSelector<NurseState>('nurse');

export const selectAllNurses = createSelector(
  selectNurseState,
  (state) => state.nurses
);

export const selectSelectedNurse = createSelector(
  selectNurseState,
  (state) => state.selectedNurse
);

export const selectNurseLoading = createSelector(
  selectNurseState,
  (state) => state.loading
);

export const selectNurseError = createSelector(
  selectNurseState,
  (state) => state.error
);
