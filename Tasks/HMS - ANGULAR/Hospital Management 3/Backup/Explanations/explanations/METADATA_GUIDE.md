# Metadata-Driven Architecture Guide

## Overview
This document explains how the Hospital Management System uses metadata to drive the UI, eliminating hard-coded templates and enabling rapid feature development.

---

## What is Metadata?

Metadata is **JSON configuration** that defines:
- Page structure and layout
- Form field definitions and validations
- Table columns and data transformations
- Card configurations and styling

**Files:** `src/app/metadata/*.metadata.json`

---

## Metadata Structure by Module

### 1. Login Module

**File:** `src/app/metadata/login.metadata.json`

Defines:
- Layout properties (heading, background)
- Role selection cards
- Login form fields with validations

```json
{
  "Layout": {
    "heading": "Welcome back",
    "backgrdClr": "#0a0f1e"
  },
  "cards": [
    {
      "name": "Admin",
      "label": "Admin",
      "icon": "👨‍💼",
      "properties": {
        "css": "role-chip"
      }
    }
  ],
  "form": {
    "title": "Hospital Login",
    "submitButton": {
      "label": "Login",
      "cssClass": "btn btn-primary btn-full"
    }
  },
  "fields": [
    {
      "key": "username",
      "label": "Username",
      "type": "text",
      "placeholder": "Enter username",
      "required": true,
      "cssClass": "form-field",
      "inputCssClass": "form-input",
      "validations": {
        "required": {
          "message": "Username is required"
        }
      }
    },
    {
      "key": "password",
      "label": "Password",
      "type": "password",
      "placeholder": "Enter password",
      "required": true,
      "validations": {
        "required": {
          "message": "Password is required"
        },
        "minLength": {
          "value": 6,
          "message": "Minimum 6 characters"
        }
      }
    }
  ]
}
```

### 2. Dashboard Module

**File:** `src/app/metadata/dashboard.metadata.json`

Defines:
- Page title and description
- Stat card configurations
- Recent activity table columns

**Example Structure:**
```json
{
  "page": {
    "title": "Dashboard",
    "description": "Hospital overview"
  },
  "statCards": [
    {
      "key": "totalPatients",
      "label": "Total Patients",
      "icon": "🧑‍⚕️",
      "cssClass": "stat-card stat-blue"
    },
    {
      "key": "totalDoctors",
      "label": "Doctors",
      "icon": "👨‍⚕️",
      "cssClass": "stat-card stat-green"
    }
  ],
  "recentActivity": {
    "title": "Recent Activity",
    "columns": [
      { "key": "time", "label": "Time", "cssClass": "col-time" },
      { "key": "activity", "label": "Activity", "cssClass": "col-activity" },
      { "key": "user", "label": "User", "cssClass": "col-user" },
      { "key": "status", "label": "Status", "cssClass": "col-status" }
    ]
  }
}
```

### 3. Sidebar Navigation

**File:** `src/app/metadata/sidebar.metadata.json`

Defines:
- Navigation items with keys, labels, and icons

```json
{
  "nav": [
    { "key": "dashboard", "label": "Dashboard", "icon": "🏠" },
    { "key": "patients", "label": "Patients", "icon": "🧑‍⚕️" },
    { "key": "doctors", "label": "Doctors", "icon": "👨‍⚕️" },
    { "key": "appointments", "label": "Appointments", "icon": "📅" },
    { "key": "billing", "label": "Billing", "icon": "💳" },
    { "key": "pharmacy", "label": "Pharmacy", "icon": "💊" },
    { "key": "wards", "label": "Wards", "icon": "🛏️" },
    { "key": "staff", "label": "Staff", "icon": "👥" },
    { "key": "reports", "label": "Reports", "icon": "📊" }
  ]
}
```

---

## Using Metadata in Components

### Fetching Metadata

**ApiService** (`src/app/services/api.service.ts`):
```typescript
getMetadata<T>(module: string): Observable<T> {
  return this.http.get<T>(`app/metadata/${module}.metadata.json`);
}
```

### Component Implementation

**LoginComponent** (`src/app/components/login/login.component.ts`):
```typescript
export class LoginComponent implements OnInit {
  loginData: any = null;
  loginForm: FormGroup = new FormGroup({});

  ngOnInit() {
    // Fetch metadata
    this.api.getMetadata<any>('login').subscribe(data => {
      this.loginData = data;
      // Generate form from metadata
      this.loginForm = buildFormGroupFromFields(data.fields);
    });
  }
}
```

**LoginComponent Template** (`src/app/components/login/login.component.html`):
```html
<div class="login-card">
  <h1>{{ loginData?.form?.title }}</h1>
  
  <!-- Dynamic role selection -->
  <div class="role-grid">
    <app-card
      *ngFor="let card of loginData?.cards"
      [label]="card.label"
      [icon]="card.icon"
      [cssClass]="card.properties?.css">
    </app-card>
  </div>

  <!-- Dynamic form -->
  <form [formGroup]="loginForm">
    <div *ngFor="let field of loginData?.fields" class="form-field">
      <label>{{ field.label }}</label>
      <input
        [type]="field.type"
        [placeholder]="field.placeholder"
        [formControlName]="field.key" />
      <div *ngIf="loginForm.get(field.key)?.errors?.['required']">
        {{ field.validations?.required?.message }}
      </div>
    </div>
  </form>
</div>
```

---

## Metadata Pattern: CardComponent

The reusable `CardComponent` adapts based on metadata:

**Metadata Configuration:**
```json
{
  "statCards": [
    {
      "key": "totalPatients",
      "label": "Total Patients",
      "icon": "🧑",
      "cssClass": "stat-card stat-blue"
    }
  ]
}
```

