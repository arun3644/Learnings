# 🔐 FRONTEND AUTHENTICATION REQUIREMENTS

This document specifies the EXACT response structures your backend must return to match the frontend expectations.

---

## 📋 ENDPOINTS REQUIRED

### 1. **POST /api/auth/login**
### 2. **POST /api/auth/register**

---

## 1️⃣ LOGIN ENDPOINT

### **Request Structure**

**URL:** `POST http://localhost:8080/api/auth/login`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "username": "doctor1",
  "password": "doctor123",
  "role": "Doctor"
}
```

**Field Details:**
- `username` (string, required): User's username
- `password` (string, required): User's password
- `role` (string, required): One of: "Admin", "Doctor", "Nurse", "Patient"

---

### **Response Structure (SUCCESS)**

**HTTP Status:** `200 OK`

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkb2N0b3IxIiwicm9sZSI6IkRvY3RvciIsImlhdCI6MTcwOTU1NjAwMCwiZXhwIjoxNzA5NjQyNDAwfQ.signature",
  "user": {
    "id": "2",
    "username": "doctor1",
    "name": "Dr. Sarah Johnson",
    "email": "sarah.j@hospital.com",
    "role": "Doctor"
  },
  "message": "Login successful"
}
```

**Field Details:**
- `success` (boolean, required): Must be `true` for successful login
- `token` (string, required): JWT token for authentication
- `user` (object, required): User information
  - `id` (string, required): User ID
  - `username` (string, required): Username
  - `name` (string, optional): Full name
  - `email` (string, optional): Email address
  - `role` (string, required): User role (must match request role)
- `message` (string, optional): Success message

---

### **Response Structure (FAILURE)**

**HTTP Status:** `401 Unauthorized` or `400 Bad Request`

```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

**Field Details:**
- `success` (boolean, required): Must be `false` for failed login
- `message` (string, required): Error message to display to user

**Common Error Messages:**
- `"Invalid credentials"` - Wrong username/password
- `"Invalid role selected"` - Role doesn't exist
- `"User not found"` - User doesn't exist
- `"Account is disabled"` - Account is inactive

---

## 2️⃣ REGISTER ENDPOINT

### **Request Structure**

**URL:** `POST http://localhost:8080/api/auth/register`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "username": "john_patient",
  "password": "john123",
  "role": "Patient",
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Field Details:**
- `username` (string, required): Desired username (3-50 characters)
- `password` (string, required): Password (minimum 6 characters)
- `role` (string, required): One of: "Doctor", "Nurse", "Patient" (NOT "Admin")
- `name` (string, required): Full name
- `email` (string, required): Valid email address

**Important:** Registration is NOT allowed for "Admin" role!

---

### **Response Structure (SUCCESS)**

