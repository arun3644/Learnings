# API Testing Guide - Doctor, Nurse, Admin

Base URL: `http://localhost:8080`

---

## 🩺 DOCTOR ENDPOINTS

### 1. Get All Doctors
```http
GET http://localhost:8080/api/doctors
```

**Response:**
```json
[
  {
    "id": 1,
    "username": "doctor1",
    "name": "Dr. John Smith",
    "email": "doctor1@hospital.com",
    "specialization": "Cardiology",
    "yearsOfExperience": 10,
    "phoneNumber": "+1234567890",
    "createdAt": "2026-04-20 10:30:00",
    "updatedAt": "2026-04-20 10:30:00"
  }
]
```

---

### 2. Get Doctor by ID
```http
GET http://localhost:8080/api/doctors/1
```

**Response:**
```json
{
  "id": 1,
  "username": "doctor1",
  "name": "Dr. John Smith",
  "email": "doctor1@hospital.com",
  "specialization": "Cardiology",
  "yearsOfExperience": 10,
  "phoneNumber": "+1234567890",
  "createdAt": "2026-04-20 10:30:00",
  "updatedAt": "2026-04-20 10:30:00",
  "appointments": [
    {
      "id": 1,
      "appointmentId": "APT001",
      "patientResponse": {
        "id": 1,
        "patientId": "PAT001",
        "username": "patient1"
      },
      "appointmentDate": "2026-04-25",
      "time": "09:00 AM",
      "status": "Scheduled",
      "duration": 30,
      "reason": "Regular checkup"
    }
  ]
}
```

---

### 3. Update Doctor
```http
PUT http://localhost:8080/api/doctors/1
Content-Type: application/json

{
  "name": "Dr. John Updated",
  "email": "johnupdated@hospital.com",
  "specialization": "Neurology",
  "yearsOfExperience": 12,
  "phoneNumber": "+1234567899"
}
```

**Note:** All fields are optional (partial update)

**Response:**
```json
{
  "id": 1,
  "username": "doctor1",
  "name": "Dr. John Updated",
  "email": "johnupdated@hospital.com",
  "specialization": "Neurology",
  "yearsOfExperience": 12,
  "phoneNumber": "+1234567899",
  "createdAt": "2026-04-20 10:30:00",
  "updatedAt": "2026-04-27 14:20:00"
}
```

---

### 4. Delete Doctor
```http
DELETE http://localhost:8080/api/doctors/1
```

**Response:**
```json
{
  "message": "Doctor deleted successfully"
}
```

---

### 5. Get Doctor's Available Time Slots
```http
GET http://localhost:8080/api/doctors/1/available-slots?date=2026-04-28
```

**Response:**
```json
[
  {
    "id": 1,
    "doctorId": 1,
    "date": "2026-04-28",
    "timeSlot": "09:00",
    "isAvailable": true,
    "createdAt": "2026-04-20T10:30:00.000+00:00",
    "updatedAt": "2026-04-20T10:30:00.000+00:00"
  },
  {
    "id": 2,
    "doctorId": 1,
    "date": "2026-04-28",
    "timeSlot": "09:30",
    "isAvailable": true,
    "createdAt": "2026-04-20T10:30:00.000+00:00",
    "updatedAt": "2026-04-20T10:30:00.000+00:00"
  }
]
```

---

### 6. Get Doctor's Appointments
```http
GET http://localhost:8080/api/doctors/1/appointments
```

**Response:**
```json
[
  {
    "id": 1,
    "appointmentId": "APT001",
    "patientResponse": {
      "id": 1,
      "patientId": "PAT001",
      "username": "patient1"
    },
    "patientId": 1,
    "doctorId": 1,
    "appointmentDate": "2026-04-25",
    "time": "09:00 AM",
    "status": "Scheduled",
    "duration": 30,
    "reason": "Regular checkup",
    "createdAt": "2026-04-21T08:00:00.000+00:00",
    "updatedAt": "2026-04-21T08:00:00.000+00:00"
  }
]
```

---

## 👩‍⚕️ NURSE ENDPOINTS

### 1. Get All Nurses
```http
GET http://localhost:8080/api/nurses
```

**Response:**
```json
[
  {
    "id": 1,
    "username": "nurse1",
    "name": "Sarah Johnson",
    "email": "nurse1@hospital.com",
    "department": "Emergency",
    "shift": "Morning",
    "phoneNumber": "+1234567891",
    "createdAt": "2026-04-20 11:00:00",
    "updatedAt": "2026-04-20 11:00:00"
  }
]
```

---

### 2. Get Nurse by ID
```http
GET http://localhost:8080/api/nurses/1
```

**Response:**
```json
{
  "id": 1,
  "username": "nurse1",
  "name": "Sarah Johnson",
  "email": "nurse1@hospital.com",
  "department": "Emergency",
  "shift": "Morning",
  "phoneNumber": "+1234567891",
  "createdAt": "2026-04-20 11:00:00",
  "updatedAt": "2026-04-20 11:00:00"
}
```

---

### 3. Update Nurse
```http
PUT http://localhost:8080/api/nurses/1
Content-Type: application/json

{
  "name": "Sarah Updated",
  "email": "sarahupdated@hospital.com",
  "department": "ICU",
  "shift": "Night",
  "phoneNumber": "+1234567892"
}
```

**Note:** All fields are optional (partial update)

**Response:**
```json
{
  "id": 1,
  "username": "nurse1",
  "name": "Sarah Updated",
  "email": "sarahupdated@hospital.com",
  "department": "ICU",
  "shift": "Night",
  "phoneNumber": "+1234567892",
  "createdAt": "2026-04-20 11:00:00",
  "updatedAt": "2026-04-27 14:30:00"
}
```

