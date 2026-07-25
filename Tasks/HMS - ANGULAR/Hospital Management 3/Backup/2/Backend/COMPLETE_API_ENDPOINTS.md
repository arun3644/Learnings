# Hospital Management System - Complete API Reference

**Base URL:** `http://localhost:8080`

---

## 📋 TABLE OF CONTENTS

1. [Authentication APIs](#authentication-apis)
2. [Admin APIs](#admin-apis)
3. [Doctor APIs](#doctor-apis)
4. [Patient APIs](#patient-apis)
5. [Nurse APIs](#nurse-apis)
6. [Appointment APIs](#appointment-apis)
7. [Statistics APIs](#statistics-apis)

---

## 🔐 AUTHENTICATION APIS

### 1. Login
**POST** `/api/auth/login`

**Request Body:**
```json
{
  "username": "admin1",
  "password": "password123",
  "role": "ADMIN"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "role": "ADMIN",
  "userId": 1,
  "username": "admin1",
  "expiresIn": 86400000
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Invalid credentials",
  "token": null,
  "role": null,
  "userId": null,
  "username": null,
  "expiresIn": null
}
```

---

### 2. Register Admin
**POST** `/api/auth/register/admin`

**Request Body:**
```json
{
  "username": "admin1",
  "password": "password123",
  "name": "Admin User",
  "email": "admin@hospital.com"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Admin registered successfully",
  "adminId": "ADM001",
  "username": "admin1",
  "name": "Admin User",
  "email": "admin@hospital.com",
  "error": null
}
```

---

### 3. Register Doctor
**POST** `/api/auth/register/doctor`

**Request Body:**
```json
{
  "username": "doctor1",
  "password": "password123",
  "name": "Dr. John Smith",
  "email": "doctor@hospital.com",
  "specialization": "Cardiology",
  "yearsOfExperience": 10,
  "phoneNumber": "1234567890",
  "licenseNumber": "LIC12345"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Doctor registered successfully",
  "doctorId": "DOC001",
  "username": "doctor1",
  "name": "Dr. John Smith",
  "email": "doctor@hospital.com",
  "specialization": "Cardiology",
  "error": null
}
```

---

### 4. Register Nurse
**POST** `/api/auth/register/nurse`

**Request Body:**
```json
{
  "username": "nurse1",
  "password": "password123",
  "name": "Nurse Jane",
  "email": "nurse@hospital.com",
  "department": "Emergency",
  "yearsOfExperience": 5,
  "phoneNumber": "1234567890",
  "shift": "Morning"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Nurse registered successfully",
  "nurseId": "NUR001",
  "username": "nurse1",
  "name": "Nurse Jane",
  "email": "nurse@hospital.com",
  "department": "Emergency",
  "error": null
}
```

---

### 5. Register Patient
**POST** `/api/auth/register/patient`

**Request Body:**
```json
{
  "username": "patient1",
  "password": "password123",
  "name": "John Doe",
  "email": "patient@email.com",
  "age": 35,
  "gender": "Male",
  "phoneNumber": "1234567890",
  "bloodGroup": "O+",
  "condition": "Stable",
  "address": "123 Main St, City"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Patient registered successfully",
  "patientId": "PAT001",
  "username": "patient1",
  "name": "John Doe",
  "email": "patient@email.com",
  "age": 35,
  "gender": "Male",
  "error": null
}
```

---

### 6. Validate Token
**POST** `/api/auth/validate`

**Request Body:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Token is valid",
  "username": "admin1",
  "role": "ADMIN",
  "expiresIn": 86400000,
  "error": null
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": null,
  "username": null,
  "role": null,
  "expiresIn": null,
  "error": "Token has expired"
}
```

---

### 7. Health Check
**GET** `/api/auth/health`

**Response:**
```json
{
  "status": "UP",
  "message": "Hospital Management API is running"
}
```

---

## 👨‍💼 ADMIN APIS

### 1. Get All Admins
**GET** `/api/admins`

**Response:**
```json
[
  {
    "id": 1,
    "adminId": "ADM001",
    "username": "admin1",
    "name": "Admin User",
    "email": "admin@hospital.com",
    "department": "Administration",
    "phoneNumber": "1234567890",
    "createdAt": "2026-04-28T10:00:00.000+00:00",
    "error": null,
    "message": null
  }
]
```

---

### 2. Get Admin by ID
**GET** `/api/admins/{id}`

**Example:** `GET /api/admins/1`

**Response (Success):**
```json
{
  "id": 1,
  "adminId": "ADM001",
  "username": "admin1",
  "name": "Admin User",
  "email": "admin@hospital.com",
  "department": "Administration",
  "phoneNumber": "1234567890",
  "createdAt": "2026-04-28T10:00:00.000+00:00",
  "error": null,
  "message": null
}
```

**Response (Not Found):**
```json
{
  "id": null,
  "adminId": null,
  "username": null,
  "name": null,
  "email": null,
  "department": null,
  "phoneNumber": null,
  "createdAt": null,
  "error": "Not Found",
  "message": "Admin not found with id: 1"
}
```

---

### 3. Update Admin
**PUT** `/api/admins/{id}`

**Example:** `PUT /api/admins/1`

**Request Body:**
```json
{
  "name": "Updated Admin Name",
  "email": "newemail@hospital.com",
  "department": "HR",
  "phoneNumber": "9876543210"
}
```

**Response (Success):**
```json
{
  "id": 1,
  "adminId": "ADM001",
  "username": "admin1",
  "name": "Updated Admin Name",
  "email": "newemail@hospital.com",
  "department": "HR",
  "phoneNumber": "9876543210",
  "createdAt": "2026-04-28T10:00:00.000+00:00",
  "error": null,
  "message": null
}
```

---

### 4. Delete Admin
**DELETE** `/api/admins/{id}`

**Example:** `DELETE /api/admins/1`

**Response (Success):**
```json
{
  "message": "Admin deleted successfully"
}
```

**Response (Not Found):**
```json
{
  "error": "Not Found",
  "message": "Admin not found with id: 1"
}
```

---

### 5. Get Admin Dashboard Stats
**GET** `/api/admins/dashboard-stats`

**Response:**
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
      "timestamp": "2026-04-28T10:30:00.000+00:00",
      "user": "John Doe"
    },
    {
      "id": 2,
      "type": "patient",
      "message": "New patient registered: Jane Smith",
      "timestamp": "2026-04-28T09:15:00.000+00:00",
      "user": "Admin"
    }
  ],
  "upcomingAppointments": [
    {
      "id": 1,
      "patientName": "John Doe",
      "doctorName": "Dr. Smith",
      "date": "2026-04-29",
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
  ],
  "error": null,
  "message": null
}
```

---

## 👨‍⚕️ DOCTOR APIS

### 1. Get All Doctors
**GET** `/api/doctors`

**Response:**
```json
[
  {
    "id": 1,
    "doctorId": "DOC001",
    "username": "doctor1",
    "name": "Dr. John Smith",
    "email": "doctor@hospital.com",
    "specialization": "Cardiology",
    "yearsOfExperience": 10,
    "phoneNumber": "1234567890",
    "licenseNumber": "LIC12345",
    "createdAt": "2026-04-28T10:00:00.000+00:00",
    "error": null,
    "message": null
  }
]
```

---

### 2. Get Doctor by ID
**GET** `/api/doctors/{id}`

**Example:** `GET /api/doctors/1`

**Response:** Same structure as Get All Doctors (single object)

---

### 3. Update Doctor
**PUT** `/api/doctors/{id}`

**Example:** `PUT /api/doctors/1`

**Request Body:**
```json
{
  "name": "Dr. John Updated",
  "email": "newemail@hospital.com",
  "specialization": "Neurology",
  "yearsOfExperience": 12,
  "phoneNumber": "9876543210"
}
```

**Response:** Updated doctor object

---

### 4. Delete Doctor
**DELETE** `/api/doctors/{id}`

**Example:** `DELETE /api/doctors/1`

**Response:**
```json
{
  "message": "Doctor deleted successfully"
}
```

---

### 5. Get Doctor Available Time Slots
**GET** `/api/doctors/{id}/available-slots?date=2026-04-28`

**Example:** `GET /api/doctors/1/available-slots?date=2026-04-28`

**Response:**
```json
[
  {
    "id": 1,
    "doctorId": 1,
    "date": "2026-04-28T00:00:00.000+00:00",
    "time": "09:00",
    "isAvailable": true
  },
  {
    "id": 2,
    "doctorId": 1,
    "date": "2026-04-28T00:00:00.000+00:00",
    "time": "09:30",
    "isAvailable": true
  }
]
```

---

### 6. Get Doctor Booked Slots
**GET** `/api/doctors/{id}/booked-slots?date=2026-04-28`

**Example:** `GET /api/doctors/1/booked-slots?date=2026-04-28`

**Response:** Same structure as available slots (isAvailable: false)

---

### 7. Get Doctor Appointments
**GET** `/api/doctors/{id}/appointments`

**Example:** `GET /api/doctors/1/appointments`

**Response:**
```json
[
  {
    "appointmentId": "APT001",
    "patientName": "John Doe",
    "patientId": "PAT001",
    "date": "2026-04-28T00:00:00.000+00:00",
    "time": "09:00",
    "status": "Scheduled",
    "reason": "Regular checkup"
  }
]
```

---

### 8. Get All Doctor Slots
**GET** `/api/doctors/{id}/all-slots`

**Example:** `GET /api/doctors/1/all-slots`

**Response:** Array of all time slots for the doctor

---

### 9. Generate Slots for Doctor
**GET** `/api/doctors/{id}/generate-slots`

**Example:** `GET /api/doctors/1/generate-slots`

**Response:**
```json
{
  "message": "Generated 180 time slots for doctor DOC001 for the next 30 days"
}
```

---

### 10. Get Doctor Dashboard Stats
**GET** `/api/doctors/{doctorId}/dashboard-stats`

**Example:** `GET /api/doctors/1/dashboard-stats`

**Response:**
```json
{
  "success": true,
  "stats": {
    "totalAppointments": 45,
    "todayAppointments": 5,
    "upcomingAppointments": 12,
    "completedAppointments": 28,
    "cancelledAppointments": 5,
    "totalPatients": 38,
    "availableSlots": 120
  },
  "todaySchedule": [
    {
      "id": 1,
      "appointmentId": "APT001",
      "patientName": "Jane Doe",
      "patientId": 1,
      "time": "09:00",
      "duration": 30,
      "status": "Scheduled",
      "reason": "Regular checkup"
    }
  ],
  "upcomingAppointments": [
    {
      "id": 3,
      "appointmentId": "APT003",
      "patientName": "Sarah Johnson",
      "patientId": 3,
      "appointmentDate": "2026-04-29",
      "time": "09:30",
      "status": "Scheduled"
    }
  ],
  "error": null,
  "message": null
}
```

---

## 🤒 PATIENT APIS

### 1. Get All Patients
**GET** `/api/patients`

**Response:**
```json
[
  {
    "id": 1,
    "patientId": "PAT001",
    "username": "patient1",
    "name": "John Doe",
    "email": "patient@email.com",
    "age": 35,
    "gender": "Male",
    "phoneNumber": "1234567890",
    "bloodGroup": "O+",
    "address": "123 Main St",
    "status": "Active",
    "createdAt": "2026-04-28T10:00:00.000+00:00",
    "error": null,
    "message": null
  }
]
```

---

### 2. Get Patient by ID
**GET** `/api/patients/{id}`

**Example:** `GET /api/patients/1`

**Response:** Same structure as Get All Patients (single object)

---

### 3. Update Patient
**PUT** `/api/patients/{id}`

**Example:** `PUT /api/patients/1`

**Request Body:**
```json
{
  "name": "John Updated",
  "email": "newemail@email.com",
  "age": 36,
  "gender": "Male",
  "phoneNumber": "9876543210",
  "bloodGroup": "A+",
  "address": "456 New St",
  "status": "Active"
}
```

**Response:** Updated patient object

---

### 4. Delete Patient
**DELETE** `/api/patients/{id}`

**Example:** `DELETE /api/patients/1`

**Response:**
```json
{
  "message": "Patient deleted successfully"
}
```

---

### 5. Get Patient Dashboard Stats
**GET** `/api/patients/{patientId}/dashboard-stats`

**Example:** `GET /api/patients/1/dashboard-stats`

**Response:**
```json
{
  "success": true,
  "stats": {
    "totalAppointments": 15,
    "upcomingAppointments": 3,
    "completedAppointments": 10,
    "cancelledAppointments": 2,
    "nextAppointmentDate": "2026-04-29",
    "lastVisitDate": "2026-04-20"
  },
  "upcomingAppointments": [
    {
      "id": 1,
      "appointmentId": "APT001",
      "doctorName": "Dr. Smith",
      "doctorId": 1,
      "specialization": "Cardiology",
      "appointmentDate": "2026-04-29",
      "time": "10:00",
      "status": "Scheduled"
    }
  ],
  "recentAppointments": [
    {
      "id": 5,
      "appointmentId": "APT005",
      "doctorName": "Dr. Johnson",
      "doctorId": 2,
      "specialization": "General",
      "appointmentDate": "2026-04-20",
      "time": "14:00",
      "status": "Completed"
    }
  ],
  "error": null,
  "message": null
}
```

---

## 👩‍⚕️ NURSE APIS

### 1. Get All Nurses
**GET** `/api/nurses`

**Response:**
```json
[
  {
    "id": 1,
    "nurseId": "NUR001",
    "username": "nurse1",
    "name": "Nurse Jane",
    "email": "nurse@hospital.com",
    "department": "Emergency",
    "yearsOfExperience": 5,
    "phoneNumber": "1234567890",
    "shift": "Morning",
    "createdAt": "2026-04-28T10:00:00.000+00:00",
    "error": null,
    "message": null
  }
]
```

---

### 2. Get Nurse by ID
**GET** `/api/nurses/{id}`

**Example:** `GET /api/nurses/1`

**Response:** Same structure as Get All Nurses (single object)

---

### 3. Update Nurse
**PUT** `/api/nurses/{id}`

**Example:** `PUT /api/nurses/1`

**Request Body:**
```json
{
  "name": "Nurse Jane Updated",
  "email": "newemail@hospital.com",
  "department": "ICU",
  "shift": "Night",
  "phoneNumber": "9876543210"
}
```

**Response:** Updated nurse object

---

### 4. Delete Nurse
**DELETE** `/api/nurses/{id}`

**Example:** `DELETE /api/nurses/1`

**Response:**
```json
{
  "message": "Nurse deleted successfully"
}
```

---

## 📅 APPOINTMENT APIS

### 1. Get All Appointments
**GET** `/api/appointments`

**Response:**
```json
[
  {
    "id": 1,
    "appointmentId": "APT001",
    "patient": {
      "id": 1,
      "name": "John Doe",
      "patientId": "PAT001"
    },
    "doctor": {
      "id": 1,
      "name": "Dr. Smith",
      "specialization": "Cardiology"
    },
    "date": "2026-04-28T00:00:00.000+00:00",
    "time": "09:00",
    "duration": 30,
    "reason": "Regular checkup",
    "status": "Scheduled",
    "createdAt": "2026-04-21T14:29:05.186+00:00"
  }
]
```

---

### 2. Get Appointment by ID
**GET** `/api/appointments/{id}`

**Example:** `GET /api/appointments/1`

**Response:** Same structure as Get All Appointments (single object)

---

### 3. Book Appointment
**POST** `/api/appointments`

**Request Body:**
```json
{
  "patientId": 1,
  "doctorId": 1,
  "date": "2026-04-29T00:00:00.000Z",
  "time": "09:00",
  "duration": 30,
  "reason": "Regular checkup",
  "notes": "First visit"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Appointment booked successfully",
  "appointment": {
    "id": 1,
    "appointmentId": "APT001",
    "patient": {
      "id": 1,
      "name": "John Doe",
      "patientId": "PAT001"
    },
    "doctor": {
      "id": 1,
      "name": "Dr. Smith",
      "specialization": "Cardiology"
    },
    "date": "2026-04-29T00:00:00.000+00:00",
    "time": "09:00",
    "duration": 30,
    "reason": "Regular checkup",
    "status": "Scheduled",
    "createdAt": "2026-04-28T10:00:00.000+00:00"
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Time slot not available",
  "appointment": null
}
```

---

### 4. Update Appointment
**PUT** `/api/appointments/{id}`

**Example:** `PUT /api/appointments/1`

**Request Body:**
```json
{
  "date": "2026-04-30T00:00:00.000Z",
  "time": "10:00",
  "doctorId": 2,
  "status": "Rescheduled",
  "notes": "Patient requested change"
}
```

**Response:** Same structure as Book Appointment

---

### 5. Delete Appointment
**DELETE** `/api/appointments/{id}`

**Example:** `DELETE /api/appointments/1`

**Response:**
```json
{
  "success": true,
  "message": "Appointment deleted successfully",
  "appointment": null
}
```

---

## 📊 STATISTICS APIS

### 1. Get Total Patients Count
**GET** `/api/statistics/total-patients`

**Response:**
```json
{
  "success": true,
  "count": 150
}
```

---

### 2. Get Total Doctors Count
**GET** `/api/statistics/total-doctors`

**Response:**
```json
{
  "success": true,
  "count": 20
}
```

---

### 3. Get Total Appointments Count
**GET** `/api/statistics/total-appointments`

**Response:**
```json
{
  "success": true,
  "count": 500
}
```

---

### 4. Get Appointments by Status
**GET** `/api/statistics/appointments-by-status?status=Scheduled`

**Query Parameters:**
- `status`: Scheduled | Completed | Cancelled | Rescheduled

**Response:**
```json
[
  {
    "id": 1,
    "appointmentId": "APT001",
    "patient": {
      "id": 1,
      "name": "John Doe",
      "patientId": "PAT001"
    },
    "doctor": {
      "id": 1,
      "name": "Dr. Smith",
      "specialization": "Cardiology"
    },
    "date": "2026-04-28T00:00:00.000+00:00",
    "time": "09:00",
    "duration": 30,
    "reason": "Regular checkup",
    "status": "Scheduled",
    "createdAt": "2026-04-21T14:29:05.186+00:00"
  }
]
```

---

### 5. Get Today's Appointments
**GET** `/api/statistics/today-appointments`

**Response:** Array of appointments scheduled for today (same structure as above)

---

### 6. Get Upcoming Appointments
**GET** `/api/statistics/upcoming-appointments`

**Response:** Array of upcoming appointments with status "Scheduled" or "Rescheduled" (same structure as above)

---

## 📝 NOTES

### Date Format
- All dates should be in ISO 8601 format: `2026-04-28T00:00:00.000Z`
- Date query parameters use format: `yyyy-MM-dd` (e.g., `2026-04-28`)

### Authentication
- Most endpoints require JWT token in Authorization header: `Bearer <token>`
- Token obtained from `/api/auth/login` endpoint

### Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

### Appointment Statuses
- `Scheduled` - Initial booking
- `Rescheduled` - Date/time changed
- `Completed` - Appointment finished
- `Cancelled` - Appointment cancelled

### Time Slots
- Generated in 30-minute intervals
- Default slots: 09:00, 09:30, 10:00, 10:30, 11:00, 11:30
- Slots generated for 30 days when doctor registers

---

**Total Endpoints: 47**
- Authentication: 7
- Admin: 5
- Doctor: 10
- Patient: 5
- Nurse: 4
- Appointment: 5
- Statistics: 6
