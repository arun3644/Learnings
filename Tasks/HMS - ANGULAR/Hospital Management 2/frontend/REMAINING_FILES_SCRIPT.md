# Script to Create All Remaining Files

## ✅ Files Created So Far (60+ files)

### Core (Complete)
- All guards, interceptors, services, models, constants, utils ✅

### Store (Partial - 50 files created)
- Auth store (5 files) ✅
- Doctor store (5 files) ✅
- Patient store (5 files) ✅
- Appointment store (5 files) ✅
- Admin store (5 files) ✅
- Nurse store (5 files) ✅

### Store (Remaining - 12 files)
- Time-slot store (5 files)
- Dashboard store (5 files)
- app.state.ts
- index.ts

## 📝 Use Angular CLI to Generate All Components

Run these commands in your frontend directory:

```bash
# Navigate to frontend
cd frontend

# Initialize Angular project if not done
ng new . --standalone --routing --style=css --skip-install

# Install dependencies
npm install
npm install @ngrx/store @ngrx/effects @ngrx/entity @ngrx/store-devtools

# Auth Components
ng g c features/auth/components/login --standalone --skip-tests
ng g c features/auth/components/register --standalone --skip-tests
ng g c features/auth/components/role-selection --standalone --skip-tests

# Admin Components
ng g c features/admin/components/admin-dashboard --standalone --skip-tests
ng g c features/admin/components/admin-layout --standalone --skip-tests
ng g c features/admin/components/manage-doctors --standalone --skip-tests
ng g c features/admin/components/manage-patients --standalone --skip-tests
ng g c features/admin/components/manage-nurses --standalone --skip-tests
ng g c features/admin/components/manage-appointments --standalone --skip-tests
ng g c features/admin/components/statistics --standalone --skip-tests

# Doctor Components
ng g c features/doctor/components/doctor-dashboard --standalone --skip-tests
ng g c features/doctor/components/doctor-layout --standalone --skip-tests
ng g c features/doctor/components/doctor-profile --standalone --skip-tests
ng g c features/doctor/components/appointments-list --standalone --skip-tests
ng g c features/doctor/components/time-slots --standalone --skip-tests
ng g c features/doctor/components/patients-list --standalone --skip-tests
ng g c features/doctor/components/today-schedule --standalone --skip-tests

# Patient Components
ng g c features/patient/components/patient-dashboard --standalone --skip-tests
ng g c features/patient/components/patient-layout --standalone --skip-tests
ng g c features/patient/components/patient-profile --standalone --skip-tests
ng g c features/patient/components/book-appointment --standalone --skip-tests
ng g c features/patient/components/my-appointments --standalone --skip-tests
ng g c features/patient/components/doctors-list --standalone --skip-tests
ng g c features/patient/components/appointment-history --standalone --skip-tests

# Nurse Components
ng g c features/nurse/components/nurse-dashboard --standalone --skip-tests
ng g c features/nurse/components/nurse-layout --standalone --skip-tests
ng g c features/nurse/components/nurse-profile --standalone --skip-tests
ng g c features/nurse/components/patient-care --standalone --skip-tests

# Shared Components
ng g c shared/components/header --standalone --skip-tests
ng g c shared/components/sidebar --standalone --skip-tests
ng g c shared/components/footer --standalone --skip-tests
ng g c shared/components/loader --standalone --skip-tests
ng g c shared/components/modal --standalone --skip-tests
ng g c shared/components/confirmation-dialog --standalone --skip-tests
ng g c shared/components/notification --standalone --skip-tests
ng g c shared/components/data-table --standalone --skip-tests
ng g c shared/components/card --standalone --skip-tests
ng g c shared/components/stats-card --standalone --skip-tests
ng g c shared/components/breadcrumb --standalone --skip-tests
ng g c shared/components/pagination --standalone --skip-tests

# Layouts
ng g c layouts/main-layout --standalone --skip-tests
ng g c layouts/auth-layout --standalone --skip-tests
ng g c layouts/empty-layout --standalone --skip-tests

# Directives
ng g directive shared/directives/click-outside --standalone --skip-tests
ng g directive shared/directives/tooltip --standalone --skip-tests
ng g directive shared/directives/highlight --directive --standalone --skip-tests

# Pipes
ng g pipe shared/pipes/date-format --standalone --skip-tests
ng g pipe shared/pipes/time-format --standalone --skip-tests
ng g pipe shared/pipes/truncate --standalone --skip-tests
ng g pipe shared/pipes/safe-html --standalone --skip-tests
```

## 📋 Manual Files to Create

After running Angular CLI commands, create these files manually:

### 1. Store Files (Remaining)

**Time-Slot Store:**
- `src/app/store/time-slot/time-slot.state.ts`
- `src/app/store/time-slot/time-slot.actions.ts`
- `src/app/store/time-slot/time-slot.reducer.ts`
- `src/app/store/time-slot/time-slot.effects.ts`
- `src/app/store/time-slot/time-slot.selectors.ts`

**Dashboard Store:**
- `src/app/store/dashboard/dashboard.state.ts`
- `src/app/store/dashboard/dashboard.actions.ts`
- `src/app/store/dashboard/dashboard.reducer.ts`
- `src/app/store/dashboard/dashboard.effects.ts`
- `src/app/store/dashboard/dashboard.selectors.ts`

**Store Root:**
- `src/app/store/app.state.ts`
- `src/app/store/index.ts`

### 2. Route Files

**Auth Routes:**
- `src/app/features/auth/auth.routes.ts`

**Admin Routes:**
- `src/app/features/admin/admin.routes.ts`

**Doctor Routes:**
- `src/app/features/doctor/doctor.routes.ts`

**Patient Routes:**
- `src/app/features/patient/patient.routes.ts`

**Nurse Routes:**
- `src/app/features/nurse/nurse.routes.ts`

### 3. Root App Files

- `src/app/app.component.ts`
- `src/app/app.component.html`
- `src/app/app.config.ts`
- `src/app/app.routes.ts`

### 4. Assets

- `src/assets/data/menu-config.json`

### 5. Styles

- `src/styles/global.css`

### 6. Root Files

- `src/index.html`
- `src/main.ts`
- `src/styles.css`

### 7. Shared Index Files

- `src/app/shared/directives/index.ts`
- `src/app/shared/pipes/index.ts`
- `src/app/shared/validators/custom-validators.ts`
- `src/app/shared/validators/index.ts`

## 🎯 Summary

**Total Files:**
- ✅ Created: ~60 files (Core + Most Store files)
- 🔄 Auto-generated by CLI: ~90 files (All components, directives, pipes)
- ✍️ Manual creation needed: ~30 files (Routes, configs, remaining store)

**Total: ~180 files**

## 🚀 Next Steps

1. Run the Angular CLI commands above
2. Create the remaining store files manually
3. Create route files for each feature
4. Create root app files
5. Create assets and configuration files
6. Update app.config.ts to include NgRx store
7. Test the application

## 📝 Notes

- All components generated by CLI will have `.ts`, `.html`, `.css` files
- CLI automatically creates proper standalone component structure
- Store files need manual creation as NgRx doesn't have CLI generators
- Route files need manual creation with proper guards and lazy loading