**HTTP Status:** `201 Created` or `200 OK`

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqb2huX3BhdGllbnQiLCJyb2xlIjoiUGF0aWVudCIsImlhdCI6MTcwOTU1NjAwMCwiZXhwIjoxNzA5NjQyNDAwfQ.signature",
  "user": {
    "id": "8",
    "username": "john_patient",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "Patient"
  },
  "message": "User registered successfully"
}
```

**Field Details:**
- `success` (boolean, required): Must be `true` for successful registration
- `token` (string, required): JWT token for immediate login after registration
- `user` (object, required): Newly created user information
  - `id` (string, required): Generated user ID
  - `username` (string, required): Username
  - `name` (string, required): Full name
  - `email` (string, required): Email address
  - `role` (string, required): User role
- `message` (string, optional): Success message

---

### **Response Structure (FAILURE)**

**HTTP Status:** `400 Bad Request`

```json
{
  "success": false,
  "message": "Username already exists"
}
```

**Field Details:**
- `success` (boolean, required): Must be `false` for failed registration
- `message` (string, required): Error message to display to user

**Common Error Messages:**
- `"Username already exists"` - Username is taken
- `"Email already exists"` - Email is already registered
- `"Registration only allowed for Doctor, Nurse, or Patient roles"` - Tried to register as Admin
- `"Invalid email format"` - Email validation failed
- `"Password must be at least 6 characters"` - Password too short
- `"Username must be between 3 and 50 characters"` - Username length invalid

---

## 🎯 FRONTEND BEHAVIOR

### **After Successful Login/Register:**
1. Frontend stores `token` in `localStorage` with key `'auth_token'`
2. Frontend stores `user` object in `localStorage` with key `'current_user'`
3. Frontend navigates to `/app` (dashboard)
4. Frontend includes token in all subsequent requests:
   ```
   Authorization: Bearer <token>
   ```

### **After Failed Login/Register:**
1. Frontend displays `message` to user
2. User remains on login page
3. No data is stored in localStorage

### **Token Usage:**
- Frontend sends token in `Authorization` header for all protected endpoints
- Format: `Authorization: Bearer <token>`
- Endpoints that DON'T require token:
  - `/api/auth/login`
  - `/api/auth/register`
  - `/assets/metadata/*` (metadata files)
  - `/assets/data/*` (data files)

---

## 📝 VALIDATION RULES

### **Username:**
- Required
- Minimum 3 characters
- Maximum 50 characters
- Must be unique

### **Password:**
- Required
- Minimum 6 characters

### **Email:**
- Required
- Must be valid email format
- Must be unique

### **Role:**
- Required
- Login: Must be one of: "Admin", "Doctor", "Nurse", "Patient"
- Register: Must be one of: "Doctor", "Nurse", "Patient" (Admin NOT allowed)

### **Name:**
- Required (for registration only)
- Cannot be empty

---

## 🔧 EXAMPLE IMPLEMENTATIONS

### **Login Controller (Java)**

```java
@PostMapping("/login")
public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
    try {
        LoginResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    } catch (RuntimeException e) {
        LoginResponse errorResponse = LoginResponse.error(e.getMessage());
        return ResponseEntity.status(401).body(errorResponse);
    }
}
```

### **Register Controller (Java)**

```java
@PostMapping("/register")
public ResponseEntity<RegisterResponse> register(@Valid @RequestBody RegisterRequest request) {
    try {
        RegisterResponse response = authService.register(request);
        return ResponseEntity.status(201).body(response);
    } catch (RuntimeException e) {
        RegisterResponse errorResponse = RegisterResponse.error(e.getMessage());
        return ResponseEntity.status(400).body(errorResponse);
    }
}
```

---

## 🧪 TEST CASES

### **Test Login - Success**
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "doctor1",
    "password": "doctor123",
    "role": "Doctor"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "token": "eyJhbGci...",
  "user": {
    "id": "2",
    "username": "doctor1",
    "name": "Dr. Sarah Johnson",
    "email": "sarah.j@hospital.com",
    "role": "Doctor"
  },
  "message": "Login successful"
}
```

---

### **Test Login - Failure**
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "wrong_user",
    "password": "wrong_pass",
    "role": "Doctor"
  }'
```

**Expected Response:**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

### **Test Register - Success**
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "new_patient",
    "password": "patient123",
    "role": "Patient",
    "name": "New Patient",
    "email": "newpatient@example.com"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "token": "eyJhbGci...",
  "user": {
    "id": "8",
    "username": "new_patient",
    "name": "New Patient",
    "email": "newpatient@example.com",
    "role": "Patient"
  },
  "message": "User registered successfully"
}
```

---

### **Test Register - Failure (Duplicate Username)**
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "doctor1",
    "password": "test123",
    "role": "Doctor",
    "name": "Test Doctor",
    "email": "test@example.com"
  }'
```

**Expected Response:**
```json
{
  "success": false,
  "message": "Username already exists"
}
```

---

## ⚠️ CRITICAL REQUIREMENTS

### **MUST HAVE:**
1. ✅ `success` field in ALL responses (boolean)
2. ✅ `token` field in successful responses (string)
3. ✅ `user` object in successful responses with `id`, `username`, `role`
4. ✅ `message` field in failed responses (string)
5. ✅ HTTP status codes: 200/201 for success, 400/401 for failure

### **MUST NOT:**
1. ❌ Return password in user object
2. ❌ Allow Admin registration
3. ❌ Return different structure than specified
4. ❌ Use different field names

### **OPTIONAL BUT RECOMMENDED:**
- Include `name` and `email` in user object
- Include `message` in successful responses
- Add more specific error messages
- Add field-level validation errors

---

## 🎯 SUMMARY

**Your backend MUST return these exact structures:**

### **Login Success:**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": { "id": "1", "username": "user1", "role": "Doctor" },
  "message": "Login successful"
}
```

### **Login Failure:**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

### **Register Success:**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": { "id": "8", "username": "newuser", "role": "Patient" },
  "message": "User registered successfully"
}
```

### **Register Failure:**
```json
{
  "success": false,
  "message": "Username already exists"
}
```

**That's it! Follow these structures exactly and your backend will work perfectly with the frontend!** 🚀





# Hospital Management System - API Requirements for Frontend

## Authentication Endpoints

### 1. Login
**Endpoint:** `POST /api/auth/login`

**Request:**
```json
{
  "username": "string",
  "password": "string",
  "role": "Admin|Doctor|Nurse|Patient"
}
```

**Response (Success):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "user": {
    "id": "string",
    "username": "string",
    "email": "string",
    "role": "Admin|Doctor|Nurse|Patient",
    "name": "string"
  },
  "message": "Login successful"
}
```

**Response (Error):**
```json
{
  "success": false,
  "token": null,
  "user": null,
  "message": "Invalid credentials"
}
```

---

### 2. Register
**Endpoints:**
- `POST /api/auth/register/doctor`
- `POST /api/auth/register/nurse`
- `POST /api/auth/register/patient`

**Request:**
```json
{
  "username": "string",
  "password": "string",
  "name": "string",
  "email": "string"
}
```

**Response:** Same as login response

---

## Patients Management

### 1. Get All Patients
**Endpoint:** `GET /api/patients`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (Success):**
```json
[
  {
    "id": 1,
    "patientId": "PAT001",
    "username": "patient1",
    "name": "John Doe",
    "email": "john.doe@email.com",
    "age": 35,
    "gender": "Male",
    "phoneNumber": "+1234567890",
    "bloodGroup": "O+",
    "address": "123 Main St, City",
    "condition": "Diabetes",
    "status": "Active",
    "createdAt": "2026-04-15T10:00:00Z",
    "updatedAt": "2026-04-15T10:00:00Z"
  }
]
```

**Response (Error):**
```json
{
  "error": "Unauthorized",
  "message": "Token has expired. Please login again"
}
```

---

### 2. Get Patient by ID
**Endpoint:** `GET /api/patients/{id}`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (Success):**
```json
{
  "id": 1,
  "patientId": "PAT001",
  "username": "patient1",
  "name": "John Doe",
  "email": "john.doe@email.com",
  "age": 35,
  "gender": "Male",
  "phoneNumber": "+1234567890",
  "bloodGroup": "O+",
  "address": "123 Main St, City",
  "condition": "Diabetes",
  "status": "Active",
  "medicalHistory": [
    {
      "date": "2026-03-15",
      "diagnosis": "Type 2 Diabetes",
      "doctor": "Dr. Smith"
    }
  ],
  "appointments": [
    {
      "id": 1,
      "date": "2026-04-20",
      "time": "10:00 AM",
      "doctor": "Dr. Smith",
      "status": "Scheduled"
    }
  ],
  "createdAt": "2026-04-15T10:00:00Z",
  "updatedAt": "2026-04-15T10:00:00Z"
}
```

**Response (Not Found):**
```json
{
  "error": "Not Found",
  "message": "Patient with id 1 not found"
}
```

---

### 3. Create Patient
**Endpoint:** `POST /api/patients`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request:**
```json
{
  "username": "patient2",
  "name": "Jane Smith",
  "email": "jane.smith@email.com",
  "age": 28,
  "gender": "Female",
  "phoneNumber": "+1234567891",
  "bloodGroup": "A+",
  "address": "456 Oak Ave, City",
  "condition": "Hypertension"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Patient created successfully",
  "patient": {
    "id": 2,
    "patientId": "PAT002",
    "username": "patient2",
    "name": "Jane Smith",
    "email": "jane.smith@email.com",
    "age": 28,
    "gender": "Female",
    "phoneNumber": "+1234567891",
    "bloodGroup": "A+",
    "address": "456 Oak Ave, City",
    "condition": "Hypertension",
    "status": "Active",
    "createdAt": "2026-04-15T11:00:00Z"
  }
}
```

**Response (Validation Error):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "email": "Email already exists",
    "age": "Age must be greater than 0"
  }
}
```

---

### 4. Update Patient
**Endpoint:** `PUT /api/patients/{id}`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request:**
```json
{
  "name": "Jane Smith Updated",
  "email": "jane.updated@email.com",
  "age": 29,
  "phoneNumber": "+1234567892",
  "address": "789 New St, City",
  "condition": "Controlled Hypertension",
  "status": "Active"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Patient updated successfully",
  "patient": {
    "id": 2,
    "patientId": "PAT002",
    "username": "patient2",
    "name": "Jane Smith Updated",
    "email": "jane.updated@email.com",
    "age": 29,
    "gender": "Female",
    "phoneNumber": "+1234567892",
    "bloodGroup": "A+",
    "address": "789 New St, City",
    "condition": "Controlled Hypertension",
    "status": "Active",
    "updatedAt": "2026-04-15T12:00:00Z"
  }
}
```

---

### 5. Delete Patient
**Endpoint:** `DELETE /api/patients/{id}`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Patient deleted successfully",
  "id": 2
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Cannot delete patient with active appointments"
}
```

---

## Appointments Management

### 1. Get All Appointments
**Endpoint:** `GET /api/appointments`

**Query Parameters (Optional):**
- `date` - Filter by date (YYYY-MM-DD)
- `doctorId` - Filter by doctor ID
- `patientId` - Filter by patient ID
- `status` - Filter by status (Scheduled, Completed, Cancelled)

**Example:** `GET /api/appointments?date=2026-04-20&status=Scheduled`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (Success):**
```json
[
  {
    "id": 1,
    "appointmentId": "APT001",
    "patient": {
      "id": 1,
      "patientId": "PAT001",
      "name": "John Doe"
    },
    "doctor": {
      "id": 1,
      "doctorId": "DOC001",
      "name": "Dr. Smith",
      "specialization": "Cardiology"
    },
    "date": "2026-04-20",
    "time": "10:00 AM",
    "duration": 30,
    "reason": "Regular checkup",
    "status": "Scheduled",
    "notes": "",
    "createdAt": "2026-04-15T10:00:00Z",
    "updatedAt": "2026-04-15T10:00:00Z"
  }
]
```

---

### 2. Get Appointment by ID
**Endpoint:** `GET /api/appointments/{id}`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (Success):**
```json
{
  "id": 1,
  "appointmentId": "APT001",
  "patient": {
    "id": 1,
    "patientId": "PAT001",
    "name": "John Doe",
    "age": 35,
    "gender": "Male",
    "phoneNumber": "+1234567890"
  },
  "doctor": {
    "id": 1,
    "doctorId": "DOC001",
    "name": "Dr. Smith",
    "specialization": "Cardiology",
    "phoneNumber": "+1234567800"
  },
  "date": "2026-04-20",
  "time": "10:00 AM",
  "duration": 30,
  "reason": "Regular checkup",
  "status": "Scheduled",
  "notes": "Patient has history of diabetes",
  "prescriptions": [],
  "createdAt": "2026-04-15T10:00:00Z",
  "updatedAt": "2026-04-15T10:00:00Z"
}
```

---

### 3. Create Appointment
**Endpoint:** `POST /api/appointments`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request:**
```json
{
    "patientId": 1,
    "doctorId": 1,
    "date": "2026-04-20",
    "time": "10:00 AM",
    "duration": 30,
    "reason": "Regular checkup",
    "notes": "Patient has history of diabetes"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Appointment created successfully",
  "appointment": {
    "id": 1,
    "appointmentId": "APT001",
    "patient": {
      "id": 1,
      "name": "John Doe"
    },
    "doctor": {
      "id": 1,
      "name": "Dr. Smith"
    },
    "date": "2026-04-20",
    "time": "10:00 AM",
    "duration": 30,
    "reason": "Regular checkup",
    "status": "Scheduled",
    "createdAt": "2026-04-15T10:00:00Z"
  }
}
```

**Response (Conflict):**
```json
{
  "success": false,
  "message": "Doctor is not available at this time slot"
}
```

---

### 4. Update Appointment
**Endpoint:** `PUT /api/appointments/{id}`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request:**
```json
{
  "date": "2026-04-21",
  "time": "11:00 AM",
  "status": "Rescheduled",
  "doctorId": 3,
  "notes": "Patient requested time change"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Appointment updated successfully",
  "appointment": {
    "id": 1,
    "appointmentId": "APT001",
    "patient": {
      "id": 1,
      "name": "John Doe"
    },
    "doctor": {
      "id": 1,
      "name": "Dr. Smith"
    },
    "date": "2026-04-21",
    "time": "11:00 AM",
    "duration": 30,
    "reason": "Regular checkup",
    "status": "Rescheduled",
    "notes": "Patient requested time change",
    "updatedAt": "2026-04-15T12:00:00Z"
  }
}
```

---

### 5. Delete/Cancel Appointment
**Endpoint:** `DELETE /api/appointments/{id}`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Appointment cancelled successfully",
  "id": 1
}
```

---

## Dashboard Statistics

### Get Dashboard Stats
**Endpoint:** `GET /api/dashboard`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (Success):**
```json
{
  "success": true,
  "stats": {
    "totalPatients": 150,
    "totalDoctors": 20,
    "totalStaff": 45,
    "appointments": 12,
    "totalNurse": 30,
    "todayAppointments": 8
  },
  "recentActivity": [
    {
      "id": 1,
      "type": "appointment",
      "message": "New appointment scheduled with Dr. Smith",
      "timestamp": "2026-04-15T10:30:00Z",
      "user": "John Doe"
    },
    {
      "id": 2,
      "type": "patient",
      "message": "New patient registered: Jane Smith",
      "timestamp": "2026-04-15T09:15:00Z",
      "user": "Admin"
    },
    {
      "id": 3,
      "type": "billing",
      "message": "Bill paid by patient PAT001",
      "timestamp": "2026-04-15T08:45:00Z",
      "user": "John Doe"
    }
  ],
  "upcomingAppointments": [
    {
      "id": 1,
      "patientName": "John Doe",
      "doctorName": "Dr. Smith",
      "date": "2026-04-20",
      "time": "10:00 AM",
      "status": "Scheduled"
    }
  ],
  "criticalPatients": [
    {
      "id": 5,
      "name": "Emergency Patient",
      "condition": "Critical",
      "ward": "ICU-1"
    }
  ]
}
```

**Response (Role-based - Doctor):**
```json
{
  "success": true,
  "stats": {
    "myPatients": 25,
    "todayAppointments": 8,
    "completedAppointments": 5,
    "pendingAppointments": 3,
    "prescriptions": 12,
    "reports": 8
  },
  "myAppointments": [
    {
      "id": 1,
      "patientName": "John Doe",
      "time": "10:00 AM",
      "reason": "Regular checkup",
      "status": "Scheduled"
    }
  ],
  "myPatients": [
    {
      "id": 1,
      "name": "John Doe",
      "lastVisit": "2026-04-10",
      "condition": "Diabetes"
    }
  ]
}
```

**Response (Role-based - Patient):**
```json
{
  "success": true,
  "stats": {
    "upcomingAppointments": 2,
    "completedAppointments": 5,
    "prescriptions": 3,
    "pendingBills": 1
  },
  "myAppointments": [
    {
      "id": 1,
      "doctorName": "Dr. Smith",
      "date": "2026-04-20",
      "time": "10:00 AM",
      "status": "Scheduled"
    }
  ],
  "myPrescriptions": [
    {
      "id": 1,
      "medicine": "Metformin",
      "dosage": "500mg",
      "frequency": "Twice daily",
      "prescribedBy": "Dr. Smith",
      "date": "2026-04-10"
    }
  ]
}
```

---

## Common Error Responses

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Token has expired. Please login again",
  "success": false
}
```

### 403 Forbidden
```json
{
  "error": "Forbidden",
  "message": "You don't have permission to access this resource",
  "success": false
}
```

### 404 Not Found
```json
{
  "error": "Not Found",
  "message": "Resource not found",
  "success": false
}
```

### 400 Bad Request
```json
{
  "error": "Bad Request",
  "message": "Invalid request data",
  "success": false,
  "errors": {
    "field1": "Error message",
    "field2": "Error message"
  }
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal Server Error",
  "message": "An unexpected error occurred",
  "success": false
}
```

---

## Notes

1. All protected endpoints require `Authorization: Bearer <token>` header
2. Token expires after 24 hours (configurable)
3. Date format: `YYYY-MM-DD`
4. Time format: `HH:MM AM/PM`
5. Timestamps: ISO 8601 format (`YYYY-MM-DDTHH:mm:ssZ`)
6. All responses include `success` boolean field
7. Patient IDs are auto-generated (PAT001, PAT002, etc.)
8. Appointment IDs are auto-generated (APT001, APT002, etc.)
