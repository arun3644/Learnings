# HMS React Frontend - Role-Based Implementation Plan

**Project Name:** Hospital Management System (HMS) - React Frontend  
**Framework:** React 18.2 + Redux + React Router + Vite  
**Total Estimated Time:** 70-85 hours  
**Created:** 2026-06-24

---

## 📋 Executive Summary

Complete the HMS React frontend by building one **complete role** at a time. Each role section contains all the pages, components, API integrations, and Redux state needed for that specific user type. Follow the sequence: **Admin → Doctor → Nurse → Patient**.

---

## 🎯 Project Overview

**Tech Stack:**
- Frontend: React 18.2.0 with Vite
- State Management: Redux + Redux Thunk
- Routing: React Router v6
- HTTP Client: Axios
- Build Tool: Vite
- Package Manager: npm/yarn

**User Roles:**
1. **Admin** - System administrator, manage all resources
2. **Doctor** - Healthcare provider, manage patients and appointments
3. **Nurse** - Support staff, assist with patient care
4. **Patient** - End user, book appointments and view medical info
5. **Pharma** - End user, add medicines and view medicines info -- will implement later

---

## 🏗️ PHASE 0: Foundation Setup (Do This First)
**Estimated Hours:** 10-12 hours  
**Prerequisites for all roles**

### **Foundation 0.1: Project Initialization  (-- skipped)**
**Hours:** 3-4

**Deliverables:**
- [ ] Create React + Vite project
- [ ] Install dependencies
- [ ] Configure Vite aliases and environment
- [ ] Setup folder structure
- [ ] Initialize git repository

**Commands:**
```bash
npm create vite@latest hospital-management -- --template react
npm install
# Install dependencies from package.json
npm install react-router-dom redux react-redux @reduxjs/toolkit redux-thunk axios
```

**Files to Create:**
- `vite.config.js` (with path aliases)
- `package.json` (dependencies)
- `.env`, `.env.development`, `.env.production`
- `src/main.jsx` (entry point)
- Folder structure

---

### **Foundation 0.2: Redux Store & State Management**
**Hours:** 4-5

**What to Create:**

**Redux Store Configuration:**
```
src/store/
├── store.js (main store configuration)
├── slices/
│   ├── authSlice.js (login, logout, user state)
│   ├── toastSlice.js (notification management)
│   ├── dashboardSlice.js (dashboard stats)
│   ├── doctorsSlice.js (doctors list)
│   ├── patientsSlice.js (patients list)
│   ├── appointmentsSlice.js (appointments)
│   └── staffSlice.js (nurses/staff)
```

**State Structure:**
```javascript
{
  auth: { user, token, isAuthenticated, loading, error },
  toast: { toasts: [] },
  dashboard: { stats, loading, error },
  doctors: { doctors, loading, error },
  patients: { patients, loading, error },
  appointments: { appointments, availableSlots, loading, error },
  staff: { staff, loading, error }
}
```

**Key Actions for Each Slice:**
- **Auth:** login, logout, signup, validateToken, setUser
- **Toast:** addToast, removeToast, clearToasts
- **Doctors:** fetchDoctors, addDoctor, updateDoctor, deleteDoctor
- **Patients:** fetchPatients, addPatient, updatePatient, deletePatient
- **Appointments:** fetchAppointments, addAppointment, updateAppointment, cancelAppointment
- **Staff:** fetchStaff, addStaff, updateStaff, deleteStaff
- **Dashboard:** fetchStats

---

### **Foundation 0.3: Services & API Integration**
**Hours:** 2-3

**Services to Create:**

**1. API Service (api.js)**
- Axios instance with interceptors
- Add auth token to headers
- Handle 401 errors → redirect to login
- Error handling and logging

**2. Auth Service (auth.js)**
- login(email, password, role)
- signup(userData)
- logout()
- validateToken()
- Store/retrieve token from localStorage

**3. Toast Service (toast.js)**
- Dispatch toasts to Redux
- showSuccess, showError, showInfo, showWarning

**4. API Endpoints Needed:**
```
POST   /auth/login
POST   /auth/register
GET    /auth/validate
GET    /dashboard/stats
GET    /doctors
POST   /doctors
PUT    /doctors/:id
DELETE /doctors/:id
GET    /patients
POST   /patients
PUT    /patients/:id
DELETE /patients/:id
GET    /appointments
POST   /appointments
PUT    /appointments/:id
DELETE /appointments/:id
GET    /staff
POST   /staff
PUT    /staff/:id
DELETE /staff/:id
```

---

### **Foundation 0.4: Basic UI Infrastructure**
**Hours:** 2-3

**Components to Create:**
- [ ] `ProtectedRoute.jsx` - Route guard for authenticated routes
- [ ] `Toast/ToastContainer.jsx` - Toast notification display
- [ ] Global styles (`styles/styles.css`)
- [ ] App.jsx with routing setup
- [ ] Basic layout structure

**Global Styles:**
- CSS reset
- Color variables
- Typography
- Flexbox utilities
- Responsive breakpoints

**Main App.jsx:**
```jsx
- Router setup with all routes
- Lazy loading pages
- Redux Provider
- Toast container
- Token validation on app load
```

---

### **Foundation 0.5: Constants, Utilities & Helpers**
**Hours:** 1-2

**Create:**
- `src/constants/index.js` - Routes, roles, API endpoints, toast types
- `src/utils/validators.js` - Email, password, phone validation
- `src/utils/helpers.js` - Formatting, date manipulation, text utilities
- `src/hooks/useAuth.js` - Auth state hook
- `src/hooks/useToast.js` - Toast dispatch hook

---

## 🔐 PHASE 1: ADMIN PANEL
**Status:** Complete first  
**Estimated Hours:** 18-20 hours  
**What Admins Do:** Manage doctors, patients, staff, view system statistics, configure roles

### **1.1 Admin Dashboard**
**Hours:** 4-5

**Features:**
- [ ] Statistics cards (total doctors, patients, appointments, revenue)
- [ ] Charts showing trends
- [ ] Recent activity feed
- [ ] Quick action buttons
- [ ] System health overview

**Pages to Create:**
- `src/components/pages/Dashboard.jsx` (Admin view with stats)
- `src/components/pages/Dashboard.css`

**Redux:**
- `dashboardSlice.js` - fetchDashboardStats action
- API: `GET /dashboard/stats`

**Components:**
- StatCard component
- Chart component (optional)
- Activity list

**Time Breakdown:**
- Dashboard layout & design: 1.5 hrs
- Statistics cards: 1 hr
- Charts & graphs: 1 hr
- Redux integration: 0.5 hrs
- API integration: 0.5 hrs

---

### **1.2 Doctor Management (CRUD)**
**Hours:** 5-6