**Template Usage:**
```html
<app-card
  *ngFor="let card of meta.statCards"
  [label]="card.label"
  [icon]="card.icon"
  [value]="data[card.key]"
  [cssClass]="card.cssClass">
</app-card>
```

---

## Metadata Pattern: Dynamic Tables

Define table structure in metadata, data comes from API/local JSON:

**Metadata:**
```json
{
  "columns": [
    { "key": "name", "label": "Patient Name", "sortable": true },
    { "key": "age", "label": "Age" },
    { "key": "status", "label": "Status" }
  ]
}
```

**Data** (from `dashboard.data.json`):
```json
{
  "patients": [
    { "name": "John Doe", "age": 35, "status": "Active" },
    { "name": "Jane Smith", "age": 42, "status": "Discharged" }
  ]
}
```

**Template:**
```html
<table>
  <thead>
    <tr>
      <th *ngFor="let col of meta.columns">{{ col.label }}</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let row of tableData">
      <td *ngFor="let col of meta.columns">{{ row[col.key] }}</td>
    </tr>
  </tbody>
</table>
```

---

## Metadata for Dynamic Forms

**Pattern:** Define fields in metadata, build FormGroup at runtime

**Metadata:**
```json
{
  "fields": [
    {
      "key": "patientName",
      "label": "Patient Name",
      "type": "text",
      "required": true,
      "placeholder": "Enter full name",
      "validations": {
        "required": { "message": "Name required" },
        "minLength": { "value": 3, "message": "Min 3 chars" }
      }
    },
    {
      "key": "dateOfBirth",
      "label": "Date of Birth",
      "type": "date",
      "required": true
    }
  ]
}
```

**Component Utility** (`src/app/utility/utilities.ts`):
```typescript
export function buildFormGroupFromFields(fields: any[] = []): FormGroup {
  const controls: { [key: string]: FormControl } = {};
  
  fields.forEach(field => {
    const validators = [];
    if (field.required) validators.push(Validators.required);
    if (field.validations?.minLength) {
      validators.push(Validators.minLength(field.validations.minLength.value));
    }
    controls[field.key] = new FormControl('', validators);
  });
  
  return new FormGroup(controls);
}
```

---

## Metadata for CSS Classes

Dynamic styling via metadata `cssClass` property:

**Metadata:**
```json
{
  "cards": [
    { "name": "Urgent", "cssClass": "badge badge-urgent" },
    { "name": "Normal", "cssClass": "badge badge-normal" }
  ]
}
```

**Template:**
```html
<div [ngClass]="card.cssClass">{{ card.label }}</div>
```

---

## Validation Rules in Metadata

Define complex validation patterns:

```json
{
  "fields": [
    {
      "key": "email",
      "label": "Email",
      "type": "email",
      "validations": {
        "required": { "message": "Email is required" },
        "email": { "message": "Invalid email format" }
      }
    },
    {
      "key": "phone",
      "label": "Phone",
      "type": "tel",
      "validations": {
        "required": { "message": "Phone required" },
        "pattern": { "value": "^[0-9]{10}$", "message": "10 digits required" }
      }
    }
  ]
}
```

**Validator Builder** (enhancement to `utilities.ts`):
```typescript
function createValidators(validations: any = {}): ValidatorFn[] {
  const validators: ValidatorFn[] = [];
  
  if (validations.required) validators.push(Validators.required);
  if (validations.email) validators.push(Validators.email);
  if (validations.minLength) {
    validators.push(Validators.minLength(validations.minLength.value));
  }
  if (validations.pattern) {
    validators.push(Validators.pattern(validations.pattern.value));
  }
  
  return validators;
}
```

---

## Data vs Metadata

| Aspect | Data | Metadata |
|--------|------|----------|
| **Content** | Hospital records (patients, doctors) | UI structure & rules |
| **Location** | `src/app/data/*.data.json` | `src/app/metadata/*.metadata.json` |
| **Changes** | Frequently changed | Rarely changed |
| **Source** | Local JSON or Spring Boot API | Local JSON or Backend |
| **Purpose** | Display information | Define how to display |

---

## AddingNew Metadata

**Step 1:** Create metadata file
```bash
src/app/metadata/newfeature.metadata.json
```

**Step 2:** Define structure
```json
{
  "title": "New Feature",
  "fields": [...]
}
```

**Step 3:** Fetch in component
```typescript
this.api.getMetadata('newfeature').subscribe(m => this.meta = m);
```

**Step 4:** Use in template
```html
<h1>{{ meta.title }}</h1>
<app-card *ngFor="let item of meta.items" [item]="item"></app-card>
```

---

## Future: Server-Side Metadata

When connecting Spring Boot, fetch metadata from API:

```typescript
// Current (static)
getMetadata<T>(module: string): Observable<T> {
  return this.http.get<T>(`app/metadata/${module}.metadata.json`);
}

// Future (dynamic)
getMetadata<T>(module: string): Observable<T> {
  if (environment.useApi) {
    return this.http.get<T>(`${this.apiBase}/metadata/${module}`);
  }
  return this.http.get<T>(`app/metadata/${module}.metadata.json`);
}
```

Benefits:
- Admins can configure UI without redeploying
- Different roles see different metadata
- Real-time UI updates

---

## Best Practices

✅ Keep metadata structure simple  
✅ Use consistent naming conventions  
✅ Document metadata schema  
✅ Version metadata for compatibility  
✅ Validate metadata on load  
✅ Cache metadata in NgRx  
✅ Use metadata for all UI structure  
❌ Don't hardcode UI in templates when metadata exists  
❌ Don't mix metadata and template logic  
