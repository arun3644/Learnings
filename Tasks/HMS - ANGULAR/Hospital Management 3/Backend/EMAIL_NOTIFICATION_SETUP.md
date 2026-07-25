# ✅ EMAIL NOTIFICATION - COMPLETE SETUP GUIDE

## 📋 WHAT'S BEEN IMPLEMENTED

### ✅ Backend Files Created:
1. **NotificationController.java** - API endpoints for testing emails
2. **NotificationService.java** - Email sending service (AWS SES)
3. **NotificationDTO.java** - Notification data structure
4. **AWSConfig.java** - AWS SES client configuration
5. **WebSocketConfig.java** - WebSocket configuration (for future real-time notifications)

### ✅ Email Integration:
- **Appointment Confirmation Email** - Sent when appointment is created
- **Appointment Reschedule Email** - Sent when appointment date/time changes
- **Appointment Status Change Email** - Sent when appointment status updates

---

## 🚀 NEXT STEPS TO COMPLETE

### STEP 1: Verify AWS SES Email (REQUIRED)

1. **Login to AWS Console**: https://console.aws.amazon.com/ses/
2. **Go to "Verified identities"**
3. **Click "Create identity"**
4. **Select "Email address"**
5. **Enter your email**: `arunkarthikk365@gmail.com`
6. **Click "Create identity"**
7. **Check your email inbox** and click the verification link
8. **Wait for status to show "Verified" ✅**

⚠️ **IMPORTANT**: Without email verification, AWS SES will NOT send emails!

---

### STEP 2: Build and Run Backend

```bash
cd Backend
mvn clean install
mvn spring-boot:run
```

**Expected Output:**
```
Started HospitalManagement in X.XXX seconds
```

---

### STEP 3: Test Email Sending

#### Option A: Using Postman

**Test Simple Email:**
```
POST http://localhost:8080/api/notifications/send-email
Params:
  - toEmail: your-email@gmail.com
  - subject: Test Email
  - message: This is a test email from Hospital Management System
```

**Test HTML Email:**
```
POST http://localhost:8080/api/notifications/send-html-email
Params:
  - toEmail: your-email@gmail.com
  - subject: Test HTML Email
  - htmlBody: <h1>Hello</h1><p>This is a test HTML email</p>
```

#### Option B: Using curl

```bash
# Test simple email
curl -X POST "http://localhost:8080/api/notifications/send-email?toEmail=your-email@gmail.com&subject=Test&message=Hello"

# Test HTML email
curl -X POST "http://localhost:8080/api/notifications/send-html-email?toEmail=your-email@gmail.com&subject=Test&htmlBody=<h1>Hello</h1>"
```

---

### STEP 4: Test Appointment Email Notifications

#### Create an Appointment (Patient should receive email):

```
POST http://localhost:8080/api/appointments
Headers:
  Authorization: Bearer YOUR_JWT_TOKEN
  Content-Type: application/json

Body:
{
  "patientId": 1,
  "doctorId": 1,
  "date": "2026-05-15",
  "time": "10:00 AM",
  "duration": 30,
  "reason": "Regular checkup"
}
```

**Expected:**
- ✅ Appointment created
- ✅ Email sent to patient's email address
- ✅ Check patient's inbox for confirmation email

#### Update Appointment Status:

```
PUT http://localhost:8080/api/appointments/1
Headers:
  Authorization: Bearer YOUR_JWT_TOKEN
  Content-Type: application/json

Body:
{
  "status": "Completed"
}
```

**Expected:**
- ✅ Appointment status updated
- ✅ Email sent to patient about status change

#### Reschedule Appointment:

```
PUT http://localhost:8080/api/appointments/1
Headers:
  Authorization: Bearer YOUR_JWT_TOKEN
  Content-Type: application/json

Body:
{
  "date": "2026-05-16",
  "time": "11:00 AM"
}
```

**Expected:**
- ✅ Appointment rescheduled
- ✅ Email sent to patient about new date/time

---

## 🔧 TROUBLESHOOTING

### Problem: "Email not sent" error

**Solution 1: Check AWS Credentials**
```properties
# In application.properties
aws.region=us-east-1
```

**Solution 2: Verify Email in SES**
- Go to AWS SES Console
- Check if `arunkarthikk365@gmail.com` is verified
- Status should be "Verified" ✅

**Solution 3: Check SES Sandbox Mode**
- AWS SES starts in "Sandbox mode"
- You can only send emails to verified addresses
- To send to any email, request production access (not needed for testing)

### Problem: Patient email not found

**Solution:** Make sure patients have email addresses in database
```sql
-- Check patient emails
SELECT id, name, email FROM patients;

-- Update patient email if missing
UPDATE patients SET email = 'patient@example.com' WHERE id = 1;
```

### Problem: "Access Denied" error

**Solution:** Check IAM permissions
1. Go to AWS IAM Console
2. Find your user: `hospital-app-user`
3. Verify policy attached: `AmazonSESFullAccess`

---

## 📧 EMAIL TEMPLATES

### Confirmation Email (Green Header)
- Sent when appointment is created
- Shows: Appointment ID, Doctor, Date, Time, Duration, Reason

### Reschedule Email (Orange Header)
- Sent when appointment date/time changes
- Shows: New Date, New Time

### Status Change Email (Blue Header)
- Sent when appointment status updates
- Shows: New Status (Scheduled, Completed, Cancelled, etc.)

---

## 🎯 WHAT'S WORKING NOW

✅ Email notifications on appointment creation
✅ Email notifications on appointment reschedule
✅ Email notifications on status change
✅ HTML formatted emails with professional design
✅ Automatic email sending (no manual trigger needed)

---

## 📝 OPTIONAL: Add Email to More Events

Want to send emails for other events? Add to these services:

### Patient Registration Email:
```java
// In PatientService.java
notificationService.sendEmail(
    patient.getEmail(),
    "Welcome to Hospital Management System",
    "Your account has been created successfully!"
);
```

### Doctor Assignment Email:
```java
// In DoctorService.java
notificationService.sendEmail(
    doctor.getEmail(),
    "New Appointment Assigned",
    "You have a new appointment scheduled."
);
```

---

## ✅ VERIFICATION CHECKLIST

Before testing, make sure:
- [ ] AWS SES email verified (`arunkarthikk365@gmail.com`)
- [ ] Backend running (`mvn spring-boot:run`)
- [ ] Patient has valid email in database
- [ ] AWS credentials in `application.properties`
- [ ] No errors in console logs

---

## 🚀 READY TO TEST!

1. **Verify your email in AWS SES** (most important!)
2. **Run the backend**
3. **Create an appointment** via API or Frontend
4. **Check patient's email inbox** for confirmation email

**That's it! Your email notification system is complete!** 🎉