**Features:**
- [ ] List all doctors in table
- [ ] Search & filter by specialization
- [ ] Add new doctor form
- [ ] Edit doctor details
- [ ] Delete doctor with confirmation
- [ ] View doctor profile
- [ ] Manage doctor availability

**Pages to Create:**
- `src/components/pages/Doctors.jsx` (Admin view with CRUD)
- `src/components/pages/Doctors.css`

**Forms:**
- Doctor registration form
- Doctor edit form

**Redux:**
- `doctorsSlice.js` with:
  - fetchDoctors() - GET /doctors
  - addDoctor(data) - POST /doctors
  - updateDoctor(id, data) - PUT /doctors/:id
  - deleteDoctor(id) - DELETE /doctors/:id

**Components Needed:**
- Doctor table
- Doctor form modal
- Search bar
- Filter dropdown
- Delete confirmation modal

**Time Breakdown:**
- Doctor list page: 1.5 hrs
- Add doctor form: 1 hr
- Edit doctor form: 1 hr
- Redux integration: 1 hr
- API integration: 0.5 hrs
- Delete functionality: 0.5 hrs

---

### **1.3 Patient Management (CRUD)**
**Hours:** 5-6

**Features:**
- [ ] List all patients
- [ ] Search & filter patients
- [ ] Add new patient
- [ ] Edit patient details
- [ ] Delete patient
- [ ] View patient medical history
- [ ] Manage patient status

**Pages to Create:**
- `src/components/pages/Patients.jsx` (Admin view with CRUD)
- `src/components/pages/Patients.css`

**Forms:**
- Patient registration form
- Patient edit form

**Redux:**
- `patientsSlice.js` with:
  - fetchPatients() - GET /patients
  - addPatient(data) - POST /patients
  - updatePatient(id, data) - PUT /patients/:id
  - deletePatient(id) - DELETE /patients/:id

**Components:**
- Patient table
- Patient form modal
- Search functionality
- Medical history view

**Time Breakdown:**
- Patient list page: 1.5 hrs
- Add patient form: 1 hr
- Edit patient form: 1 hr
- Redux integration: 1 hr
- API integration: 0.5 hrs
- Delete functionality: 0.5 hrs

---

### **1.4 Staff Management (CRUD)**
**Hours:** 4-5

**Features:**
- [ ] List all nurses/staff
- [ ] Add new staff member
- [ ] Edit staff details
- [ ] Delete staff member
- [ ] Manage staff shifts
- [ ] View staff assignments

**Pages to Create:**
- `src/components/pages/Staff.jsx` (Admin view with CRUD)
- `src/components/pages/Staff.css`

**Redux:**
- `staffSlice.js` with:
  - fetchStaff() - GET /staff
  - addStaff(data) - POST /staff
  - updateStaff(id, data) - PUT /staff/:id
  - deleteStaff(id) - DELETE /staff/:id

**Components:**
- Staff table
- Staff form modal
- Shift assignment view

**Time Breakdown:**
- Staff list page: 1 hr
- Add/edit staff forms: 1.5 hrs
- Redux & API: 1 hr
- Delete functionality: 0.5 hrs

---

### **1.5 Admin Layout & Navigation**
**Hours:** 2-3

**Features:**
- [ ] Top navigation bar with user profile
- [ ] Sidebar menu with all admin sections
- [ ] User logout button
- [ ] Responsive mobile menu
- [ ] Breadcrumbs

**Pages to Create:**
- `src/components/pages/Layout.jsx` (Admin layout)
- `src/components/pages/Layout.css`

**Components:**
- Navigation bar
- Sidebar menu
- User profile dropdown
- Mobile responsive menu

**Time Breakdown:**
- Layout structure: 1 hr
- Navigation styling: 1 hr
- Responsive design: 0.5 hrs

---

**PHASE 1 Total: 18-20 hours**

**Admin Deliverables:**
- ✅ Admin dashboard with statistics
- ✅ Complete doctor CRUD with search/filter
- ✅ Complete patient CRUD with search/filter
- ✅ Complete staff CRUD
- ✅ Admin layout with navigation
- ✅ All forms with validation
- ✅ Toast notifications for actions
- ✅ Redux state management
- ✅ API integration

---

## 👨‍⚕️ PHASE 2: DOCTOR PORTAL
**Status:** Build after Admin  
**Estimated Hours:** 16-18 hours  
**What Doctors Do:** View patients, manage appointments, update availability, view medical records

### **2.1 Doctor Dashboard**
**Hours:** 3-4

**Features:**
- [ ] Today's appointments
- [ ] Patient count
- [ ] Upcoming schedule
- [ ] Recent patient interactions
- [ ] Quick actions (start consultation, write prescription)

**Pages:**
- `Doctor-specific dashboard view`

**Redux:**
- Doctor-specific dashboard stats

**Time Breakdown:**
- Dashboard design: 1.5 hrs
- Appointments widget: 1 hr
- Patient cards: 0.5 hrs
- Redux & API: 0.5 hrs

---

### **2.2 View Assigned Patients**
**Hours:** 4-5

**Features:**
- [ ] List of patients assigned to doctor
- [ ] Search & filter patients
- [ ] Patient details modal
- [ ] Medical history view
- [ ] Prescription history
- [ ] View patient notes

**Pages:**
- Patients list (Doctor view - read-only)

**Components:**
- Patient list table
- Patient detail modal
- Medical history view
- Prescription viewer

**Time Breakdown:**
- Patient list: 1.5 hrs
- Patient details view: 1.5 hrs
- Medical history: 1 hr
- API integration: 0.5 hrs

---

### **2.3 Manage Appointments**
**Hours:** 5-6

**Features:**
- [ ] View all appointments for doctor
- [ ] Filter by date/status
- [ ] Reschedule appointments
- [ ] Cancel appointments
- [ ] Mark appointment as completed
- [ ] Add notes to appointment
- [ ] Send appointment reminders

**Pages:**
- Appointments list (Doctor view)

**Redux:**
- `appointmentsSlice.js` updates for doctor actions:
  - fetchDoctorAppointments()
  - rescheduleAppointment(id, newTime)
  - completeAppointment(id)
  - addAppointmentNotes(id, notes)

**Components:**
- Appointment list/calendar
- Appointment detail modal
- Reschedule form
- Notes input

**Time Breakdown:**
- Appointment list view: 1.5 hrs
- Appointment details modal: 1 hr
- Reschedule functionality: 1 hr
- Notes & actions: 1 hr
- API integration: 0.5 hrs

---

### **2.4 Manage Availability**
**Hours:** 2-3

**Features:**
- [ ] Set working hours
- [ ] Mark available/unavailable dates
- [ ] Set lunch break times
- [ ] Block dates for leave
- [ ] View available slots for next 30 days

