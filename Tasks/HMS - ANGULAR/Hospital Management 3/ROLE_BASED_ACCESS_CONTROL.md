# Role-Based Access Control (RBAC) Implementation

## Overview
Implemented role-based access control for the Hospital Management System to restrict certain actions based on user roles.

---

## Access Control Matrix

| Feature | Admin | Doctor | Nurse | Patient |
|---------|-------|--------|-------|---------|
| **Doctors Page** |
| View Doctors | ✅ | ✅ | ✅ | ❌ |
| Register Doctor | ✅ | ✅ | ❌ | ❌ |
| **Patients Page** |
| View Patients | ✅ | ✅ | ✅ | ❌ |
| Register Patient | ✅ | ✅ | ✅ | ❌ |
| **Staff Page** |
| View Staff | ✅ | ✅ | ✅ | ❌ |
| Register Staff | ✅ | ✅ | ❌ | ❌ |
| **Appointments Page** |
| View Appointments | ✅ | ✅ | ✅ | ✅ |
| Book Appointment | ✅ | ✅ | ✅ | ✅ |

---

## Implementation Details

### **1. Doctors Component**
```typescript
canAddDoctor: boolean = false;

ngOnInit() {
  this.currentUserRole = this.authService.getRole();
  this.canAddDoctor = this.authService.hasAnyRole(['Admin', 'Doctor']);
}
```

**Access Rules:**
- ✅ **Admin** can register doctors
- ✅ **Doctor** can register doctors
- ❌ **Nurse** cannot register doctors
- ❌ **Patient** cannot access doctors page

---

### **2. Patients Component**
```typescript
canAddPatient: boolean = false;

ngOnInit() {
  this.currentUserRole = this.authService.getRole();
  this.canAddPatient = this.authService.hasAnyRole(['Admin', 'Doctor', 'Nurse']);
}
```

**Access Rules:**
- ✅ **Admin** can register patients
- ✅ **Doctor** can register patients
- ✅ **Nurse** can register patients
- ❌ **Patient** cannot access patients page

---

### **3. Staff Component**
```typescript
canAddStaff: boolean = false;

ngOnInit() {
  this.currentUserRole = this.authService.getRole();
  this.canAddStaff = this.authService.hasAnyRole(['Admin', 'Doctor']);
}
```

**Access Rules:**
- ✅ **Admin** can register staff
- ✅ **Doctor** can register staff
- ❌ **Nurse** cannot register staff
- ❌ **Patient** cannot access staff page

---

## HTML Template Pattern

All three components use the same pattern to conditionally show the register button:

```html
<div *ngIf="(meta$ | async)?.page?.header?.fields as fields">
  <ng-container *ngIf="canAddDoctor">  <!-- or canAddPatient, canAddStaff -->
    <app-button *ngFor="let btn of fields" 
      [cssClass]="btn.cssClass" 
      [disabled]="btn.disabled" 
      [label]="btn.label"
      [variant]="btn.variant" 
      (clicked)="handleButtonClick(btn)">
    </app-button>
  </ng-container>
</div>
```

---

## AuthService Methods Used

### **getRole()**
Returns the current user's role as a string.

```typescript
getRole(): string | null {
  return this.getCurrentUser()?.role || null;
}
```

### **hasRole(role: string)**
Checks if the current user has a specific role.

```typescript
hasRole(role: string): boolean {
  return this.getRole() === role;
}
```

### **hasAnyRole(roles: string[])**
Checks if the current user has any of the specified roles.

```typescript
hasAnyRole(roles: string[]): boolean {
  const userRole = this.getRole();
  return userRole ? roles.includes(userRole) : false;
}
```

---

## User Experience by Role

### **Admin Login**
- ✅ Can register doctors, patients, and staff
- ✅ Full access to all pages
- ✅ All "Register" buttons visible

### **Doctor Login**
- ✅ Can register doctors, patients, and staff
- ✅ Access to doctors, patients, staff, appointments pages
- ✅ "Register Doctor" and "Register Staff" buttons visible
- ✅ "Register Patient" button visible

### **Nurse Login**
- ✅ Can register patients only
- ✅ Access to doctors, patients, staff, appointments pages
- ❌ "Register Doctor" button hidden
- ❌ "Register Staff" button hidden
- ✅ "Register Patient" button visible

### **Patient Login**
- ❌ Cannot register anyone
- ✅ Access to appointments page only
- ❌ Cannot access doctors, patients, or staff pages

---

## Security Notes

1. **Frontend Protection**: The buttons are hidden based on role, but this is UI-level protection only.

2. **Backend Protection**: The backend API endpoints should also validate user roles before allowing registration.

3. **Token-Based**: Role information is stored in the JWT token and localStorage.

4. **Session Management**: Role is checked on component initialization and when user logs in.

---

## Testing Scenarios

### **Test Case 1: Admin User**
1. Login as Admin
2. Navigate to Doctors page → "Register Doctor" button should be visible
3. Navigate to Patients page → "Register Patient" button should be visible
4. Navigate to Staff page → "Register Staff" button should be visible

### **Test Case 2: Doctor User**
1. Login as Doctor
2. Navigate to Doctors page → "Register Doctor" button should be visible
3. Navigate to Patients page → "Register Patient" button should be visible
4. Navigate to Staff page → "Register Staff" button should be visible

### **Test Case 3: Nurse User**
1. Login as Nurse
2. Navigate to Doctors page → "Register Doctor" button should be hidden
3. Navigate to Patients page → "Register Patient" button should be visible
4. Navigate to Staff page → "Register Staff" button should be hidden

### **Test Case 4: Patient User**
1. Login as Patient
2. Should only have access to Appointments page
3. No register buttons should be visible

---

## Future Enhancements

1. **Granular Permissions**: Add more fine-grained permissions (edit, delete, view details)
2. **Permission Service**: Create a dedicated permission service for complex rules
3. **Backend Validation**: Ensure backend validates all role-based actions
4. **Audit Logging**: Log all registration attempts with user role information
5. **Dynamic Permissions**: Load permissions from backend configuration

---

## Files Modified

### **Components:**
- `Frontend/src/app/components/doctors/doctors.component.ts`
- `Frontend/src/app/components/doctors/doctors.component.html`
- `Frontend/src/app/components/patients/patients.component.ts`
- `Frontend/src/app/components/patients/patients.component.html`
- `Frontend/src/app/components/staff/staff.component.ts`
- `Frontend/src/app/components/staff/staff.component.html`

### **Services:**
- `Frontend/src/app/services/auth.service.ts` (already had role methods)

---

## Summary

✅ Role-based access control successfully implemented
✅ Register buttons conditionally shown based on user role
✅ Clean, maintainable code using AuthService methods
✅ Consistent pattern across all three components
✅ No diagnostics errors

The system now properly restricts registration actions based on user roles while maintaining a clean user experience!
