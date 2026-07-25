# Role-Based Access Control - Test Guide

## Test Scenarios

### Scenario 1: Patient tries to access Admin endpoint ❌

**Request:**
```http
GET /api/admins/dashboard-stats
Authorization: Bearer <PATIENT_TOKEN>
```

**Expected Response:** `403 Forbidden`
```json
{
  "success": false,
  "error": "Access Denied",
  "message": "You don't have permission to access this resource",
  "path": "/api/admins/dashboard-stats"
}
```

---

### Scenario 2: Doctor tries to access Admin endpoint ❌

**Request:**
```http
GET /api/statistics/total-patients
Authorization: Bearer <DOCTOR_TOKEN>
```

**Expected Response:** `403 Forbidden`
```json
{
  "success": false,
  "error": "Access Denied",
  "message": "You don't have permission to access this resource",
  "path": "/api/statistics/total-patients"
}
```

---

### Scenario 3: No token provided ❌

**Request:**
```http
GET /api/doctors
```

**Expected Response:** `401 Unauthorized`
```json
{
  "success": false,
  "error": "Unauthorized",
  "message": "Authentication is required to access this resource",
  "path": "/api/doctors"
}
```

---

### Scenario 4: Invalid token ❌

**Request:**
```http
GET /api/doctors
Authorization: Bearer invalid_token_here
```

**Expected Response:** `401 Unauthorized`
```json
{
  "success": false,
  "error": "Invalid or missing token",
  "message": "Invalid or missing token"
}
```

---

### Scenario 5: Expired token ❌

**Request:**
```http
GET /api/doctors
Authorization: Bearer <EXPIRED_TOKEN>
```

**Expected Response:** `401 Unauthorized`
```json
{
  "success": false,
  "error": "Token has expired. Please login again",
  "message": "Token has expired. Please login again"
}
```

---

### Scenario 6: Admin accesses Admin endpoint ✅

**Request:**
```http
GET /api/admins/dashboard-stats
Authorization: Bearer <ADMIN_TOKEN>
```

**Expected Response:** `200 OK`
```json
{
  "success": true,
  "stats": {
    "totalPatients": 150,
    "totalDoctors": 20,
    ...
  }
}
```

---

### Scenario 7: Doctor accesses Doctor dashboard ✅

**Request:**
```http
GET /api/doctors/1/dashboard-stats
Authorization: Bearer <DOCTOR_TOKEN>
```

**Expected Response:** `200 OK`
```json
{
  "success": true,
  "stats": {
    "totalAppointments": 45,
    ...
  }
}
```

---

### Scenario 8: Patient accesses Patient dashboard ✅

**Request:**
```http
GET /api/patients/1/dashboard-stats
Authorization: Bearer <PATIENT_TOKEN>
```

**Expected Response:** `200 OK`
```json
{
  "success": true,
  "stats": {
    "totalAppointments": 15,
    ...
  }
}
```

---

### Scenario 9: Patient tries to access Doctor dashboard ❌

**Request:**
```http
GET /api/doctors/1/dashboard-stats
Authorization: Bearer <PATIENT_TOKEN>
```

**Expected Response:** `403 Forbidden`
```json
{
  "success": false,
  "error": "Access Denied",
  "message": "You don't have permission to access this resource",
  "path": "/api/doctors/1/dashboard-stats"
}
```

---

### Scenario 10: Any authenticated user views doctors list ✅

**Request:**
```http
GET /api/doctors
Authorization: Bearer <ANY_VALID_TOKEN>
```

**Expected Response:** `200 OK`
```json
[
  {
    "id": 1,
    "username": "doctor1",
    "name": "Dr. John Smith",
    ...
  }
]
```

---

## Role-Based Access Matrix

| Endpoint | ADMIN | DOCTOR | PATIENT | NURSE | Public |
|----------|-------|--------|---------|-------|--------|
| `/api/auth/login` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/api/auth/register/**` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/api/admins/**` | ✅ | ❌ | ❌ | ❌ | ❌ |
| `/api/statistics/**` | ✅ | ❌ | ❌ | ❌ | ❌ |
| `/api/doctors` (list) | ✅ | ✅ | ✅ | ✅ | ❌ |
| `/api/doctors/{id}` (view) | ✅ | ✅ | ✅ | ✅ | ❌ |
| `/api/doctors/{id}/dashboard-stats` | ❌ | ✅ | ❌ | ❌ | ❌ |
| `/api/doctors/{id}/generate-slots` | ❌ | ✅ | ❌ | ❌ | ❌ |
| `/api/patients/{id}/dashboard-stats` | ❌ | ❌ | ✅ | ❌ | ❌ |
| `/api/appointments/**` | ✅ | ✅ | ✅ | ❌ | ❌ |
| `/api/nurses/**` | ✅ | ❌ | ❌ | ✅ | ❌ |

---

## How to Test

### Step 1: Get tokens for different roles

**Admin Token:**
```http
POST /api/auth/login
{
  "username": "admin1",
  "password": "password123",
  "role": "ADMIN"
}
```

**Doctor Token:**
```http
POST /api/auth/login
{
  "username": "doctor1",
  "password": "password123",
  "role": "DOCTOR"
}
```

**Patient Token:**
```http
POST /api/auth/login
{
  "username": "patient1",
  "password": "password123",
  "role": "PATIENT"
}
```

---

### Step 2: Test with different tokens

Use Postman or cURL to test each scenario above.

**Example cURL:**
```bash
# Patient tries to access admin endpoint (should fail)
curl -X GET http://localhost:8080/api/admins/dashboard-stats \
  -H "Authorization: Bearer <PATIENT_TOKEN>"

# Expected: 403 Forbidden with JSON error
```

---

## Error Response Types

### 401 Unauthorized (Authentication Error)
- No token provided
- Invalid token
- Expired token
- Malformed token

**Response:**
```json
{
  "success": false,
  "error": "Unauthorized",
  "message": "Authentication is required to access this resource",
  "path": "/api/..."
}
```

---

### 403 Forbidden (Authorization Error)
- Valid token but wrong role
- User doesn't have permission

**Response:**
```json
{
  "success": false,
  "error": "Access Denied",
  "message": "You don't have permission to access this resource",
  "path": "/api/..."
}
```

---

## Files Created/Updated

1. ✅ `CustomAccessDeniedHandler.java` - Handles 403 errors
2. ✅ `CustomAuthenticationEntryPoint.java` - Handles 401 errors
3. ✅ `SecurityConfig.java` - Updated with exception handlers

---

## Summary

- ✅ **401 Unauthorized** - User is not authenticated (no/invalid token)
- ✅ **403 Forbidden** - User is authenticated but doesn't have permission (wrong role)
- ✅ **200 OK** - User has correct role and access granted

Now you'll get proper JSON error responses when users try to access unauthorized endpoints!