**Pages:**
- Availability management page

**Components:**
- Calendar with availability toggle
- Time slot editor
- Leave request form

**Time Breakdown:**
- Calendar view: 1 hr
- Availability toggle: 0.5 hrs
- Leave management: 1 hr

---

### **2.5 Prescriptions (Optional)**
**Hours:** 2-3

**Features:**
- [ ] Write prescriptions for patients
- [ ] View prescription history
- [ ] Print/send prescription to patient
- [ ] Prescription templates

**Pages:**
- Prescription management page

**Components:**
- Prescription form
- Prescription list
- Print functionality

---

**PHASE 2 Total: 16-18 hours**

**Doctor Deliverables:**
- ✅ Doctor dashboard with today's appointments
- ✅ View assigned patients with medical history
- ✅ Manage appointments (reschedule, complete, cancel)
- ✅ Add notes to appointments
- ✅ Manage availability/working hours
- ✅ View prescriptions (optional)
- ✅ Role-specific access control
- ✅ Toast notifications

---

## 👩‍⚕️ PHASE 3: NURSE/STAFF PORTAL
**Status:** Build after Doctor  
**Estimated Hours:** 12-14 hours  
**What Nurses Do:** Assist with patient care, manage ward assignments, view appointments, support doctors

### **3.1 Nurse Dashboard**
**Hours:** 2-3

**Features:**
- [ ] Shift information
- [ ] Assigned patients for shift
- [ ] Pending tasks
- [ ] Ward overview
- [ ] Patient vital signs shortcuts

**Components:**
- Shift info card
- Patient list widget
- Task queue

---

### **3.2 Patient Care Management**
**Hours:** 4-5

**Features:**
- [ ] View assigned patients
- [ ] Record vital signs (temperature, BP, blood sugar)
- [ ] Update patient notes
- [ ] Monitor patient status
- [ ] Alert for doctor if critical

**Pages:**
- Patient care dashboard

**Redux:**
- Patient vitals tracking state

**Components:**
- Patient list with vitals
- Vitals entry form
- Patient monitoring view

---

### **3.3 Appointments Assistance**
**Hours:** 3-4

**Features:**
- [ ] View all appointments
- [ ] Check-in patients
- [ ] Prepare examination rooms
- [ ] Assist with procedures
- [ ] Record appointment completion

**Pages:**
- Appointments list (Nurse view)

**Components:**
- Check-in interface
- Room preparation checklist
- Appointment notes

---

### **3.4 Shift Management**
**Hours:** 2-3

**Features:**
- [ ] View assigned shift
- [ ] Clock in/out
- [ ] View shift schedule
- [ ] Request shift change
- [ ] View break records

**Components:**
- Shift timer/clock
- Shift details
- Schedule view

---

**PHASE 3 Total: 12-14 hours**

**Nurse Deliverables:**
- ✅ Nurse dashboard with shift info
- ✅ Patient care management with vitals tracking
- ✅ Appointment assistance & check-in
- ✅ Shift management
- ✅ Role-specific patient assignments
- ✅ Critical alert notifications

---

## 🧑 PHASE 4: PATIENT PORTAL
**Status:** Build last  
**Estimated Hours:** 14-16 hours  
**What Patients Do:** Book appointments, view medical records, update profile, communicate with doctors

### **4.1 Patient Dashboard**
**Hours:** 2-3

**Features:**
- [ ] Upcoming appointments
- [ ] Recent prescriptions
- [ ] Medical test results
- [ ] Health tips/reminders
- [ ] Quick appointment booking button

**Pages:**
- Patient dashboard

**Components:**
- Appointment cards
- Prescription list
- Health metrics

---

### **4.2 Book/View Appointments**
**Hours:** 5-6

**Features:**
- [ ] Browse available doctors by specialization
- [ ] View doctor availability
- [ ] Book appointment with time slot selection
- [ ] Cancel appointment
- [ ] Reschedule appointment
- [ ] View appointment history
- [ ] Appointment reminders

**Pages:**
- Doctor directory for appointment booking
- Appointment booking page with calendar
- My appointments page

**Redux:**
- `appointmentsSlice.js` for patient actions:
  - fetchAvailableDoctors()
  - fetchAvailableSlots(doctorId, date)
  - bookAppointment(appointmentData)
  - cancelAppointment(appointmentId)
  - rescheduleAppointment(appointmentId, newSlot)

**Components:**
- Doctor list/cards
- Calendar with available slots
- Appointment booking form
- My appointments list
- Appointment details modal

**Time Breakdown:**
- Doctor directory: 1.5 hrs
- Appointment calendar: 1.5 hrs
- Booking form: 1 hr
- My appointments view: 1 hr
- API integration: 0.5 hrs

---

### **4.3 Medical Records**
**Hours:** 4-5

**Features:**
- [ ] View all medical history
- [ ] Download medical records (PDF)
- [ ] View prescriptions
- [ ] View test results
- [ ] View doctor notes
- [ ] Medical timeline

**Pages:**
- Medical records view
- Prescriptions page
- Test results page

**Redux:**
- Patient medical history state

**Components:**
- Medical records list
- Prescription viewer
- Test results display
- Download functionality

**Time Breakdown:**
- Medical history view: 1.5 hrs
- Prescriptions display: 1 hr
- Test results view: 1 hr
- PDF download: 0.5 hrs

---

### **4.4 Profile Management**
**Hours:** 2-3

**Features:**
- [ ] View/edit profile
- [ ] Update personal information
- [ ] Update contact details
- [ ] Change password
- [ ] Upload profile picture
- [ ] Update emergency contact

**Pages:**
- Patient profile page

**Components:**
- Profile form
- Password change form
- File upload

**Time Breakdown:**
- Profile view/edit: 1.5 hrs
- Password change: 0.5 hrs
- Profile picture upload: 0.5 hrs

---

### **4.5 Doctor Communication (Optional)**
**Hours:** 2-3

**Features:**
- [ ] Message doctor
- [ ] View doctor responses
- [ ] Video consultation link
- [ ] Chat history

**Pages:**
- Messages/chat page

**Components:**
- Message list
- Message form
- Chat interface

---

**PHASE 4 Total: 14-16 hours**

**Patient Deliverables:**
- ✅ Patient dashboard with upcoming appointments
- ✅ Browse doctors and book appointments
- ✅ View available time slots with calendar
- ✅ Cancel/reschedule appointments
- ✅ View complete medical records
- ✅ View prescriptions and test results
- ✅ Update profile and change password
- ✅ Download medical documents (PDF)
- ✅ Appointment confirmations and reminders

---

## 🔧 PHASE 5: Final Touches
**Estimated Hours:** 6-8 hours

### **5.1 Authentication Flow**
**Hours:** 2-3

