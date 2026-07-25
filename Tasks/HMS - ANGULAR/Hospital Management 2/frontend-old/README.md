# Hospital Management System - Frontend

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Spring Boot backend running on `http://localhost:8080`

### Installation
```bash
cd frontend-old
npm install
npm start
```

The application will open at `http://localhost:4200`

---

## 🏗️ Architecture

This is a **metadata-driven Angular application** that connects to a Spring Boot backend.

### Key Features
- ✅ **Standalone Components** - No NgModules
- ✅ **Single Global CSS** - All styles in `src/styles.css`
- ✅ **Metadata-Driven UI** - JSON configuration for all UI elements
- ✅ **NgRx State Management** - Centralized state
- ✅ **Backend Integration** - Connected to Spring Boot API

---

## 🔌 Backend Integration

### API Configuration
**File:** `src/app/environments/environment.ts`

```typescript
export const environment = {
  useApi: true,
  apiBaseUrl: 'http://localhost:8080/api'
};
```

### Authentication Flow
1. User selects role and enters credentials
2. Frontend sends POST to `/api/auth/login`
3. Backend returns JWT token + user info
4. Token stored in localStorage
5. All subsequent requests include `Authorization: Bearer <token>` header

### Current Integration Status
✅ **Login** - Fully integrated with backend
✅ **Registration** - Fully integrated with backend
✅ **Token Validation** - Fully integrated with backend
⏳ **Dashboard** - Needs backend integration
⏳ **Patients** - Needs backend integration
⏳ **Appointments** - Needs backend integration
⏳ **Doctors** - Needs backend integration

---

## 📁 Project Structure

```
frontend-old/
├── src/
│   ├── app/
│   │   ├── components/          # UI components
│   │   │   ├── login/          # Login page (✅ Backend integrated)
│   │   │   ├── dashboard/      # Dashboard (⏳ Needs integration)
│   │   │   ├── patients/       # Patients module
│   │   │   ├── appointments/   # Appointments module
│   │   │   └── ...
│   │   │
│   │   ├── services/
│   │   │   ├── auth.service.ts      # ✅ Backend integrated
│   │   │   ├── api.service.ts       # HTTP service
│   │   │   └── auth.interceptor.ts  # JWT token injection
│   │   │
│   │   ├── store/              # NgRx state management
│   │   │   ├── login/
│   │   │   ├── dashboard/
│   │   │   └── ...
│   │   │
│   │   └── environments/
│   │       └── environment.ts  # API configuration
│   │
│   ├── assets/
│   │   └── metadata/           # UI configuration files
│   │       ├── login.metadata.json
│   │       ├── dashboard.metadata.json
│   │       └── ...
│   │
│   └── styles.css              # Global styles
│
├── package.json
├── angular.json
└── tsconfig.json
```

---

## 🔐 Authentication

### Login Request
```typescript
POST http://localhost:8080/api/auth/login
Content-Type: application/json

{
  "username": "admin1",
  "password": "password123",
  "role": "ADMIN"  // ADMIN, DOCTOR, NURSE, PATIENT
}
```

### Login Response
```typescript
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "admin1",
    "name": "Admin User",
    "email": "admin@hospital.com",
    "role": "ADMIN"
  }
}
```

### Token Storage
- Token stored in: `localStorage.getItem('auth_token')`
- User data stored in: `localStorage.getItem('current_user')`

---

## 📊 Metadata-Driven Architecture

All UI elements are configured via JSON files in `src/assets/metadata/`

### Example: Login Metadata
**File:** `src/assets/metadata/login.metadata.json`

```json
{
  "cards": [
    { "name": "Admin", "label": "Admin", "icon": "👨‍💼" },
    { "name": "Doctor", "label": "Doctor", "icon": "👨‍⚕️" }
  ],
  "fields": [
    {
      "key": "username",
      "label": "Username",
      "type": "text",
      "required": true,
      "validations": {
        "required": { "message": "Username is required" }
      }
    }
  ]
}
```

### How It Works
1. Component fetches metadata: `api.getMetadata('login')`
2. Metadata defines UI structure
3. Template renders dynamically: `*ngFor="let field of fields"`
4. Forms generated at runtime: `buildFormGroupFromFields(fields)`

**See:** `METADATA_ARCHITECTURE_ANALYSIS.md` for complete details

---