---

### 4. Delete Nurse
```http
DELETE http://localhost:8080/api/nurses/1
```

**Response:**
```json
{
  "message": "Nurse deleted successfully"
}
```

---

## 👨‍💼 ADMIN ENDPOINTS

### 1. Get All Admins
```http
GET http://localhost:8080/api/admins
```

**Response:**
```json
[
  {
    "id": 1,
    "username": "admin1",
    "name": "Michael Brown",
    "email": "admin1@hospital.com",
    "department": "Administration",
    "phoneNumber": "+1234567893",
    "createdAt": "2026-04-20 09:00:00",
    "updatedAt": "2026-04-20 09:00:00"
  }
]
```

---

### 2. Get Admin by ID
```http
GET http://localhost:8080/api/admins/1
```

**Response:**
```json
{
  "id": 1,
  "username": "admin1",
  "name": "Michael Brown",
  "email": "admin1@hospital.com",
  "department": "Administration",
  "phoneNumber": "+1234567893",
  "createdAt": "2026-04-20 09:00:00",
  "updatedAt": "2026-04-20 09:00:00"
}
```

---

### 3. Update Admin
```http
PUT http://localhost:8080/api/admins/1
Content-Type: application/json

{
  "name": "Michael Updated",
  "email": "michaelupdated@hospital.com",
  "department": "HR",
  "phoneNumber": "+1234567894"
}
```

**Note:** All fields are optional (partial update)

**Response:**
```json
{
  "id": 1,
  "username": "admin1",
  "name": "Michael Updated",
  "email": "michaelupdated@hospital.com",
  "department": "HR",
  "phoneNumber": "+1234567894",
  "createdAt": "2026-04-20 09:00:00",
  "updatedAt": "2026-04-27 14:40:00"
}
```

---

### 4. Delete Admin
```http
DELETE http://localhost:8080/api/admins/1
```

**Response:**
```json
{
  "message": "Admin deleted successfully"
}
```

---

## 🧪 POSTMAN COLLECTION

### Import these as Postman requests:

**1. Create a new Collection: "Hospital Management - CRUD"**

**2. Add Environment Variables:**
- `base_url`: `http://localhost:8080`
- `doctor_id`: `1`
- `nurse_id`: `1`
- `admin_id`: `1`

**3. Add Requests:**

#### Doctor Folder:
- GET All Doctors: `{{base_url}}/api/doctors`
- GET Doctor by ID: `{{base_url}}/api/doctors/{{doctor_id}}`
- PUT Update Doctor: `{{base_url}}/api/doctors/{{doctor_id}}`
- DELETE Doctor: `{{base_url}}/api/doctors/{{doctor_id}}`
- GET Available Slots: `{{base_url}}/api/doctors/{{doctor_id}}/available-slots?date=2026-04-28`
- GET Doctor Appointments: `{{base_url}}/api/doctors/{{doctor_id}}/appointments`

#### Nurse Folder:
- GET All Nurses: `{{base_url}}/api/nurses`
- GET Nurse by ID: `{{base_url}}/api/nurses/{{nurse_id}}`
- PUT Update Nurse: `{{base_url}}/api/nurses/{{nurse_id}}`
- DELETE Nurse: `{{base_url}}/api/nurses/{{nurse_id}}`

#### Admin Folder:
- GET All Admins: `{{base_url}}/api/admins`
- GET Admin by ID: `{{base_url}}/api/admins/{{admin_id}}`
- PUT Update Admin: `{{base_url}}/api/admins/{{admin_id}}`
- DELETE Admin: `{{base_url}}/api/admins/{{admin_id}}`

---

## 🔍 TESTING SCENARIOS

### Scenario 1: Update Doctor Specialization
1. GET `/api/doctors/1` - Get current doctor details
2. PUT `/api/doctors/1` with `{"specialization": "Neurology"}`
3. GET `/api/doctors/1` - Verify update

### Scenario 2: Check Doctor's Schedule
1. GET `/api/doctors/1/available-slots?date=2026-04-28` - See available slots
2. POST `/api/appointments` - Book an appointment
3. GET `/api/doctors/1/available-slots?date=2026-04-28` - Verify slot is now unavailable
4. GET `/api/doctors/1/appointments` - See the booked appointment

### Scenario 3: Update Nurse Shift
1. GET `/api/nurses/1` - Get current nurse details
2. PUT `/api/nurses/1` with `{"shift": "Night"}`
3. GET `/api/nurses/1` - Verify shift updated

### Scenario 4: Partial Update Admin
1. GET `/api/admins/1` - Get current admin details
2. PUT `/api/admins/1` with only `{"phoneNumber": "+9999999999"}`
3. GET `/api/admins/1` - Verify only phone number changed

---

## ⚠️ ERROR RESPONSES

### 404 Not Found:
```json
{
  "error": "Error",
  "message": "Doctor not found with Id: 999"
}
```

### 500 Internal Server Error:
```json
{
  "error": "Error",
  "message": "Error updating doctor: [error details]"
}
```

---

## 📝 NOTES

1. All update endpoints support **partial updates** - only send fields you want to change
2. Date format for available slots: `yyyy-MM-dd` (e.g., `2026-04-28`)
3. All endpoints return JSON with `@JsonInclude(NON_NULL)` - null fields are hidden
4. CORS is enabled for `http://localhost:4200` (Angular frontend)
5. Make sure to register users first using `/api/auth/register/*` endpoints before testing CRUD