**Features:**
- [ ] Login page with role selection
- [ ] Signup/registration
- [ ] Forgot password
- [ ] Email verification
- [ ] Session management
- [ ] Logout with cleanup

**Pages:**
- `Login.jsx`
- `Signup.jsx`
- `ForgotPassword.jsx` (optional)

---

### **5.2 Error Handling & Validation**
**Hours:** 1-2

**Features:**
- [ ] Form validation messages
- [ ] API error handling
- [ ] User-friendly error messages
- [ ] Toast notifications for errors
- [ ] Fallback for missing data

---

### **5.3 Performance & Optimization**
**Hours:** 1-2

**Features:**
- [ ] Lazy load routes
- [ ] Code splitting
- [ ] Image optimization
- [ ] Caching strategies
- [ ] Debounce search inputs

---

### **5.4 Testing & Deployment**
**Hours:** 1-2

**Features:**
- [ ] Build optimization
- [ ] Environment configuration
- [ ] Deployment setup
- [ ] Basic testing

---

## 📊 Time Breakdown Summary

| Phase | Focus | Hours | Status |
|-------|-------|-------|--------|
| 0 | Foundation Setup | 10-12 | **Do First** |
| 1 | Admin Panel | 18-20 | Then this |
| 2 | Doctor Portal | 16-18 | Then this |
| 3 | Nurse Portal | 12-14 | Then this |
| 4 | Patient Portal | 14-16 | Then this |
| 5 | Final Touches | 6-8 | Last |
| **TOTAL** | **Complete System** | **70-85** | |

---

## 🎯 Implementation Sequence

**Week 1:**
- Phase 0: Foundation (10-12 hrs)
- Phase 1: Admin Dashboard & Doctor Mgmt (8-10 hrs)

**Week 2:**
- Phase 1: Complete (remaining 10 hrs)
- Phase 2: Doctor Portal basics (6-8 hrs)

**Week 3:**
- Phase 2: Complete Doctor Portal (10-12 hrs)
- Phase 3: Start Nurse Portal (4-6 hrs)

**Week 4:**
- Phase 3: Complete Nurse Portal (8-10 hrs)
- Phase 4: Patient Portal (6-8 hrs)

**Week 5:**
- Phase 4: Complete Patient Portal (10 hrs)
- Phase 5: Final touches & deployment (6-8 hrs)

---

## 🔑 Key Files Per Phase

### Phase 0 (Foundation)
```
src/
├── main.jsx
├── App.jsx
├── store/
│   ├── store.js
│   └── slices/ (all 7 slices)
├── services/ (api.js, auth.js, toast.js)
├── hooks/ (useAuth.js, useToast.js)
├── constants/index.js
├── utils/ (validators.js, helpers.js)
├── styles/styles.css
└── components/
    ├── ProtectedRoute.jsx
    └── Toast/
```

### Phase 1 (Admin)
```
src/components/pages/
├── Login.jsx
├── Dashboard.jsx (Admin view)
├── Doctors.jsx
├── Patients.jsx
├── Staff.jsx
└── Layout.jsx
```

### Phase 2 (Doctor)
```
src/components/pages/
├── Dashboard.jsx (Doctor view)
├── Patients.jsx (Doctor's patients view)
└── Appointments.jsx (Doctor appointment mgmt)
```

### Phase 3 (Nurse)
```
src/components/pages/
├── Dashboard.jsx (Nurse view)
├── PatientCare.jsx
└── Appointments.jsx (Nurse check-in)
```

### Phase 4 (Patient)
```
src/components/pages/
├── Dashboard.jsx (Patient view)
├── BookAppointment.jsx
├── MyAppointments.jsx
├── MedicalRecords.jsx
└── Profile.jsx
```

---

## ✅ Completion Checklist

**Phase 0:**
- [ ] Project created with Vite
- [ ] All dependencies installed
- [ ] Redux store configured
- [ ] Services setup (API, Auth, Toast)
- [ ] Basic routing working
- [ ] Foundation components created

**Phase 1 (Admin):**
- [ ] Admin can login
- [ ] Admin dashboard displays stats
- [ ] Admin can CRUD doctors
- [ ] Admin can CRUD patients
- [ ] Admin can CRUD staff
- [ ] Search and filter working
- [ ] Forms with validation
- [ ] Toast notifications working

**Phase 2 (Doctor):**
- [ ] Doctor can login
- [ ] Doctor dashboard shows appointments
- [ ] Doctor can view assigned patients
- [ ] Doctor can manage appointments
- [ ] Doctor can set availability
- [ ] Role-specific access control

**Phase 3 (Nurse):**
- [ ] Nurse can login
- [ ] Nurse dashboard shows shift info
- [ ] Nurse can view patients
- [ ] Nurse can record vitals
- [ ] Nurse can assist with appointments

**Phase 4 (Patient):**
- [ ] Patient can login
- [ ] Patient can browse doctors
- [ ] Patient can book appointments
- [ ] Patient can view medical records
- [ ] Patient can cancel/reschedule appointments
- [ ] Patient can update profile

**Phase 5:**
- [ ] Authentication fully working
- [ ] Error handling complete
- [ ] App optimized
- [ ] Ready to deploy

---

## 🚀 Development Tips

1. **Build Phase by Phase:** Complete one entire phase before starting the next
2. **Test as You Go:** Verify each feature works before moving on
3. **Use Redux DevTools:** Monitor state changes
4. **Mock Data First:** Test UI with mock data before connecting to API
5. **Responsive Design:** Test each page on mobile/tablet/desktop
6. **Error Handling:** Every API call should have error handling
7. **Loading States:** Show loading spinners for async operations
8. **Form Validation:** Validate on both client and server
9. **Accessibility:** Make forms keyboard navigable
10. **Code Organization:** Keep components small and focused

---

## 📁 Complete Folder Structure Per Phase

### **After Phase 0 (Foundation):**
```
hospital-management/
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── components/
│   │   ├── ProtectedRoute.jsx
│   │   ├── Toast/
│   │   │   ├── ToastContainer.jsx
│   │   │   ├── Toast.jsx
│   │   │   └── ToastContainer.css
│   │   └── pages/
│   │       ├── Login.jsx
│   │       └── Login.css
│   ├── store/
│   │   ├── store.js
│   │   └── slices/
│   │       ├── authSlice.js
│   │       ├── toastSlice.js
│   │       ├── dashboardSlice.js
│   │       ├── doctorsSlice.js
│   │       ├── patientsSlice.js
│   │       ├── appointmentsSlice.js
│   │       └── staffSlice.js
│   ├── services/
│   │   ├── api.js
│   │   ├── auth.js
│   │   └── toast.js
│   ├── hooks/
│   │   ├── useAuth.js
│   │   └── useToast.js
│   ├── constants/
│   │   └── index.js
│   ├── utils/
│   │   ├── validators.js
│   │   └── helpers.js
│   ├── styles/
│   │   └── styles.css
│   └── types/
│       └── index.ts (optional)
├── vite.config.js
├── package.json
├── .env
├── .env.development
└── .env.production
```

