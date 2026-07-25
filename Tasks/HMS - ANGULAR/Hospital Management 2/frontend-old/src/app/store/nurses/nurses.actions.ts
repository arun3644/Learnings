import { createAction, props } from '@ngrx/store';
import { Nurse } from '../../services/nurse.service';

// Load all nurses
export const loadNurses = createAction('[Nurses] Load Nurses');
export const loadNursesSuccess = createAction(
  '[Nurses] Load Nurses Success',
  props<{ nurses: Nurse[] }>()
);
export const loadNursesFailure = createAction(
  '[Nurses] Load Nurses Failure',
  props<{ error: string }>()
);

// Load nurse by ID
export const loadNurseById = createAction(
  '[Nurses] Load Nurse By ID',
  props<{ id: number }>()
);
export const loadNurseByIdSuccess = createAction(
  '[Nurses] Load Nurse By ID Success',
  props<{ nurse: Nurse }>()
);
export const loadNurseByIdFailure = createAction(
  '[Nurses] Load Nurse By ID Failure',
  props<{ error: string }>()
);

// Update nurse
export const updateNurse = createAction(
  '[Nurses] Update Nurse',
  props<{ id: number; data: any }>()
);
export const updateNurseSuccess = createAction(
  '[Nurses] Update Nurse Success',
  props<{ nurse: Nurse }>()
);
export const updateNurseFailure = createAction(
  '[Nurses] Update Nurse Failure',
  props<{ error: string }>()
);

// Delete nurse
export const deleteNurse = createAction(
  '[Nurses] Delete Nurse',
  props<{ id: number }>()
);
export const deleteNurseSuccess = createAction(
  '[Nurses] Delete Nurse Success',
  props<{ id: number }>()
);
export const deleteNurseFailure = createAction(
  '[Nurses] Delete Nurse Failure',
  props<{ error: string }>()
);
