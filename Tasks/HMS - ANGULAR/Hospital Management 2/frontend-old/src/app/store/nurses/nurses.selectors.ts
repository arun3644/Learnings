import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NursesState } from './nurses.reducer';

export const selectNursesState = createFeatureSelector<NursesState>('nurses');

export const selectAllNurses = createSelector(
  selectNursesState,
  (state) => state.nurses
);

export const selectSelectedNurse = createSelector(
  selectNursesState,
  (state) => state.selectedNurse
);

export const selectNursesLoading = createSelector(
  selectNursesState,
  (state) => state.loading
);

export const selectNursesError = createSelector(
  selectNursesState,
  (state) => state.error
);

// Derived selectors
export const selectNurseById = (id: number) =>
  createSelector(selectAllNurses, (nurses) =>
    nurses.find((n) => n.id === id)
  );

export const selectNursesByDepartment = (department: string) =>
  createSelector(selectAllNurses, (nurses) =>
    nurses.filter((n) => n.department === department)
  );

export const selectNursesByShift = (shift: string) =>
  createSelector(selectAllNurses, (nurses) =>
    nurses.filter((n) => n.shift === shift)
  );