### **After Phase 1 (Admin):**
```
Add to src/components/pages/:
├── Dashboard.jsx (Admin view)
├── Dashboard.css
├── Doctors.jsx
├── Doctors.css
├── Patients.jsx
├── Patients.css
├── Staff.jsx
├── Staff.css
├── Layout.jsx
└── Layout.css

Add to src/components/:
├── Form/
│   ├── DoctorForm.jsx
│   ├── PatientForm.jsx
│   └── StaffForm.jsx
├── Tables/
│   ├── DoctorsTable.jsx
│   ├── PatientsTable.jsx
│   └── StaffTable.jsx
└── Modals/
    ├── DoctorModal.jsx
    ├── PatientModal.jsx
    └── StaffModal.jsx
```

### **After Phase 2 (Doctor):**
```
Add to src/components/pages/:
├── Dashboard.jsx (Doctor view)
├── Patients.jsx (Doctor's patients)
├── Patients.css
├── Appointments.jsx (Doctor management)
└── Appointments.css

Add doctor-specific components
```

### **After Phase 3 (Nurse):**
```
Add to src/components/pages/:
├── Dashboard.jsx (Nurse view)
├── PatientCare.jsx
├── PatientCare.css
├── Appointments.jsx (Nurse check-in)
└── Appointments.css
```

### **After Phase 4 (Patient):**
```
Add to src/components/pages/:
├── Dashboard.jsx (Patient view)
├── BookAppointment.jsx
├── BookAppointment.css
├── MyAppointments.jsx
├── MyAppointments.css
├── MedicalRecords.jsx
├── MedicalRecords.css
├── Profile.jsx
└── Profile.css

Add patient-specific components
```

---

## 🔌 API Endpoints with Request/Response Examples

### **Authentication Endpoints**

**POST /auth/login**
```javascript
Request:
{
  "email": "admin@hospital.com",
  "password": "password123",
  "role": "Admin"
}

Response (Success):
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "U001",
    "username": "admin",
    "email": "admin@hospital.com",
    "name": "Admin User",
    "role": "Admin"
  }
}

Response (Error):
{
  "success": false,
  "message": "Invalid email or password"
}
```

**POST /auth/register**
```javascript
Request:
{
  "name": "Dr. John Doe",
  "email": "doctor@hospital.com",
  "password": "password123",
  "confirmPassword": "password123",
  "role": "Doctor",
  "specialization": "Cardiology"
}

Response (Success):
{
  "success": true,
  "message": "Registration successful. Please login.",
  "user": {
    "id": "D001",
    "email": "doctor@hospital.com",
    "role": "Doctor"
  }
}
```

**GET /auth/validate**
```javascript
Headers: { Authorization: "Bearer <token>" }

Response (Valid):
{
  "success": true,
  "user": {
    "id": "U001",
    "email": "admin@hospital.com",
    "role": "Admin"
  }
}

Response (Invalid):
{
  "success": false,
  "message": "Token expired or invalid"
}
```

---

### **Dashboard Endpoints**

**GET /dashboard/stats**
```javascript
Response:
{
  "success": true,
  "data": {
    "totalDoctors": 15,
    "totalPatients": 245,
    "totalAppointments": 82,
    "appointmentsTodayCount": 12,
    "appointmentsCompletedToday": 8,
    "revenueToday": 5500,
    "revenueThisMonth": 85000,
    "patientsSatisfaction": 4.7,
    "staffCount": 30,
    "recentActivities": [
      {
        "id": "A001",
        "type": "appointment_booked",
        "message": "Patient John booked appointment",
        "timestamp": "2024-06-24T10:30:00Z"
      }
    ]
  }
}
```

---

### **Doctors Endpoints**

**GET /doctors**
```javascript
Query Parameters: ?page=1&limit=10&specialization=Cardiology&search=john

Response:
{
  "success": true,
  "data": [
    {
      "id": "D001",
      "name": "Dr. John Doe",
      "email": "john@hospital.com",
      "phone": "9876543210",
      "specialization": "Cardiology",
      "qualifications": ["MBBS", "MD"],
      "experience": 10,
      "availability": {
        "monday": { "startTime": "09:00", "endTime": "17:00", "isAvailable": true },
        "tuesday": { "startTime": "09:00", "endTime": "17:00", "isAvailable": true },
        "wednesday": { "startTime": "09:00", "endTime": "17:00", "isAvailable": false },
        "thursday": { "startTime": "09:00", "endTime": "17:00", "isAvailable": true },
        "friday": { "startTime": "09:00", "endTime": "17:00", "isAvailable": true },
        "saturday": { "startTime": "10:00", "endTime": "14:00", "isAvailable": true },
        "sunday": { "startTime": null, "endTime": null, "isAvailable": false }
      },
      "rating": 4.8,
      "reviewCount": 45,
      "consultationFee": 500
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalRecords": 45,
    "limit": 10
  }
}
```

**POST /doctors** (Admin only)
```javascript
Request:
{
  "name": "Dr. Sarah Smith",
  "email": "sarah@hospital.com",
  "phone": "9876543211",
  "specialization": "Neurology",
  "qualifications": ["MBBS", "MD Neurology"],
  "experience": 8,
  "consultationFee": 600,
  "password": "initialPassword123"
}

Response:
{
  "success": true,
  "message": "Doctor added successfully",
  "data": {
    "id": "D002",
    "name": "Dr. Sarah Smith",
    "email": "sarah@hospital.com"
  }
}
```

**PUT /doctors/:id** (Admin or self)
```javascript
Request:
{
  "phone": "9876543211",
  "consultationFee": 550,
  "experience": 9
}

Response:
{
  "success": true,
  "message": "Doctor updated successfully",
  "data": { ... updated doctor object ... }
}
```

**DELETE /doctors/:id** (Admin only)
```javascript
Response:
{
  "success": true,
  "message": "Doctor deleted successfully"
}
```

**GET /doctors/:id**
```javascript
Response:
{
  "success": true,
  "data": { ...doctor details... }
}
```

---

### **Patients Endpoints**

**GET /patients**
```javascript
Query Parameters: ?page=1&limit=10&search=john&status=active

Response:
{
  "success": true,
  "data": [
    {
      "id": "P001",
      "name": "John Smith",
      "email": "john@email.com",
      "phone": "9876543210",
      "dateOfBirth": "1990-05-15",
      "gender": "Male",
      "bloodType": "O+",
      "address": "123 Main St, City",
      "emergencyContact": {
        "name": "Jane Smith",
        "relationship": "Sister",
        "phone": "9876543211"
      },
      "medicalHistory": ["Diabetes", "Hypertension"],
      "allergies": ["Penicillin"],
      "registrationDate": "2024-01-10",
      "status": "active"
    }
  ],
  "pagination": { ... }
}
```

