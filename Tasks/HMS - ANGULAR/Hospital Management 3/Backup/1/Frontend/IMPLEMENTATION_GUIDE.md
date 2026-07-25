# Hospital Management System - Project 2 Implementation Guide

## Overview
Project 2 has been structured as a **standalone Angular 17** application following your requirements:
- ✅ Standalone components with no NgModules
- ✅ Single global CSS file for all styling
- ✅ Data-driven architecture via metadata JSON files
- ✅ Local data layer (ready for Spring Boot integration)
- ✅ Fully reusable components
- ✅ NgRx state management with effects
- ✅ Utility layer for reusable logic

---

## Project Structure

```
project 2/
├── src/
│   ├── index.html              # Entry point
│   ├── main.ts                 # Bootstrap with NgRx providers
│   ├── styles.css              # Global styles (dark theme via CSS variables)
│   ├── app/
│   │   ├── app.component.ts/html
│   │   ├── app.routes.ts       # Route definitions
│   │   ├── components/         # Reusable UI components
│   │   ├── data/               # Local JSON data files
│   │   ├── metadata/           # Metadata-driven configs
│   │   ├── services/           # API service
│   │   ├── store/              # NgRx state management
│   │   ├── utility/            # Shared utilities
│   │   └── environments/       # Environment configs
│   └── ...
├── angular.json
├── package.json
└── tsconfig.json
```

---

## Key Features Implemented

### 1. **Standalone Components**
All components are standalone with explicit imports:

```typescript
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardComponent],
  templateUrl: './login.component.html'
})
```

### 2. **Centralized Global Styling**
`src/styles.css` contains:
- CSS custom properties (--navy, --teal, --text, etc.)
- Base resets and utilities
- Theme-specific classes
- Component-scoped styles

All components rely on `styles.css` with **no component-level CSS files**.

### 3. **Metadata-Driven Architecture**
Metadata defines UI structure in `src/app/metadata/`:

**Example:** `login.metadata.json`
```json
{
  "Layout": { "heading": "Welcome back" },
  "cards": [
    { "name": "Admin", "label": "Admin", "icon": "👨‍💼", "properties": { "css": "role-chip" } }
  ],
  "fields": [
    {
      "key": "username",
      "label": "Username",
      "type": "text",
      "required": true,
      "validations": { "required": { "message": "Username is required" } }
    }
  ]
}
```

### 4. **Reusable Components**

#### **CardComponent**
Generic card rendering from metadata:
```html
<app-card 
  [label]="card.label" 
  [icon]="card.icon" 
  [value]="stats[card.key]"
  [cssClass]="card.cssClass">
</app-card>
```

#### **Layout Components**
- `SidebarComponent` - Metadata-driven navigation
- `HeaderComponent` - Reusable header
- `LoginComponent` - Metadata-driven login form
- `DashboardComponent` - Data-driven dashboard

### 5. **NgRx State Management**
Pattern per feature module:

**Actions** (`store/login/login.actions.ts`):
```typescript
export const loadLogin = createAction('[Load Login]');
export const loadLoginSuccess = createAction('[Login Success]', props<{loginData: any}>());
export const loadLoginFailure = createAction('[Login Failure]', props<{error: string}>());
```

**Reducer** (`store/login/login.reducer.ts`):
```typescript
export const loginReducer = createReducer(
  initialState,
  on(LoginActions.loadLogin, state => ({ ...state, loading: true })),
  on(LoginActions.loadLoginSuccess, (s, { loginData }) => ({ ...s, loginData, loading: false })),
  on(LoginActions.loadLoginFailure, (s, { error }) => ({ ...s, error, loading: false }))
);
```

**Selectors** (`store/login/login.selectors.ts`):
```typescript
export const selectLoginLayout = createSelector(selectLoginState, s => s.loginData.Layout);
export const selectLoginCards = createSelector(selectLoginState, s => s.loginData.cards);
```

**Effects** (`store/login/login.effects.ts`):
```typescript
@Injectable()
export class LoginEffects {
  loadLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.loadLogin),
      switchMap(() =>
        this.api.getMetadata<any>('login').pipe(
          map(loginData => LoginActions.loadLoginSuccess({loginData})),
          catchError(err => of(LoginActions.loadLoginFailure({error: err.message})))
        )
      )
    )
  );
}
```

### 6. **Utility Layer**
`src/app/utility/utilities.ts` provides reusable helpers:

```typescript
// Form group generation from metadata
export function buildFormGroupFromFields(fields: any[] = []): FormGroup {
  const controls: { [key: string]: FormControl } = {};
  fields.forEach(field => {
    const validators = [];
    if (field.required) validators.push(Validators.required);
    if (field.validations?.minLength) {
      validators.push(Validators.minLength(field.validations.minLength.value));
    }
    controls[field.key] = new FormControl(field.defaultValue || '', validators);
  });
  return new FormGroup(controls);
}

// Class list builder
export function classList(...items: Array<string | null | undefined | false>): string {
  return items.filter(Boolean).join(' ');
}
```

