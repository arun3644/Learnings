# Frontend Flow - Quick Overview (5 min read)

## **1. Application Startup (index.html → main.ts)**

```
Browser loads index.html
    ↓
Finds <app-root></app-root>
    ↓
main.ts executes
    ├── Sets up Router (navigation)
    ├── Sets up HttpClient + JWT Interceptor (API calls)
    ├── Sets up NgRx Store (state management)
    └── Bootstraps AppComponent
        ↓
    AppComponent renders:
        ├── <app-toast> (notifications)
        └── <router-outlet> (renders pages based on URL)
```

---

## **2. User Journey**

```
┌─────────────────────────────────────────────────────────────────┐
│ Step 1: Landing Page (/)                                        │
├─────────────────────────────────────────────────────────────────┤
│ HeroComponent                                                   │
│ [Login Button] [Sign Up Button]                                │
└─────────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│ Step 2: Login Page (/login)                                     │
├─────────────────────────────────────────────────────────────────┤
│ LoginComponent                                                  │
│ 1. Select role card (Admin/Doctor/Nurse/Patient)               │
│ 2. Enter username & password                                    │
│ 3. Click Login                                                  │
│    ↓                                                            │
│ AuthService.login()                                             │
│    ↓                                                            │
│ POST /api/auth/login → Backend validates                       │
│    ↓                                                            │
│ Save JWT token + user to localStorage                          │
│    ↓                                                            │
│ Navigate to /app                                                │
└─────────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│ Step 3: Protected Route (/app)                                  │
├─────────────────────────────────────────────────────────────────┤
│ AuthGuard checks:                                               │
│ ✅ Has token? → YES                                             │
│ ✅ Token valid? → YES                                           │
│ → Allow access                                                  │
└─────────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│ Step 4: Main App Layout                                         │
├─────────────────────────────────────────────────────────────────┤
│ LayoutComponent                                                 │
│ ┌─────────────┬─────────────────────────────────────────────┐  │
│ │  Sidebar    │  Main Content Area                          │  │
│ │             │  ┌──────────────────────────────────────┐   │  │
│ │ Dashboard   │  │  <app-header>                        │   │  │
│ │ Appointments│  │  User: Dr. Smith   [Logout]          │   │  │
│ │ Patients    │  │                                      │   │  │
│ │ Doctors     │  ├──────────────────────────────────────┤   │  │
│ │ Staff       │  │                                      │   │  │
│ │             │  │  <app-dashboard> OR                  │   │  │
│ │             │  │  <app-appointments> OR               │   │  │
│ │             │  │  <app-patients> OR                   │   │  │
│ │             │  │  <app-doctors> OR                    │   │  │
│ │             │  │  <app-staff>                         │   │  │
│ │             │  │                                      │   │  │
│ │             │  │  (Based on which menu clicked)       │   │  │
│ │             │  └──────────────────────────────────────┘   │  │
│ └─────────────┴─────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## **3. Appointment Booking Flow**

```
User clicks "Appointments" in sidebar
    ↓
AppointmentsComponent loads
    ↓
┌───────────────────────────────────────────────────────────────────┐
│ Loads Data from Backend:                                         │
├───────────────────────────────────────────────────────────────────┤
│ GET /api/doctors          → [Dr. Smith (Cardio), Dr. Doe (Neuro)]│
│ GET /api/patients         → [John, Jane, Bob]                    │
│ GET /api/appointments     → [Existing appointments]              │
└───────────────────────────────────────────────────────────────────┘
    ↓
┌───────────────────────────────────────────────────────────────────┐
│ User Interaction:                                                 │
├───────────────────────────────────────────────────────────────────┤
│ 1. Select Specialization: [Cardiology ▼]                         │
│    → Filters doctors                                              │
│                                                                   │
│ 2. Select Doctor: [Dr. Smith ▼]                                  │
│    → Loads doctor's time slots                                   │
│                                                                   │
│ 3. Select Date from Calendar: [Dec 15, 2024]                     │
│    → Fetches available & booked slots:                           │
│      GET /doctors/5/available-slots?date=2024-12-15              │
│      GET /doctors/5/booked-slots?date=2024-12-15                 │
│                                                                   │
│ 4. Select Time Slot: [10:00 AM] (green = available)              │
│                                                                   │
│ 5. Enter Reason: "General checkup"                               │
│                                                                   │
│ 6. Click [Book Appointment]                                      │
└───────────────────────────────────────────────────────────────────┘
    ↓