**POST /patients** (Doctor/Admin can create)
```javascript
Request:
{
  "name": "Jane Doe",
  "email": "jane@email.com",
  "phone": "9876543212",
  "dateOfBirth": "1995-08-20",
  "gender": "Female",
  "bloodType": "A+",
  "address": "456 Oak Ave, City",
  "emergencyContact": {
    "name": "John Doe",
    "relationship": "Brother",
    "phone": "9876543213"
  }
}

Response:
{
  "success": true,
  "message": "Patient registered successfully",
  "data": { ...patient object... }
}
```

---

### **Appointments Endpoints**

**GET /appointments**
```javascript
Query Parameters: ?page=1&limit=10&status=pending&doctorId=D001&patientId=P001&date=2024-06-25

Response:
{
  "success": true,
  "data": [
    {
      "id": "APT001",
      "patientId": "P001",
      "patientName": "John Smith",
      "doctorId": "D001",
      "doctorName": "Dr. John Doe",
      "appointmentDate": "2024-06-25",
      "appointmentTime": "10:30",
      "duration": 30,
      "status": "scheduled",
      "reason": "Regular checkup",
      "notes": "Patient complains of headaches",
      "consultationMode": "in-person",
      "createdAt": "2024-06-24T15:30:00Z",
      "updatedAt": "2024-06-24T15:30:00Z"
    }
  ],
  "pagination": { ... }
}
```

**POST /appointments** (Patient/Doctor can create)
```javascript
Request:
{
  "patientId": "P001",
  "doctorId": "D001",
  "appointmentDate": "2024-06-25",
  "appointmentTime": "10:30",
  "reason": "Regular checkup",
  "consultationMode": "in-person"
}

Response:
{
  "success": true,
  "message": "Appointment booked successfully",
  "data": { ...appointment object... }
}
```

**GET /appointments/available-slots**
```javascript
Query Parameters: ?doctorId=D001&date=2024-06-25

Response:
{
  "success": true,
  "data": {
    "doctorId": "D001",
    "date": "2024-06-25",
    "availableSlots": [
      "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
      "14:00", "14:30", "15:00", "15:30", "16:00"
    ],
    "bookedSlots": ["09:00", "10:00", "15:00"],
    "totalSlots": 14,
    "availableCount": 11
  }
}
```

**PUT /appointments/:id**
```javascript
Request:
{
  "appointmentTime": "11:00",
  "status": "rescheduled"
}

Response:
{
  "success": true,
  "message": "Appointment updated successfully",
  "data": { ...updated appointment... }
}
```

---

### **Staff Endpoints**

**GET /staff** (Admin view)
```javascript
Query Parameters: ?page=1&limit=10&department=ICU&shift=morning

Response:
{
  "success": true,
  "data": [
    {
      "id": "S001",
      "name": "Nurse Sarah",
      "email": "sarah@hospital.com",
      "phone": "9876543220",
      "position": "Senior Nurse",
      "department": "ICU",
      "shift": {
        "shiftType": "morning",
        "startTime": "06:00",
        "endTime": "14:00"
      },
      "status": "active",
      "joinDate": "2023-01-15",
      "qualification": "RN (Registered Nurse)"
    }
  ],
  "pagination": { ... }
}
```

---

## 🎛️ Redux State Structure (Complete)

### **authSlice.js**
```javascript
{
  user: {
    id: string,
    email: string,
    name: string,
    role: "Admin" | "Doctor" | "Nurse" | "Patient",
    specialization?: string,
    department?: string
  },
  token: string | null,
  isAuthenticated: boolean,
  loading: boolean,
  error: string | null,
  isValidating: boolean
}

// Actions
- loginUser(email, password, role)
- signupUser(userData)
- logoutUser()
- validateToken()
- setUser(user)
- clearError()
```

### **toastSlice.js**
```javascript
{
  toasts: [
    {
      id: string,
      message: string,
      type: "success" | "error" | "info" | "warning",
      duration: number,
      createdAt: timestamp
    }
  ]
}

// Actions
- addToast(message, type, duration)
- removeToast(id)
- clearToasts()
```

### **dashboardSlice.js**
```javascript
{
  stats: {
    totalDoctors: number,
    totalPatients: number,
    totalAppointments: number,
    appointmentsTodayCount: number,
    revenueToday: number,
    revenueThisMonth: number,
    patientsSatisfaction: number
  },
  loading: boolean,
  metadataLoading: boolean,
  error: string | null
}

// Actions
- fetchDashboardStats()
- fetchDashboardMetadata()
```

### **doctorsSlice.js**
```javascript
{
  doctors: [
    {
      id: string,
      name: string,
      email: string,
      phone: string,
      specialization: string,
      experience: number,
      rating: number,
      availability: object,
      consultationFee: number
    }
  ],
  loading: boolean,
  metadataLoading: boolean,
  error: string | null
}

// Actions
- fetchDoctors(filters)
- addDoctor(doctorData)
- updateDoctor(id, data)
- deleteDoctor(id)
- fetchDoctorsMetadata()
```

### **patientsSlice.js**
```javascript
{
  patients: [
    {
      id: string,
      name: string,
      email: string,
      phone: string,
      dateOfBirth: string,
      bloodType: string,
      medicalHistory: string[],
      allergies: string[],
      emergencyContact: object
    }
  ],
  loading: boolean,
  metadataLoading: boolean,
  error: string | null
}

// Actions
- fetchPatients(filters)
- addPatient(patientData)
- updatePatient(id, data)
- deletePatient(id)
- fetchPatientsMetadata()
```

### **appointmentsSlice.js**
```javascript
{
  appointments: [
    {
      id: string,
      patientId: string,
      patientName: string,
      doctorId: string,
      doctorName: string,
      appointmentDate: string,
      appointmentTime: string,
      status: "scheduled" | "completed" | "cancelled",
      reason: string,
      notes: string
    }
  ],
  availableSlots: string[],
  bookedSlots: string[],
  loading: boolean,
  timeSlotsLoading: boolean,
  error: string | null
}

// Actions
- fetchAppointments(filters)
- addAppointment(appointmentData)
- updateAppointment(id, data)
- cancelAppointment(id)
- fetchAvailableSlots(doctorId, date)
- completeAppointment(id)
```