### 7. **Local Data Layer**
Data resides in `src/app/data/`:

**dashboard.data.json:**
```json
{
  "totalPatients": 1240,
  "totalDoctors": 48,
  "appointments": 35,
  "recentActivity": [
    { "time": "09:10 AM", "activity": "Patient registered", "user": "Reception", "status": "Completed" }
  ]
}
```

The `ApiService` switches between local and API based on `environment.useApi`:

```typescript
getAll<T>(module: string): Observable<T> {
  if (environment.useApi) {
    return this.http.get<T>(`${this.apiBase}/${module}`);
  }
  return this.http.get<T>(`${this.localBase}/${module}.data.json`);
}
```

---

## Component Initialization Flow

1. **Bootstrap** (`main.ts`) - Provides NgRx store and routes
2. **App Component** - Router outlet loads routes
3. **Login Route** → `LoginComponent`
   - Dispatches `LoginActions.loadLogin()`
   - Effect fetches `login.metadata.json`
   - Populates form fields dynamically
4. **Layout Route** → `LayoutComponent`
   - Navigation via sidebar (`SidebarComponent`)
   - Active page switches child components

---

## Integration with Spring Boot

**To switch to Spring Boot:**

1. Set `environment.useApi = true` in `src/app/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  useApi: true,  // Enable API calls
  apiBaseUrl: 'http://localhost:8080/api'
};
```

2. Update API endpoints to match Spring Boot:
   - `GET /api/login` → Returns login metadata
   - `GET /api/dashboard` → Returns dashboard data
   - `GET /api/patients` → Returns patient list
   - etc.

3. Metadata can be retrieved from:
   - Static JSON files (current)
   - API endpoints (`/api/metadata/login`)
   - Database (Spring Boot)

---

## Styling System

**Global CSS Variables** (src/styles.css):
```css
:root {
  --navy: #0a0f1e;
  --teal: #00c9a7;
  --text: #e8eef7;
  --muted: #7a8ba5;
  /* ... more */
}
```

**Component Classes** (no component CSS):
- `.role-chip` - Role selector buttons
- `.login-card` - Login form card
- `.stat-grid` - Dashboard stat cards
- `.data-table` - Data tables
- `.form-input` - Form inputs

All styling is inheritance-based from global CSS.

---

## Development Workflow

### Run Development Server
```bash
npm start
```

### Build Production
```bash
npm run build
```

### Testing
```bash
npm test
```

---

## Adding New Features

### 1. Create Metadata File
`src/app/metadata/patients.metadata.json`:
```json
{
  "page": { "title": "Patients" },
  "columns": [
    { "key": "name", "label": "Name" },
    { "key": "age", "label": "Age" }
  ]
}
```

### 2. Create Data File
`src/app/data/patients.data.json`:
```json
{
  "patients": [
    { "id": 1, "name": "John Doe", "age": 35 }
  ]
}
```

### 3. Create NgRx Store
Create directory `src/app/store/patients/`:
- `patients.actions.ts`
- `patients.reducer.ts`
- `patients.selectors.ts`
- `patients.effects.ts`

### 4. Create Component
`src/app/components/patients/patients.component.ts`:
```typescript
@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [CommonModule, CardComponent, TableComponent],
  templateUrl: './patients.component.html'
})
export class PatientsComponent implements OnInit {
  meta: any;
  patients$ = this.store.select(selectPatients);

  constructor(private store: Store, private api: ApiService) {}

  ngOnInit() {
    this.api.getMetadata('patients').subscribe(m => this.meta = m);
    this.store.dispatch(PatientsActions.loadPatients());
  }
}
```

### 5. Update Routes
`src/app/app.routes.ts`:
```typescript
{ path: 'patients', component: PatientsComponent }
```

---

## Key Benefits

✅ **Scalability** - Add new modules without touching core  
✅ **Maintainability** - Centralized styling and metadata  
✅ **Reusability** - Components work across modules  
✅ **Testability** - Pure functions in utilities  
✅ **Type Safety** - Full TypeScript coverage  
✅ **State Management** - Predictable NgRx flow  
✅ **API Ready** - Switch to Spring Boot with config change  

---

## Troubleshooting

### Build Errors
- Ensure all components import `CommonModule`
- Check metadata file paths in `ApiService`
- Verify environment config is correct

### Runtime Issues
- Check browser console for binding errors
- Verify metadata structure matches selectors
- Ensure effects dispatch correct actions

### Styling Issues
- Use CSS custom properties for colors
- Check for specificity conflicts in `styles.css`
- Use utility classes from global CSS

---

## Next Steps

1. ✅ Replicating `core.html` with reusable components
2. ⏭️ Connect Spring Boot backend APIs
3. ⏭️ Add patient management module
4. ⏭️ Implement authentication service
5. ⏭️ Add real-time notifications
