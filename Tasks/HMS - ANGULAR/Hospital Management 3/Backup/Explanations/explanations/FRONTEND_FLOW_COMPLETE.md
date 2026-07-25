# Complete Frontend Flow - Hospital Management System

## **Architecture Overview**
- **Framework**: Angular 17 (Standalone Components)
- **State Management**: NgRx (Redux pattern)
- **Routing**: Angular Router with Guards
- **HTTP**: Angular HttpClient with Interceptors
- **Styling**: CSS

---

## **1. APPLICATION BOOTSTRAP FLOW**

### **Entry Point: `index.html`**
```
Browser loads → index.html
├── Loads styles.css
├── Defines <app-root> placeholder
└── Angular takes over
```

**File**: `Frontend/src/index.html`
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Hospital Management</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <app-root></app-root>  <!-- Angular app mounts here -->
  </body>
</html>
```

---

### **Application Bootstrap: `main.ts`**

**File**: `Frontend/src/main.ts`

```
main.ts executes
├── Import Angular core modules
├── Import AppComponent (root component)
├── Configure providers:
│   ├── Router (navigation)
│   ├── HttpClient + AuthInterceptor (API calls)
│   ├── NgRx Store (state management)
│   │   ├── login reducer
│   │   ├── dashboard reducer
│   │   ├── patients reducer
│   │   ├── appointments reducer
│   │   ├── doctors reducer
│   │   └── staff reducer
│   └── NgRx Effects (side effects for API calls)
│       ├── LoginEffects
│       ├── DashboardEffects
│       ├── PatientsEffects
│       ├── AppointmentsEffects
│       ├── DoctorsEffects
│       └── StaffEffects
└── Bootstrap AppComponent
```

**Key Code**:
```typescript
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),                          // Routing
    provideHttpClient(withInterceptors([AuthInterceptor])), // HTTP + JWT
    provideStore({                                  // State management
      login:        loginReducer,
      dashboard:    dashboardReducer,
      patients:     patientsReducer,
      appointments: appointmentsReducer,
      doctors:      doctorsReducer,
      staff:        staffReducer
    }),
    provideEffects([                               // Side effects
      LoginEffects,
      DashboardEffects,
      PatientsEffects,
      AppointmentsEffects,
      DoctorsEffects,
      StaffEffects
    ]),
    provideStoreDevtools({ maxAge: 25 })          // Redux DevTools
  ]
});
```

---

### **Root Component: `AppComponent`**

**File**: `Frontend/src/app/app.component.ts`

```
AppComponent renders
├── <app-toast> (global notifications)
└── <router-outlet> (renders route components)
```

**Template**: `app.component.html`
```html
<app-toast></app-toast>
<router-outlet />
```

---

## **2. ROUTING FLOW**

### **Routes Configuration: `app.routes.ts`**

```
URL Routing:
├── /              → HeroComponent (Landing page)
├── /hero          → HeroComponent
├── /login         → LoginComponent (with AuthGuard bypass)
├── /signup        → SignupComponent
├── /app           → LayoutComponent (protected by AuthGuard)
└── /**            → Redirect to /
```

**File**: `Frontend/src/app/app.routes.ts`
```typescript
export const routes: Routes = [
  { path: '', component: HeroComponent },
  { path: 'hero', component: HeroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'app', component: LayoutComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];
```

---

## **3. AUTHENTICATION FLOW**

### **Step 1: User Visits Application**

```
User opens browser → http://localhost:4200/
↓
Router loads HeroComponent (Landing page)
↓
Shows:
├── Welcome message
├── "Login" button → navigates to /login
└── "Sign Up" button → navigates to /signup
```

---

### **Step 2: Login Flow**

**Component**: `LoginComponent`

```
/login page loads
↓
LoginComponent.ngOnInit()
├── Check if already logged in
│   └── If yes → Navigate to /app
├── Load login metadata from NgRx store
└── Build login form (username, password fields)

User interaction:
├── Select Role card (Admin/Doctor/Nurse/Patient)
├── Fill username & password
└── Click "Login"
    ↓
    LoginComponent.submit()
    ├── Validate form
    ├── Call AuthService.login()
    │   ↓
    │   HTTP POST /api/auth/login
    │   {
    │     username: "john_doe",
    │     password: "password123",
    │     role: "Doctor"
    │   }
    │   ↓
    │   Backend validates credentials
    │   ↓
    │   Response:
    │   {
    │     success: true,
    │     token: "eyJhbGciOiJIUzI1...",
    │     user: {
    │       id: 5,
    │       username: "john_doe",
    │       role: "Doctor",
    │       name: "Dr. John Doe",
    │       email: "john@hospital.com"
    │     }
    │   }
    │   ↓
    │   AuthService stores:
    │   ├── localStorage.setItem('auth_token', token)
    │   ├── localStorage.setItem('current_user', JSON.stringify(user))
    │   └── Updates currentUserSubject (RxJS BehaviorSubject)
    └── Navigate to /app
```

---

### **Step 3: Register Flow**

**Component**: `LoginComponent` (also handles registration)

```
User clicks "Register" on login page
↓
registerStep = 1 (Role Selection)
├── Show role cards: Doctor, Nurse, Patient
└── User selects role
    ↓
    registerStep = 2 (Form Filling)
    ├── Build dynamic form based on role
    │   ├── Doctor fields: username, password, name, email, specialization, experience, license
    │   ├── Nurse fields: username, password, name, email, department, shift, experience
    │   └── Patient fields: username, password, name, email, age, gender, phone, blood group
    └── User fills form and submits
        ↓
        AuthService.register()
        ↓
        HTTP POST /api/auth/register/{role}
        {
          username, password, name, email, ...roleSpecificFields
        }
        ↓
        Backend creates user account
        ↓
        Response:
        {
          success: true,
          message: "Account created successfully",
          token: "...",
          doctorId: 10
        }
        ↓
        Show success message
        ↓
        Redirect to login
```

---

## **4. AUTH GUARD & HTTP INTERCEPTOR**

### **AuthGuard**: `auth.guard.ts`

```
User navigates to /app
↓
AuthGuard.canActivate() executes
├── Check if authenticated
│   ├── Has token? ✅
│   ├── Has user object? ✅
│   └── Token valid? ✅
├── If NOT authenticated:
│   └── Redirect to /login
└── If authenticated:
    └── Allow navigation to /app
```

---

### **AuthInterceptor**: `auth.interceptor.ts`

```
Any HTTP request is made
↓
AuthInterceptor intercepts
├── Check if request is to API (matches apiBaseUrl)
├── Check if request is auth endpoint (/auth/login, /auth/register)
│   └── If yes, don't add token
├── Get token from AuthService
└── Clone request and add Authorization header
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    ↓
    Forward modified request to backend
```

---

## **5. MAIN APPLICATION LAYOUT**

### **LayoutComponent**: `layout.component.ts`

```
User successfully logs in → /app route loads
↓
LayoutComponent renders
├── Get user role from AuthService
├── Set initial page:
│   ├── If Patient → activePage = 'appointments'
│   └── Else → activePage = 'dashboard'
└── Render template:
    ├── <app-sidebar> (if not Patient role)
    ├── <div class="main-content">
    │   ├── <app-header>
    │   └── Dynamic component based on activePage:
    │       ├── activePage='dashboard' → <app-dashboard>
    │       ├── activePage='patients' → <app-patients>
    │       ├── activePage='appointments' → <app-appointments>
    │       ├── activePage='doctors' → <app-doctors>
    │       └── activePage='staff' → <app-staff>
```

**Template**: `layout.component.html`
```html
<div class="layout">
  <app-sidebar *ngIf="showSidebar" 
               [userRole]="userRole" 
               (pageNavigate)="navigate($event)">
  </app-sidebar>
  
  <div class="main-content">
    <app-header [userRole]="userRole"></app-header>
    
    <app-dashboard *ngIf="activePage === 'dashboard'" 
                   (pageNavigate)="navigate($event)">
    </app-dashboard>
    
    <app-patients *ngIf="activePage === 'patients'">
    </app-patients>
    
    <app-appointments *ngIf="activePage === 'appointments'">
    </app-appointments>
    
    <app-doctors *ngIf="activePage === 'doctors'">
    </app-doctors>
    
    <app-staff *ngIf="activePage === 'staff'">
    </app-staff>
  </div>
</div>
```

---

## **6. PAGE NAVIGATION FLOW**

### **Sidebar Component**: `sidebar.component.ts`

```
SidebarComponent renders menu items
├── Role-based pages:
│   ├── Admin:     [dashboard, appointments, patients, doctors, staff]
│   ├── Doctor:    [dashboard, appointments, patients]
│   ├── Nurse:     [dashboard, appointments, patients]
│   ├── Patient:   [appointments] (no sidebar shown)
│   └── Reception: [dashboard, appointments, patients]
└── User clicks menu item
    ↓
    sidebar.component.ts emits: @Output() pageNavigate
    ↓
    LayoutComponent receives event: navigate($event)
    ↓
    Sets: activePage = $event
    ↓
    Angular re-renders corresponding component
```

---

## **7. APPOINTMENT BOOKING FLOW (DETAILED)**

### **Component**: `AppointmentsComponent`

```
User clicks "Appointments" in sidebar
↓
LayoutComponent: activePage = 'appointments'
↓
AppointmentsComponent loads
↓
ngOnInit() executes:
├── 1. Load metadata from local JSON
│   GET assets/metadata/appointments.metadata.json
│   └── Contains: timeSlotConfig (9 AM - 12 PM, 30 min intervals)
│
├── 2. Load all doctors
│   GET /api/doctors
│   Response: [{ id: 1, name: "Dr. Smith", specialization: "Cardiology" }, ...]
│   └── Extract unique specializations
│
├── 3. Load all patients (if not Patient role)
│   GET /api/patients
│   Response: [{ id: 1, name: "John Doe", patientId: "PAT001" }, ...]
│
├── 4. Load existing appointments
│   If Doctor role:
│     GET /api/doctors/{doctorId}/appointments
│   Else:
│     GET /api/appointments
│   Response: [{ id: 1, appointmentId: "APT001", ... }, ...]
│
└── 5. Initialize calendar
    ├── Current month display
    ├── Generate days (42 days grid)
    ├── Mark today
    ├── Disable past dates
    └── Disable dates > 7 days from today

User Interaction Flow:
┌─────────────────────────────────────────┐
│ Step 1: Select Specialization          │
├─────────────────────────────────────────┤
│ User selects "Cardiology"               │
│ ↓                                       │
│ onSpecializationChange()                │
│ ├── Filter doctors by specialization   │
│ └── Update doctors dropdown             │
└─────────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────┐
│ Step 2: Select Doctor                  │
├─────────────────────────────────────────┤
│ User selects "Dr. Smith"                │
│ ↓                                       │
│ onDoctorChange()                        │
│ └── Update time slots for selected day │
└─────────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────┐
│ Step 3: Select Date                    │
├─────────────────────────────────────────┤
│ User clicks date on calendar            │
│ ↓                                       │
│ selectDay(day)                          │
│ ├── Mark day as selected               │
│ ├── Update selectedDate                │
│ └── Fetch time slots:                  │
│     GET /doctors/{doctorId}/available-slots?date=2024-12-15│
│     GET /doctors/{doctorId}/booked-slots?date=2024-12-15   │
│     ↓                                   │
│     Merge and display:                  │
│     ├── Available slots (green)         │
│     └── Booked slots (gray, disabled)   │
└─────────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────┐
│ Step 4: Select Time Slot               │
├─────────────────────────────────────────┤
│ User clicks "10:00 AM" slot             │
│ ↓                                       │
│ selectTimeSlot(slot)                    │
│ ├── Check if slot is booked            │
│ ├── Mark slot as selected              │
│ └── Enable "Book" button               │
└─────────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────┐
│ Step 5: Fill Booking Form              │
├─────────────────────────────────────────┤
│ Form fields:                            │
│ ├── Patient (auto-filled for Patient)  │
│ ├── Specialization (already selected)  │
│ ├── Doctor (already selected)          │
│ └── Reason (user enters)               │
└─────────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────┐
│ Step 6: Confirm Booking                │
├─────────────────────────────────────────┤
│ User clicks "Book Appointment"          │
│ ↓                                       │
│ confirmBooking()                        │
│ ├── Validate form                      │
│ ├── Build payload:                     │
│ │   {                                  │
│ │     patientId: 1,                    │
│ │     doctorId: 5,                     │
│ │     date: "2024-12-15T00:00:00Z",   │
│ │     time: "10:00",                   │
│ │     duration: 30,                    │
│ │     reason: "General checkup"        │
│ │   }                                  │
│ └── HTTP POST /api/appointments        │
│     ↓                                   │
│     Backend processes:                  │
│     ├── Validate patient & doctor      │
│     ├── Check time slot availability   │
│     ├── Mark slot as booked            │
│     ├── Save appointment to DB         │
│     └── (Send SNS notification)        │
│     ↓                                   │
│     Response:                           │
│     {                                   │
│       success: true,                    │
│       message: "Appointment booked",    │
│       appointment: {                    │
│         id: 123,                        │
│         appointmentId: "APT042",        │
│         patient: {...},                 │
│         doctor: {...},                  │
│         date: "2024-12-15",            │
│         time: "10:00",                  │
│         status: "Scheduled"             │
│       }                                 │
│     }                                   │
│     ↓                                   │
│     Frontend updates:                   │
│     ├── Show success toast             │
│     ├── Add appointment to list        │
│     ├── Mark time slot as booked       │
│     ├── Clear form                     │
│     └── Reset selected slot            │
└─────────────────────────────────────────┘
```

---

## **8. NGRX STATE MANAGEMENT FLOW**

### **Redux Pattern for Appointments**

```
Component dispatches action
↓
store.dispatch(AppointmentsActions.loadAppointments())
↓
Action flows through NgRx pipeline:
├── Reducer catches action
│   └── Updates state (e.g., loading = true)
└── Effect catches action
    ↓
    AppointmentsEffects.loadAppointments$
    ├── Makes HTTP call: GET /api/appointments
    ├── Receives response
    └── Dispatches success/failure action
        ↓
        store.dispatch(AppointmentsActions.loadAppointmentsSuccess(data))
        ↓
        Reducer updates state:
        └── { appointments: [...data], loading: false, error: null }
        ↓
        Component selects data from store:
        └── appointments$ = store.select(selectAllAppointments)
        ↓
        Template updates with new data
        └── *ngFor="let apt of appointments$ | async"
```

**Example Flow**:

```typescript
// 1. Component dispatches action
this.store.dispatch(AppointmentsActions.loadAppointments());

// 2. Effect handles side effect (API call)
@Effect()
loadAppointments$ = this.actions$.pipe(
  ofType(AppointmentsActions.loadAppointments),
  switchMap(() =>
    this.apiService.getAll('appointments').pipe(
      map(data => AppointmentsActions.loadAppointmentsSuccess({ data })),
      catchError(error => of(AppointmentsActions.loadAppointmentsFailure({ error })))
    )
  )
);

// 3. Reducer updates state
case AppointmentsActions.loadAppointmentsSuccess:
  return { ...state, appointments: action.data, loading: false };

// 4. Component subscribes to state
appointments$ = this.store.select(selectAllAppointments);
```

---

## **9. SERVICES LAYER**

### **ApiService**: `api.service.ts`

```
Centralized API communication
├── getAll(module: string)
│   └── GET /api/{module}
├── getById(module: string, id: string)
│   └── GET /api/{module}/{id}
├── create(module: string, body: any)
│   └── POST /api/{module}
├── update(module: string, body: any)
│   └── PUT /api/{module}/{id}
└── delete(module: string, id: string)
    └── DELETE /api/{module}/{id}

Environment flag:
├── environment.useApi = true → Real API calls
└── environment.useApi = false → Load from assets/data/*.json (mock data)
```

### **AuthService**: `auth.service.ts`

```
Authentication management
├── login(credentials) → POST /api/auth/login
├── register(credentials) → POST /api/auth/register/{role}
├── logout() → Clear localStorage + BehaviorSubject
├── getCurrentUser() → Returns current user from state
├── getToken() → Returns JWT from localStorage
├── isAuthenticated() → Boolean check
├── getRole() → Returns user role
└── hasRole(role) → Check specific role
```

### **ToastService**: `toast.service.ts`

```
Global notification system
├── success(message) → Green toast
├── error(message) → Red toast
├── info(message) → Blue toast
└── warning(message) → Yellow toast

Uses BehaviorSubject to emit messages
└── ToastComponent subscribes and displays
```

---

## **10. COMPONENT HIERARCHY**

```
AppComponent (Root)
├── ToastComponent (Global notifications)
└── RouterOutlet
    ├── HeroComponent (Landing page)
    ├── LoginComponent (Login/Register)
    └── LayoutComponent (Main app)
        ├── SidebarComponent
        ├── HeaderComponent
        └── Content Components:
            ├── DashboardComponent
            │   └── Shows stats cards, quick actions
            ├── PatientsComponent
            │   └── CRUD operations for patients
            ├── AppointmentsComponent
            │   └── Book, view, manage appointments
            ├── DoctorsComponent
            │   └── CRUD operations for doctors
            └── StaffComponent
                └── CRUD operations for staff (nurses)
```

---

## **11. DATA FLOW SUMMARY**

```
┌──────────────────────────────────────────────────────────────┐
│                      USER INTERACTION                        │
└────────────────────────┬─────────────────────────────────────┘
                         ↓
┌──────────────────────────────────────────────────────────────┐
│                   ANGULAR COMPONENT                          │
│  - Captures user input                                       │
│  - Validates form data                                       │
│  - Calls service methods                                     │
└────────────────────────┬─────────────────────────────────────┘
                         ↓
┌──────────────────────────────────────────────────────────────┐
│               SERVICE LAYER (ApiService)                     │
│  - Prepares HTTP request                                     │
│  - Adds headers (via Interceptor)                            │
└────────────────────────┬─────────────────────────────────────┘
                         ↓
┌──────────────────────────────────────────────────────────────┐
│               AUTH INTERCEPTOR                               │
│  - Adds JWT token to Authorization header                   │
│  - Authorization: Bearer eyJhbGci...                         │
└────────────────────────┬─────────────────────────────────────┘
                         ↓
┌──────────────────────────────────────────────────────────────┐
│               HTTP REQUEST TO BACKEND                        │
│  POST http://localhost:8080/api/appointments                 │
│  Headers: { Authorization: "Bearer ...", Content-Type: ... } │
│  Body: { patientId, doctorId, date, time, reason }          │
└────────────────────────┬─────────────────────────────────────┘
                         ↓
                   [BACKEND PROCESSING]
                         ↓
┌──────────────────────────────────────────────────────────────┐
│               HTTP RESPONSE FROM BACKEND                     │
│  Status: 201 Created                                         │
│  Body: { success: true, appointment: {...} }                 │
└────────────────────────┬─────────────────────────────────────┘
                         ↓
┌──────────────────────────────────────────────────────────────┐
│               SERVICE RECEIVES RESPONSE                      │
│  - Maps response to TypeScript objects                       │
│  - Handles errors                                            │
└────────────────────────┬─────────────────────────────────────┘
                         ↓
┌──────────────────────────────────────────────────────────────┐
│               NGRX STORE (OPTIONAL)                          │
│  - Dispatches success action                                 │
│  - Updates global state                                      │
│  - Notifies all subscribers                                  │
└────────────────────────┬─────────────────────────────────────┘
                         ↓
┌──────────────────────────────────────────────────────────────┐
│               COMPONENT UPDATES UI                           │
│  - Shows success toast                                       │
│  - Refreshes appointment list                                │
│  - Resets form                                               │
└──────────────────────────────────────────────────────────────┘
```

---

## **12. COMPLETE USER JOURNEY**

```
1. User opens browser
   ↓
2. Lands on / (HeroComponent)
   ↓
3. Clicks "Login"
   ↓
4. Navigates to /login (LoginComponent)
   ↓
5. Selects role: "Doctor"
   ↓
6. Enters credentials
   ↓
7. Clicks "Login"
   ↓
8. AuthService validates → JWT stored
   ↓
9. Navigates to /app
   ↓
10. AuthGuard checks authentication ✅
   ↓
11. LayoutComponent renders
   ↓
12. Shows Sidebar + Dashboard
   ↓
13. User clicks "Appointments" in sidebar
   ↓
14. LayoutComponent changes activePage
   ↓
15. AppointmentsComponent loads
   ↓
16. Fetches doctors, patients, appointments
   ↓
17. User books appointment (see detailed flow above)
   ↓
18. Backend saves + returns response
   ↓
19. Frontend updates UI
   ↓
20. User sees success message ✅
```

---

This is the complete frontend flow from index.html to every interaction in the Hospital Management System!