### **staffSlice.js**
```javascript
{
  staff: [
    {
      id: string,
      name: string,
      email: string,
      position: string,
      department: string,
      shift: object,
      status: "active" | "inactive"
    }
  ],
  loading: boolean,
  metadataLoading: boolean,
  error: string | null
}

// Actions
- fetchStaff(filters)
- addStaff(staffData)
- updateStaff(id, data)
- deleteStaff(id)
- fetchStaffMetadata()
```

---

## 📋 Form Specifications

### **Login Form**
```javascript
Fields:
- email (email, required, min 5 chars)
- password (password, required, min 8 chars)
- role (select: Admin, Doctor, Nurse, Patient, required)

Validation:
- Email must be valid format
- Password min 8 characters
- Role must be selected

Error Messages:
- "Invalid email format"
- "Password must be at least 8 characters"
- "Please select a role"
```

### **Signup Form**
```javascript
Fields:
- name (text, required, 2-50 chars)
- email (email, required, unique)
- password (password, required, min 8 chars)
- confirmPassword (password, required, must match)
- role (select, required)
- specialization (text, conditional - if role is Doctor)
- phone (text, 10 digits, required)
- address (textarea, required)

Validation Rules:
- Name: 2-50 characters, no special chars
- Email: Valid format, unique
- Password: Min 8 chars, 1 uppercase, 1 number, 1 special char
- Phone: Exactly 10 digits
- Address: Min 10 characters
```

### **Doctor Form (Admin Creation)**
```javascript
Fields:
- name (text, required)
- email (email, required, unique)
- phone (text, 10 digits, required)
- specialization (select, required)
- qualifications (multiselect, required)
- experience (number, 0-60, required)
- consultationFee (number, required)
- availability (weekday toggles with time selection)
- password (auto-generated or set by admin)

Validation:
- All required fields must be filled
- Email must be unique
- Experience must be 0-60
- Consultation fee must be > 0
```

### **Patient Form**
```javascript
Fields:
- name (text, required)
- email (email, required)
- phone (text, 10 digits, required)
- dateOfBirth (date, required, must be 18+)
- gender (radio: Male, Female, Other)
- bloodType (select, required)
- address (textarea, required)
- emergencyContact.name (text, required)
- emergencyContact.relationship (text, required)
- emergencyContact.phone (text, 10 digits, required)
- medicalHistory (multiselect, optional)
- allergies (textarea, optional)

Validation:
- Date of birth: Must be 18+ years old
- Phone: 10 digits only
- All required fields mandatory
```

### **Appointment Booking Form**
```javascript
Fields:
- doctorId (select from available doctors)
- appointmentDate (date picker, min today)
- appointmentTime (select from available slots)
- reason (text, required)
- consultationMode (radio: In-Person, Online)
- notes (textarea, optional)

Validation:
- All required fields
- Date must be >= today
- Time must be from available slots
- Reason must be 10+ characters
```

---

## 🗄️ Database Schema

### **Users Table**
```sql
id: UUID PRIMARY KEY
email: VARCHAR(255) UNIQUE NOT NULL
password: VARCHAR(255) NOT NULL
name: VARCHAR(255) NOT NULL
role: ENUM('Admin', 'Doctor', 'Nurse', 'Patient') NOT NULL
phone: VARCHAR(20) UNIQUE
createdAt: TIMESTAMP DEFAULT NOW()
updatedAt: TIMESTAMP DEFAULT NOW()
```

### **Doctors Table**
```sql
id: UUID PRIMARY KEY
userId: UUID FOREIGN KEY (Users.id)
specialization: VARCHAR(100) NOT NULL
qualifications: JSON (array of strings)
experience: INTEGER
consultationFee: DECIMAL(10,2)
rating: DECIMAL(3,2) DEFAULT 0
reviewCount: INTEGER DEFAULT 0
createdAt: TIMESTAMP
updatedAt: TIMESTAMP
```

### **Patients Table**
```sql
id: UUID PRIMARY KEY
userId: UUID FOREIGN KEY (Users.id)
dateOfBirth: DATE NOT NULL
gender: ENUM('Male', 'Female', 'Other')
bloodType: VARCHAR(5)
address: TEXT
medicalHistory: JSON (array)
allergies: JSON (array)
emergencyContact: JSON
registrationDate: TIMESTAMP
status: ENUM('active', 'inactive')
```

### **Appointments Table**
```sql
id: UUID PRIMARY KEY
patientId: UUID FOREIGN KEY (Patients.id)
doctorId: UUID FOREIGN KEY (Doctors.id)
appointmentDate: DATE NOT NULL
appointmentTime: TIME NOT NULL
duration: INTEGER DEFAULT 30
status: ENUM('scheduled', 'completed', 'cancelled')
reason: TEXT
notes: TEXT
consultationMode: ENUM('in-person', 'online')
createdAt: TIMESTAMP
updatedAt: TIMESTAMP
UNIQUE(doctorId, appointmentDate, appointmentTime)
```

### **Staff Table**
```sql
id: UUID PRIMARY KEY
userId: UUID FOREIGN KEY (Users.id)
position: VARCHAR(100) NOT NULL
department: VARCHAR(100) NOT NULL
shiftType: ENUM('morning', 'evening', 'night')
shiftStartTime: TIME
shiftEndTime: TIME
status: ENUM('active', 'inactive')
joinDate: DATE
qualification: VARCHAR(255)
```

### **TimeSlots Table**
```sql
id: UUID PRIMARY KEY
doctorId: UUID FOREIGN KEY (Doctors.id)
date: DATE NOT NULL
time: TIME NOT NULL
isAvailable: BOOLEAN DEFAULT true
createdAt: TIMESTAMP
UNIQUE(doctorId, date, time)
```

---

## 💻 Code Examples

### **Redux Slice Example (authSlice.js)**
```javascript
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '@services/auth';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);
      if (response.success) {
        return response;
      }
      return rejectWithValue(response.message);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const validateToken = createAsyncThunk(
  'auth/validateToken',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.validateToken();
      if (response.success) {
        return response.user;
      }
      return rejectWithValue(response.message);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  user: null,
  token: localStorage.getItem('auth_token') || null,
  isAuthenticated: !!localStorage.getItem('auth_token'),
  loading: false,
  error: null,
  isValidating: true
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('auth_token');
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        localStorage.setItem('auth_token', action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(validateToken.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isValidating = false;
      })
      .addCase(validateToken.rejected, (state) => {
        state.isValidating = false;
        state.isAuthenticated = false;
      });
  }
});

export const { logout, clearError } = authSlice.actions;
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectToken = (state) => state.auth.token;
export const selectIsValidating = (state) => state.auth.isValidating;

export default authSlice.reducer;
```