POST /api/appointments
{
  patientId: 1,
  doctorId: 5,
  date: "2024-12-15T00:00:00Z",
  time: "10:00",
  duration: 30,
  reason: "General checkup"
}
    ↓
Backend:
├── Validates patient & doctor
├── Checks time slot availability
├── Marks slot as booked
└── Saves to PostgreSQL
    ↓
Response: { success: true, appointment: {...} }
    ↓
Frontend:
├── Shows success toast ✅
├── Marks time slot as booked (gray)
└── Updates appointment list
```

---

## **4. How HTTP Requests Work**

```
Component calls API
    ↓
ApiService.http.post('/api/appointments', data)
    ↓
AuthInterceptor automatically adds JWT:
    Headers: { Authorization: "Bearer eyJhbGc..." }
    ↓
Request goes to Backend
    ↓
Backend validates JWT → processes → responds
    ↓
Response comes back to Component
    ↓
Component updates UI
```

---

## **5. NgRx State Management (Optional Pattern)**

```
Component dispatches action
    ↓
store.dispatch(loadAppointments())
    ↓
Effect makes API call
    ↓
GET /api/appointments
    ↓
Dispatches success action with data
    ↓
Reducer updates store
    ↓
Component subscribes: appointments$ | async
    ↓
UI updates automatically
```

---

## **6. Key Files**

| File | Purpose |
|------|---------|
| `index.html` | Entry point, has `<app-root>` |
| `main.ts` | Bootstraps Angular app |
| `app.routes.ts` | Defines URL routes |
| `auth.guard.ts` | Protects routes (checks JWT) |
| `auth.interceptor.ts` | Adds JWT to API requests |
| `auth.service.ts` | Login/logout/token management |
| `api.service.ts` | Makes HTTP calls to backend |
| `layout.component.ts` | Main app shell (sidebar + content) |
| `appointments.component.ts` | Booking logic |

---

## **7. Authentication Flow (Detailed)**

```
┌─────────────────────────────────────────────────────────────┐
│ User enters username/password                               │
└─────────────────┬───────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────────────────────────┐
│ POST /api/auth/login                                        │
│ { username: "john_doe", password: "pass123", role: "Doctor"}│
└─────────────────┬───────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────────────────────────┐
│ Backend Response:                                           │
│ {                                                           │
│   success: true,                                            │
│   token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",        │
│   user: {                                                   │
│     id: 5,                                                  │
│     username: "john_doe",                                   │
│     role: "Doctor",                                         │
│     name: "Dr. John Doe"                                    │
│   }                                                         │
│ }                                                           │
└─────────────────┬───────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────────────────────────┐
│ AuthService stores in localStorage:                        │
│ - auth_token: "eyJhbGci..."                                 │
│ - current_user: {"id":5,"username":"john_doe",...}         │
└─────────────────┬───────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────────────────────────┐
│ Navigate to /app                                            │
│ AuthGuard checks token → ✅ Valid → Allow access            │
└─────────────────────────────────────────────────────────────┘
```

---

## **8. Component Hierarchy (Simple)**

```
AppComponent (Root)
│
├── ToastComponent (notifications)
│
└── RouterOutlet
    │
    ├── HeroComponent (/)
    │   └── Landing page with Login/Signup buttons
    │
    ├── LoginComponent (/login)
    │   └── Login form + Register form
    │
    └── LayoutComponent (/app) 🔒 Protected by AuthGuard
        │
        ├── SidebarComponent
        │   └── Navigation menu
        │
        ├── HeaderComponent
        │   └── User info + Logout
        │
        └── Content (switches based on menu selection):
            ├── DashboardComponent
            ├── AppointmentsComponent
            ├── PatientsComponent
            ├── DoctorsComponent
            └── StaffComponent
```

---

## **9. Data Flow (One Request)**

```
1. User clicks "Book Appointment"
2. Component: confirmBooking()
3. Service: apiService.post('appointments', data)
4. Interceptor: Adds "Authorization: Bearer TOKEN"
5. HTTP: POST http://localhost:8080/api/appointments
6. Backend: Validates → Saves to DB → Returns response
7. Service: Receives response
8. Component: Updates UI + Shows toast
```

---

**That's it! The entire frontend in 10 minutes.** 🚀