## 🛠️ Development

### Available Scripts

```bash
# Start development server (port 4200)
npm start

# Build for production
npm run build

# Build with production optimizations
npm run build:prod
```

### Backend Requirements

The frontend expects the backend to be running on `http://localhost:8080`

**Start Backend:**
```bash
cd Backend
./gradlew bootRun
# or use your IDE to run HospitalManagement.java
```

---

## 🔄 API Integration Guide

### Step 1: Update Service
```typescript
// src/app/services/patient.service.ts
export class PatientService {
  constructor(private http: HttpClient) {}
  
  getAllPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${environment.apiBaseUrl}/patients`);
  }
}
```

### Step 2: Update Effects
```typescript
// src/app/store/patients/patients.effects.ts
loadPatients$ = createEffect(() =>
  this.actions$.pipe(
    ofType(PatientsActions.loadPatients),
    switchMap(() =>
      this.patientService.getAllPatients().pipe(
        map(patients => PatientsActions.loadPatientsSuccess({ patients })),
        catchError(error => of(PatientsActions.loadPatientsFailure({ error })))
      )
    )
  )
);
```

### Step 3: Update Component
```typescript
// Component automatically gets data from store
patients$ = this.store.select(selectAllPatients);
```

---

## 🎨 Styling

All styles are in a single file: `src/styles.css`

### CSS Variables
```css
:root {
  --navy: #0a0f1e;
  --teal: #00c9a7;
  --text: #e8eef7;
  --muted: #7a8ba5;
}
```

### Component Classes
```css
.login-page { /* Login container */ }
.stat-card { /* Dashboard cards */ }
.data-table { /* Tables */ }
```

**No component-specific CSS files** - everything is global

---

## 🧪 Testing

### Test Login Flow
1. Start backend: `cd Backend && ./gradlew bootRun`
2. Start frontend: `cd frontend-old && npm start`
3. Navigate to `http://localhost:4200`
4. Select role (Admin/Doctor/Nurse/Patient)
5. Enter credentials
6. Click "Sign In"

### Test Credentials
Check your backend database for existing users or create new ones via registration.

---

## 📚 Documentation

- **BACKEND_INTEGRATION.md** - Backend API integration details
- **METADATA_ARCHITECTURE_ANALYSIS.md** - Metadata-driven architecture
- **TSCONFIG_FIX.md** - TypeScript configuration fixes
- **Backend/COMPLETE_API_ENDPOINTS.md** - All available API endpoints

---

## 🚨 Troubleshooting

### CORS Error
**Problem:** Browser blocks requests to backend

**Solution:** Backend has `@CrossOrigin(origins = "*")` - ensure it's present

### Connection Refused
**Problem:** Cannot connect to `http://localhost:8080`

**Solution:** Ensure backend is running:
```bash
cd Backend
./gradlew bootRun
```

### Token Expired
**Problem:** 401 Unauthorized errors

**Solution:** Login again to get new token

### Metadata Not Loading
**Problem:** UI elements not showing

**Solution:** Check browser console for 404 errors on metadata files

---

## 🔜 Next Steps

### Immediate Tasks
1. ✅ Login integration - DONE
2. ⏳ Dashboard integration - Connect to `/api/admins/dashboard-stats`
3. ⏳ Patients module - Connect to `/api/patients`
4. ⏳ Appointments module - Connect to `/api/appointments`
5. ⏳ Doctors module - Connect to `/api/doctors`

### Future Enhancements
- Real-time notifications
- File upload for patient records
- Advanced search and filtering
- Data export functionality
- Role-based UI customization
- Multi-language support

---

## 📞 Support

For issues or questions:
1. Check documentation files in this directory
2. Review backend API documentation: `Backend/COMPLETE_API_ENDPOINTS.md`
3. Check browser console for errors
4. Verify backend is running and accessible

---

## 🏆 Architecture Benefits

✅ **Metadata-Driven** - Change UI without code changes
✅ **Type-Safe** - Full TypeScript coverage
✅ **Scalable** - Easy to add new modules
✅ **Maintainable** - Single CSS file, clear structure
✅ **Testable** - Pure functions and effects
✅ **Flexible** - Backend-agnostic design
✅ **Modern** - Angular 17 standalone components
✅ **State Management** - NgRx for predictable state

---

## 📝 License

Hospital Management System - Internal Use