### **API Service Example (api.js)**
```javascript
import axios from 'axios';
import { API_BASE_URL, AUTH_TOKEN_KEY, USE_API } from '@constants';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response.data || response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

const apiService = {
  // Auth endpoints
  login: (credentials) => axiosInstance.post('/auth/login', credentials),
  register: (userData) => axiosInstance.post('/auth/register', userData),
  validateToken: () => axiosInstance.get('/auth/validate'),

  // Doctors
  getDoctors: (params) => axiosInstance.get('/doctors', { params }),
  getDoctor: (id) => axiosInstance.get(`/doctors/${id}`),
  createDoctor: (data) => axiosInstance.post('/doctors', data),
  updateDoctor: (id, data) => axiosInstance.put(`/doctors/${id}`, data),
  deleteDoctor: (id) => axiosInstance.delete(`/doctors/${id}`),

  // Patients
  getPatients: (params) => axiosInstance.get('/patients', { params }),
  getPatient: (id) => axiosInstance.get(`/patients/${id}`),
  createPatient: (data) => axiosInstance.post('/patients', data),
  updatePatient: (id, data) => axiosInstance.put(`/patients/${id}`, data),
  deletePatient: (id) => axiosInstance.delete(`/patients/${id}`),

  // Appointments
  getAppointments: (params) => axiosInstance.get('/appointments', { params }),
  getAvailableSlots: (doctorId, date) =>
    axiosInstance.get('/appointments/available-slots', {
      params: { doctorId, date }
    }),
  createAppointment: (data) => axiosInstance.post('/appointments', data),
  updateAppointment: (id, data) => axiosInstance.put(`/appointments/${id}`, data),
  cancelAppointment: (id) =>
    axiosInstance.put(`/appointments/${id}`, { status: 'cancelled' }),

  // Staff
  getStaff: (params) => axiosInstance.get('/staff', { params }),
  createStaff: (data) => axiosInstance.post('/staff', data),
  updateStaff: (id, data) => axiosInstance.put(`/staff/${id}`, data),
  deleteStaff: (id) => axiosInstance.delete(`/staff/${id}`),

  // Dashboard
  getDashboardStats: () => axiosInstance.get('/dashboard/stats')
};

export default apiService;
```

### **Component Example (DoctorsTable.jsx)**
```javascript
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteDoctors, selectDoctors, selectLoading } from '@store/slices/doctorsSlice';
import { useToast } from '@hooks/useToast';

const DoctorsTable = ({ doctors, onEdit }) => {
  const dispatch = useDispatch();
  const { showSuccess, showError } = useToast();
  const [selectedDoctor, setSelectedDoctor] = React.useState(null);

  const handleDelete = async (doctorId) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      try {
        await dispatch(deleteDoctors(doctorId));
        showSuccess('Doctor deleted successfully');
      } catch (error) {
        showError('Failed to delete doctor');
      }
    }
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Specialization</th>
          <th>Experience</th>
          <th>Consultation Fee</th>
          <th>Rating</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {doctors.map((doctor) => (
          <tr key={doctor.id}>
            <td>{doctor.name}</td>
            <td>{doctor.specialization}</td>
            <td>{doctor.experience} years</td>
            <td>₹{doctor.consultationFee}</td>
            <td>{doctor.rating}/5</td>
            <td>
              <button onClick={() => onEdit(doctor)}>Edit</button>
              <button onClick={() => handleDelete(doctor.id)}>Delete</button>
              <button onClick={() => setSelectedDoctor(doctor)}>View</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DoctorsTable;
```

---

## ✅ Testing Guide

### **Phase 0 Foundation Testing**

**1. Redux Store Setup**
```javascript
✓ Store should be created with all slices
✓ Initial state should be correct
✓ Selectors should return correct values
✓ Actions should update state correctly
```

**2. API Service Testing**
```javascript
✓ Axios instance created
✓ Request interceptor adds auth token
✓ Response interceptor handles errors
✓ 401 redirects to login
```

**3. Auth Service Testing**
```javascript
✓ Login function accepts email/password/role
✓ Login returns user and token on success
✓ Login returns error on failure
✓ Token stored in localStorage
✓ Logout clears token and user
```

**4. Manual Testing Checklist**
- [ ] `npm run dev` starts without errors
- [ ] Redux DevTools shows store state
- [ ] App loads with login page
- [ ] No console errors

---

### **Phase 1 Admin Testing**

**1. Authentication Flow**
```
✓ Admin can login with valid credentials
✓ Invalid credentials show error message
✓ Token stored in localStorage
✓ Redirect to dashboard after login
✓ Logout clears token and returns to login
```

**2. Admin Dashboard**
```
✓ Dashboard loads with statistics
✓ Stats cards display correct numbers
✓ No API errors in console
✓ Loading state shows spinner while fetching
```

**3. Doctor Management**
```
✓ Doctor list loads and displays all doctors
✓ Search filters doctors by name/specialization
✓ Add doctor form opens when button clicked
✓ Add doctor form validation works
✓ Can submit form and see success toast
✓ New doctor appears in list
✓ Can edit doctor and save changes
✓ Can delete doctor after confirmation
```

**4. Patient Management**
```
✓ Same tests as doctors
```

**5. Staff Management**
```
✓ Same tests as doctors
```

---

### **Phase 2 Doctor Testing**

**1. Doctor Login & Dashboard**
```
✓ Doctor can login
✓ Doctor sees doctor-specific dashboard
✓ Today's appointments visible
✓ Patient list shows assigned patients
```

**2. Appointment Management**
```
✓ Can view appointments
✓ Can reschedule appointment
✓ Can mark appointment as completed
✓ Can add notes to appointment
✓ Can view available slots for specific date
```

---

### **Phase 3 Nurse Testing**

**1. Nurse Login & Dashboard**
```
✓ Nurse can login
✓ Nurse sees nurse-specific dashboard
✓ Shift information displayed
✓ Assigned patients shown
```

**2. Patient Vitals**
```
✓ Can record patient vitals
✓ Vitals saved successfully
✓ Can view vitals history
```

---

### **Phase 4 Patient Testing**

**1. Patient Login & Dashboard**
```
✓ Patient can login
✓ Patient sees upcoming appointments
✓ Medical records accessible
```

**2. Appointment Booking**
```
✓ Can browse doctors
✓ Can select specialization
✓ Can view available time slots
✓ Can book appointment
✓ Can cancel appointment
✓ Can reschedule appointment
```

**3. Medical Records**
```
✓ Can view medical history
✓ Can view prescriptions
✓ Can download records as PDF
```

---

## 🚀 Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Test (if configured)
npm test

# Lint code
npm run lint

# Format code
npm run format
```

---

**Total Estimated Effort:** 70-85 hours  
**Recommended Team Size:** 1-2 developers  
**Estimated Timeline:** 4-5 weeks for single developer  
**Document Version:** 2.0 (Enhanced with Examples)
