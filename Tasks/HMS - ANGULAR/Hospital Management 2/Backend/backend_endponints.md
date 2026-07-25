Backend Requirements for practice-springboot (Priority Order)
🔴 CRITICAL - Authentication & Authorization
Login Endpoint ✅ (Already exists but needs verification)

POST /api/auth/login
Request: {username, password, role}
Response: {success, token, user: {id, username, email, role, name}}
Register Endpoints ✅ (Already created)

POST /api/auth/register/doctor
POST /api/auth/register/nurse
POST /api/auth/register/patient
Response: Same as login with token
JWT Token Validation Middleware ⚠️ (Partially done)

Add JwtAuthenticationFilter to practice-springboot
Add SecurityConfig to practice-springboot
Validate token on all protected endpoints
Token Refresh/Validation Endpoint ❌ (Missing)

GET /api/auth/validate or POST /api/auth/refresh
Check if token is still valid
🟡 HIGH PRIORITY - Core CRUD Operations
Patients Management ❌ (Missing)

GET /api/patients - Get all patients
GET /api/patients/{id} - Get patient by ID
POST /api/patients - Create patient
PUT /api/patients/{id} - Update patient
DELETE /api/patients/{id} - Delete patient
Appointments Management ❌ (Missing)

GET /api/appointments - Get all appointments
GET /api/appointments/{id} - Get appointment by ID
POST /api/appointments - Create appointment
PUT /api/appointments/{id} - Update appointment
DELETE /api/appointments/{id} - Delete appointment
Filter by date, doctor, patient
Dashboard Statistics ❌ (Missing)

GET /api/dashboard - Get dashboard stats
Returns: {totalPatients, totalDoctors, totalStaff, appointments, availableBeds, pendingBills, medicinesInStock, recentActivity}
🟢 MEDIUM PRIORITY - Additional Features
Users Endpoint ❌ (Missing)

GET /api/users - Get all users grouped by role
Response: {admin: [], doctors: [], nurses: [], patients: []}
Wards Management ❌ (Missing)

GET /api/wards - Get all wards
POST /api/wards - Create ward
PUT /api/wards/{id} - Update ward
Fields: {id, name, totalBeds, occupiedBeds, department}
Billing Management ❌ (Missing)

GET /api/billing - Get all bills
POST /api/billing - Create bill
PUT /api/billing/{id} - Update bill status
Filter by status (pending, paid)
Pharmacy/Medicines ❌ (Missing)

GET /api/pharmacy - Get all medicines
POST /api/pharmacy - Add medicine
PUT /api/pharmacy/{id} - Update medicine stock
Fields: {id, name, quantity, price, expiryDate}
🔵 LOW PRIORITY - Nice to Have
Reports Management ❌ (Missing)

GET /api/reports - Get all reports
POST /api/reports - Create report
Activity Logs ❌ (Missing)

GET /api/activity - Get recent activity
Auto-log user actions
Role-Based Access Control ❌ (Missing)

Add @RequireRole annotations to endpoints
Admin: Full access
Doctor: Patients, Appointments, Reports
Nurse: Patients, Wards
Patient: Own data only
📋 Database Schema Additions Needed
New Tables Required:
appointments (id, patient_id, doctor_id, date, time, status, reason)
wards (id, name, department, total_beds, occupied_beds)
billing (id, patient_id, amount, status, date, description)
pharmacy (id, medicine_name, quantity, price, expiry_date)
reports (id, patient_id, doctor_id, report_type, date, content)
activity_logs (id, user_id, action, timestamp, details)
🛠️ Technical Improvements Needed
CORS Configuration ⚠️ (Check if exists)

Allow http://localhost:4200 origin
Already in SecurityConfig but verify
Error Handling ⚠️ (Improve)

Global exception handler
Consistent error response format
Password Encryption ❌ (Currently plain text!)

Use BCrypt to hash passwords
Update login to compare hashed passwords
Validation ⚠️ (Partial)

Add @Valid annotations
Custom validators for business rules
Logging ❌ (Missing)

Add proper logging (SLF4J/Logback)
Log all API requests/responses
Immediate Action Items (Next Steps):
✅ Copy JwtAuthenticationFilter and SecurityConfig from backend-HospitalManagement to practice-springboot
✅ Add Spring Security dependency to practice-springboot pom.xml
❌ Create Patient, Appointment, Ward, Billing, Pharmacy entities
❌ Create corresponding repositories, services, controllers
❌ Add password encryption (BCryptPasswordEncoder)
❌ Create database migrations for new tables
❌ Test all endpoints with Postman
❌ Add role-based access control
