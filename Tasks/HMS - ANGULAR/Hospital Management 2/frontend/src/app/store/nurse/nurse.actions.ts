import { createAction, props } from '@ngrx/store';
import { Nurse } from '../../core/models/nurse.model';

export const loadNurses = createAction('[Nurse] Load Nurses');

export const loadNursesSuccess = createAction(
  '[Nurse] Load Nurses Success',
  props<{ nurses: Nurse[] }>()
);

export const loadNursesFailure = createAction(
  '[Nurse] Load Nurses Failure',
  props<{ error: string }>()
);

export const loadNurse = createAction(
  '[Nurse] Load Nurse',
  props<{ id: number }>()
);

export const loadNurseSuccess = createAction(
  '[Nurse] Load Nurse Success',
  props<{ nurse: Nurse }>()
);

export const loadNurseFailure = createAction(
  '[Nurse] Load Nurse Failure',
  props<{ error: string }>()
);

export const updateNurse = createAction(
  '[Nurse] Update Nurse',
  props<{ id: number; nurse: Partial<Nurse> }>()
);

export const updateNurseSuccess = createAction(
  '[Nurse] Update Nurse Success',
  props<{ nurse: Nurse }>()
);

export const updateNurseFailure = createAction(
  '[Nurse] Update Nurse Failure',
  props<{ error: string }>()
);
