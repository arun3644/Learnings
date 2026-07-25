# 📮 POSTMAN TEST CASES - EMAIL NOTIFICATIONS

## 🔧 SETUP

**Base URL:** `http://localhost:8080`

**Make sure:**
- ✅ Backend is running (`mvn spring-boot:run`)
- ✅ Email verified in AWS SES (`arunkarthikk365@gmail.com`)

---

## TEST CASE 1: Send Simple Text Email

### Request Details:
```
Method: POST
URL: http://localhost:8080/api/notifications/send-email
```

### Params (Query Parameters):
| Key | Value | Description |
|-----|-------|-------------|
| `toEmail` | `arunkarthikk365@gmail.com` | Recipient email |
| `subject` | `Test Email from Hospital System` | Email subject |
| `message` | `This is a test email to verify AWS SES integration is working correctly.` | Email body |

### Headers:
```
Content-Type: application/json
```

### Expected Response:
```json
Status: 200 OK
Body: "Email sent successfully!"
```

### Postman Screenshot Setup:
1. Select **POST** method
2. Enter URL: `http://localhost:8080/api/notifications/send-email`
3. Go to **Params** tab
4. Add the 3 query parameters above
5. Click **Send**

### Expected Result:
- ✅ Status 200 OK
- ✅ Response: "Email sent successfully!"
- ✅ Check inbox: `arunkarthikk365@gmail.com` should receive the email

---

## TEST CASE 2: Send HTML Email

### Request Details:
```
Method: POST
URL: http://localhost:8080/api/notifications/send-html-email
```

### Params (Query Parameters):
| Key | Value | Description |
|-----|-------|-------------|
| `toEmail` | `arunkarthikk365@gmail.com` | Recipient email |
| `subject` | `HTML Test Email` | Email subject |
| `htmlBody` | `<html><body><h1 style="color: #4CAF50;">Hello!</h1><p>This is a <strong>HTML formatted</strong> email.</p><ul><li>Feature 1</li><li>Feature 2</li></ul></body></html>` | HTML email body |

### Headers:
```
Content-Type: application/json
```

### Expected Response:
```json
Status: 200 OK
Body: "HTML Email sent successfully!"
```

### Expected Result:
- ✅ Status 200 OK
- ✅ Response: "HTML Email sent successfully!"
- ✅ Check inbox: Email should have formatted HTML (green heading, bold text, bullet list)

---

## TEST CASE 3: Send Email with Special Characters

### Request Details:
```
Method: POST
URL: http://localhost:8080/api/notifications/send-email
```

### Params (Query Parameters):
| Key | Value |
|-----|-------|
| `toEmail` | `arunkarthikk365@gmail.com` |
| `subject` | `Appointment Reminder - Dr. Smith @ 10:00 AM` |
| `message` | `Dear Patient,\n\nYour appointment is scheduled for:\nDate: May 15, 2026\nTime: 10:00 AM\nDoctor: Dr. Smith\n\nPlease arrive 10 minutes early.\n\nThank you!` |

### Expected Response:
```json
Status: 200 OK
Body: "Email sent successfully!"
```

---

## TEST CASE 4: Send Email to Invalid Address (Error Test)

### Request Details:
```
Method: POST
URL: http://localhost:8080/api/notifications/send-email
```

### Params (Query Parameters):
| Key | Value |
|-----|-------|
| `toEmail` | `invalid-email-format` |
| `subject` | `Test` |
| `message` | `Test message` |

### Expected Response:
```json
Status: 400 Bad Request
Body: "Failed to send email: [error message]"
```

### Expected Result:
- ✅ Status 400 Bad Request
- ✅ Error message about invalid email format

---

## TEST CASE 5: Send Email with Empty Subject

### Request Details:
```
Method: POST
URL: http://localhost:8080/api/notifications/send-email
```

### Params (Query Parameters):
| Key | Value |
|-----|-------|
| `toEmail` | `arunkarthikk365@gmail.com` |
| `subject` | `` (empty) |
| `message` | `This email has no subject` |

### Expected Response:
```json
Status: 200 OK
Body: "Email sent successfully!"
```

### Expected Result:
- ✅ Email sent with blank subject line

---

## TEST CASE 6: Send Appointment Confirmation Email (HTML)

### Request Details:
```
Method: POST
URL: http://localhost:8080/api/notifications/send-html-email
```

### Params (Query Parameters):
| Key | Value |
|-----|-------|
| `toEmail` | `arunkarthikk365@gmail.com` |
| `subject` | `Appointment Confirmation - APT001` |
| `htmlBody` | See HTML below |

### HTML Body:
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; }
        .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
        .details { margin: 20px 0; }
        .detail-row { padding: 10px 0; border-bottom: 1px solid #eee; }
        .label { font-weight: bold; color: #555; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Appointment Confirmed</h1>
        </div>
        <div class="content">
            <p>Dear John Doe,</p>
            <p>Your appointment has been successfully scheduled.</p>
            <div class="details">
                <div class="detail-row">
                    <span class="label">Appointment ID:</span> APT001
                </div>
                <div class="detail-row">
                    <span class="label">Doctor:</span> Dr. Smith (Cardiology)
                </div>
                <div class="detail-row">
                    <span class="label">Date:</span> May 15, 2026
                </div>
                <div class="detail-row">
                    <span class="label">Time:</span> 10:00 AM
                </div>
            </div>
            <p><strong>Please arrive 10 minutes before your scheduled time.</strong></p>
        </div>
    </div>
</body>
</html>
```

### Expected Response:
```json
Status: 200 OK
Body: "HTML Email sent successfully!"
```

### Expected Result:
- ✅ Professional appointment confirmation email with green header
- ✅ Formatted details section
- ✅ Styled content

---

## 🔍 TROUBLESHOOTING

### Problem: "Failed to send email: Email address is not verified"

**Solution:**
1. Go to AWS SES Console: https://console.aws.amazon.com/ses/
2. Click "Verified identities"
3. Find `arunkarthikk365@gmail.com`
4. Status should be "Verified" ✅
5. If not, click "Create identity" and verify the email

### Problem: "Failed to send email: The security token included in the request is invalid"

**Solution:**
Check `application.properties`:
```properties
aws.region=us-east-1
```

### Problem: Connection timeout

**Solution:**
- Check if backend is running: `mvn spring-boot:run`
- Check if port 8080 is available
- Try: `curl http://localhost:8080/api/notifications/send-email?toEmail=test@test.com&subject=Test&message=Test`

---

## 📋 QUICK COPY-PASTE COMMANDS

### Using cURL (Alternative to Postman):

**Test 1: Simple Email**
```bash
curl -X POST "http://localhost:8080/api/notifications/send-email?toEmail=arunkarthikk365@gmail.com&subject=Test%20Email&message=This%20is%20a%20test"
```

**Test 2: HTML Email**
```bash
curl -X POST "http://localhost:8080/api/notifications/send-html-email?toEmail=arunkarthikk365@gmail.com&subject=HTML%20Test&htmlBody=<h1>Hello</h1><p>This%20is%20HTML</p>"
```

---

## ✅ SUCCESS CHECKLIST

After running tests, verify:
- [ ] Test 1: Simple text email received ✅
- [ ] Test 2: HTML formatted email received ✅
- [ ] Test 3: Email with special characters received ✅
- [ ] Test 4: Invalid email returns error ✅
- [ ] Test 5: Empty subject email received ✅
- [ ] Test 6: Appointment confirmation email received ✅

---

## 🎯 NEXT: Test Automatic Appointment Emails

Once manual tests work, test automatic emails by creating appointments:

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

**Expected:** Patient receives automatic confirmation email! 🎉
