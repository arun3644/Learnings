import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DoctorsState } from './doctors.reducer';

export const selectDoctorsState = createFeatureSelector<DoctorsState>('doctors');

export const selectAllDoctors = createSelector(
  selectDoctorsState,
  (state) => state.doctors
);

export const selectSelectedDoctor = createSelector(
  selectDoctorsState,
  (state) => state.selectedDoctor
);

export const selectDoctorDashboardStats = createSelector(
  selectDoctorsState,
  (state) => state.dashboardStats
);

export const selectAvailableSlots = createSelector(
  selectDoctorsState,
  (state) => state.availableSlots
);

export const selectDoctorAppointments = createSelector(
  selectDoctorsState,
  (state) => state.appointments
);

export const selectDoctorsLoading = createSelector(
  selectDoctorsState,
  (state) => state.loading
);

export const selectDoctorsError = createSelector(
  selectDoctorsState,
  (state) => state.error
);

// Derived selectors
export const selectDoctorsBySpecialization = (specialization: string) =>
  createSelector(selectAllDoctors, (doctors) =>
    doctors.filter((d) => d.specialization === specialization)
  );

export const selectDoctorById = (id: number) =>
  createSelector(selectAllDoctors, (doctors) =>
    doctors.find((d) => d.id === id)
  );

export const selectAllSpecializations = createSelector(
  selectAllDoctors,
  (doctors) => [...new Set(doctors.map((d) => d.specialization))]
);
