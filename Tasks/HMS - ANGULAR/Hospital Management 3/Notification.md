🏗️ Architecture: Local App + AWS Services (FREE)
┌─────────────────────────────────────────────────────┐
│              YOUR LOCAL MACHINE                      │
├─────────────────────────────────────────────────────┤
│                                                      │
│  ┌──────────────┐         ┌──────────────┐         │
│  │   Angular    │◄───────►│ Spring Boot  │         │
│  │ localhost:   │ WebSocket│ localhost:   │         │
│  │   4200       │         │   8080       │         │
│  └──────────────┘         └───────┬──────┘         │
│                                    │                 │
│                           ┌────────┴────────┐       │
│                           │  Local MySQL    │       │
│                           │  localhost:3306 │       │
│                           └─────────────────┘       │
│                                    │                 │
└────────────────────────────────────┼─────────────────┘
                                     │
                          Internet   │
                                     ▼
┌─────────────────────────────────────────────────────┐
│                  AWS FREE TIER                       │
├─────────────────────────────────────────────────────┤
│                                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────┐│
│  │     SNS      │  │     SES      │  │    S3     ││
│  │ (Push/SMS)   │  │   (Email)    │  │ (Storage) ││
│  │ FREE: 1M/mo  │  │ FREE: 62K/mo │  │ FREE: 5GB ││
│  └──────────────┘  └──────────────┘  └───────────┘│
│                                                      │
│  ┌──────────────┐  ┌──────────────┐                │
│  │  CloudWatch  │  │   EventBridge│                │
│  │  (Logging)   │  │  (Scheduler) │                │
│  │ FREE: 5GB    │  │ FREE: 1M/mo  │                │
│  └──────────────┘  └──────────────┘                │
└─────────────────────────────────────────────────────┘
💰 AWS Free Tier Services (No Hosting Needed)
AWS Service	Free Tier	Use Case	Cost
SNS	1M publishes/month	SMS notifications	$0
SES	62,000 emails/month	Email notifications	$0
S3	5GB storage	Store images/files	$0
CloudWatch	5GB logs	Monitor app logs	$0
EventBridge	1M events/month	Schedule reminders	$0
Lambda	1M requests/month	Background tasks	$0
Total: $0/month ✅

# 🎯 REMAINING STEPS TO COMPLETE NOTIFICATION

## ✅ WHAT YOU NEED TO DO NOW:

### 1️⃣ VERIFY YOUR EMAIL IN AWS SES (5 minutes)
This is **REQUIRED** before emails will work!

1. Go to: https://console.aws.amazon.com/ses/
2. Click **"Verified identities"** → **"Create identity"**
3. Select **"Email address"**
4. Enter: `arunkarthikk365@gmail.com`
5. Click **"Create identity"**
6. **Check your email inbox** and click the verification link
7. Wait for status to show **"Verified" ✅**

---

### 2️⃣ BUILD AND RUN BACKEND (2 minutes)

```bash
cd Backend
mvn clean install
mvn spring-boot:run
```

---

### 3️⃣ TEST EMAIL SENDING (2 minutes)

**Using Postman:**
```
POST http://localhost:8080/api/notifications/send-email
Params:
  - toEmail: arunkarthikk365@gmail.com
  - subject: Test Email
  - message: This is a test!
```

**Check your email inbox** - you should receive the test email!

---

### 4️⃣ TEST APPOINTMENT EMAILS (Automatic!)

When you create/update appointments through your app:
- ✅ **Create appointment** → Patient receives confirmation email
- ✅ **Reschedule appointment** → Patient receives reschedule email  
- ✅ **Update status** → Patient receives status change email

**No extra code needed - it's automatic!**

---

## 📧 WHAT'S BEEN IMPLEMENTED:

### Backend Files:
✅ `NotificationController.java` - Test email endpoints
✅ `NotificationService.java` - Email sending service
✅ `NotificationDTO.java` - Notification data structure
✅ `AWSConfig.java` - AWS SES configuration
✅ `WebSocketConfig.java` - WebSocket setup
✅ `AppointmentService.java` - Auto email on create/update

### Email Templates:
✅ Appointment Confirmation (Green header)
✅ Appointment Reschedule (Orange header)
✅ Appointment Status Change (Blue header)

---

## 🔧 TROUBLESHOOTING:

### "Email not sent" error?
- Check if email is verified in AWS SES
- Check AWS credentials in `application.properties`
- Check console logs for errors

### Patient not receiving emails?
- Make sure patient has email in database:
```sql
SELECT id, name, email FROM patients;
UPDATE patients SET email = 'patient@example.com' WHERE id = 1;
```

---

## ✅ THAT'S IT!

**3 Simple Steps:**
1. Verify email in AWS SES
2. Run backend
3. Test by creating an appointment

**Your email notification system is complete!** 🎉

For detailed guide, see: `Backend/EMAIL_NOTIFICATION_SETUP.md`

## PART 1: AWS ACCOUNT SETUP (10 minutes)

### Step 1.1: Create AWS Free Tier Account
1. Go to: https://aws.amazon.com/free/
2. Click "Create a Free Account"
3. Enter email and account name
4. Verify email
5. Enter credit card (won't be charged, just for verification)
6. Complete phone verification
7. Select "Basic Support - Free"

### Step 1.2: Get AWS Access Credentials
1. Login to AWS Console: https://console.aws.amazon.com/
2. Click your name (top right) → "Security Credentials"
3. Scroll to "Access keys"
4. Click "Create access key"
5. Select "Local code" → Next
6. **SAVE THESE** (you'll need them):
   ```
   Access Key ID: AKIA...
   Secret Access Key: ...
   ```

### Step 1.3: Verify Email in SES (for sending emails)
1. Go to SES Console: https://console.aws.amazon.com/ses/
2. Click "Verified identities" → "Create identity"
3. Select "Email address"
4. Enter your email (e.g., youremail@gmail.com)
5. Click "Create identity"
6. Check your email and click verification link
7. Status should show "Verified" ✅

### Step 1.4: Enable SNS for SMS (optional)
1. Go to SNS Console: https://console.aws.amazon.com/sns/
2. Click "Text messaging (SMS)" → "Sandbox destination phone numbers"
3. Add your phone number for testing
4. Verify the code sent to your phone

---

## PART 2: BACKEND IMPLEMENTATION

### Step 2.1: Update pom.xml

Add these dependencies to `Backend/pom.xml`:

```xml
<!-- AWS SDK BOM (Bill of Materials) -->
<dependency>
    <groupId>software.amazon.awssdk</groupId>
    <artifactId>bom</artifactId>
    <version>2.20.0</version>
    <type>pom</type>
    <scope>import</scope>
</dependency>

<!-- AWS SNS (for SMS/Push notifications) -->
<dependency>
    <groupId>software.amazon.awssdk</groupId>
    <artifactId>sns</artifactId>
    <version>2.20.0</version>
</dependency>

<!-- AWS SES (for Email) -->
<dependency>
    <groupId>software.amazon.awssdk</groupId>
    <artifactId>ses</artifactId>
    <version>2.20.0</version>
</dependency>

<!-- AWS S3 (for File Storage) -->
<dependency>
    <groupId>software.amazon.awssdk</groupId>
    <artifactId>s3</artifactId>
    <version>2.20.0</version>
</dependency>

<!-- WebSocket -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-websocket</artifactId>
</dependency>

<!-- JSON processing -->
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
</dependency>
```

### Step 2.2: Update application.properties

Add to `Backend/src/main/resources/application.properties`:

```properties
# AWS Configuration
aws.accessKeyId=YOUR_ACCESS_KEY_ID_HERE
aws.secretKey=YOUR_SECRET_KEY_HERE
aws.region=us-east-1

# AWS SES Configuration
aws.ses.from.email=youremail@gmail.com
aws.ses.from.name=Hospital Management System

# AWS SNS Configuration
aws.sns.enabled=true

# AWS S3 Configuration
aws.s3.bucket.name=hospital-management-files

# WebSocket Configuration
spring.websocket.allowed-origins=http://localhost:4200
```

### Step 2.3: Create AWS Configuration Class

Create file: `Backend/src/main/java/com/hospital/config/AWSConfig.java`

```java
package com.hospital.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.ses.SesClient;
import software.amazon.awssdk.services.sns.SnsClient;

@Configuration
public class AWSConfig {

    @Value("${aws.accessKeyId}")
    private String accessKeyId;

    @Value("${aws.secretKey}")
    private String secretKey;

    @Value("${aws.region}")
    private String region;

    @Bean
    public SnsClient snsClient() {
        return SnsClient.builder()
                .region(Region.of(region))
                .credentialsProvider(StaticCredentialsProvider.create(
                        AwsBasicCredentials.create(accessKeyId, secretKey)))
                .build();
    }

    @Bean
    public SesClient sesClient() {
        return SesClient.builder()
                .region(Region.of(region))
                .credentialsProvider(StaticCredentialsProvider.create(
                        AwsBasicCredentials.create(accessKeyId, secretKey)))
                .build();
    }

    @Bean
    public S3Client s3Client() {
        return S3Client.builder()
                .region(Region.of(region))
                .credentialsProvider(StaticCredentialsProvider.create(
                        AwsBasicCredentials.create(accessKeyId, secretKey)))
                .build();
    }
}
```

### Step 2.4: Create WebSocket Configuration

Create file: `Backend/src/main/java/com/hospital/config/WebSocketConfig.java`

```java
package com.hospital.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic", "/queue");
        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns("*")
                .withSockJS();
    }
}
```

### Step 2.5: Create Notification DTO

Create file: `Backend/src/main/java/com/hospital/dto/NotificationDTO.java`

```java
package com.hospital.dto;

import java.time.LocalDateTime;

public class NotificationDTO {
    private String id;
    private String title;
    private String message;
    private String type; // REMINDER, STATUS_CHANGE, EMERGENCY, INFO
    private LocalDateTime timestamp;
    private String userId;
    private boolean read;

    public NotificationDTO() {
        this.timestamp = LocalDateTime.now();
        this.read = false;
    }

    public NotificationDTO(String title, String message, String type) {
        this();
        this.title = title;
        this.message = message;
        this.type = type;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    
    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
    
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    
    public boolean isRead() { return read; }
    public void setRead(boolean read) { this.read = read; }
}
```

### Step 2.6: Create AWS Notification Service

Create file: `Backend/src/main/java/com/hospital/service/AWSNotificationService.java`

```java
package com.hospital.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.ses.SesClient;
import software.amazon.awssdk.services.ses.model.*;
import software.amazon.awssdk.services.sns.SnsClient;
import software.amazon.awssdk.services.sns.model.PublishRequest;
import software.amazon.awssdk.services.sns.model.PublishResponse;

@Service
public class AWSNotificationService {

    @Autowired
    private SnsClient snsClient;

    @Autowired
    private SesClient sesClient;

    @Value("${aws.ses.from.email}")
    private String fromEmail;

    @Value("${aws.ses.from.name}")
    private String fromName;

    /**
     * Send SMS via AWS SNS
     */
    public void sendSMS(String phoneNumber, String message) {
        try {
            PublishRequest request = PublishRequest.builder()
                    .message(message)
                    .phoneNumber(phoneNumber)
                    .build();

            PublishResponse response = snsClient.publish(request);
            System.out.println("SMS sent! Message ID: " + response.messageId());
        } catch (Exception e) {
            System.err.println("Error sending SMS: " + e.getMessage());
        }
    }

    /**
     * Send Email via AWS SES
     */
    public void sendEmail(String toEmail, String subject, String bodyText) {
        try {
            SendEmailRequest request = SendEmailRequest.builder()
                    .destination(Destination.builder()
                            .toAddresses(toEmail)
                            .build())
                    .message(Message.builder()
                            .subject(Content.builder()
                                    .charset("UTF-8")
                                    .data(subject)
                                    .build())
                            .body(Body.builder()
                                    .text(Content.builder()
                                            .charset("UTF-8")
                                            .data(bodyText)
                                            .build())
                                    .build())
                            .build())
                    .source(fromEmail)
                    .build();

            SendEmailResponse response = sesClient.sendEmail(request);
            System.out.println("Email sent! Message ID: " + response.messageId());
        } catch (Exception e) {
            System.err.println("Error sending email: " + e.getMessage());
        }
    }

    /**
     * Send HTML Email via AWS SES
     */
    public void sendHtmlEmail(String toEmail, String subject, String htmlBody) {
        try {
            SendEmailRequest request = SendEmailRequest.builder()
                    .destination(Destination.builder()
                            .toAddresses(toEmail)
                            .build())
                    .message(Message.builder()
                            .subject(Content.builder()
                                    .charset("UTF-8")
                                    .data(subject)
                                    .build())
                            .body(Body.builder()
                                    .html(Content.builder()
                                            .charset("UTF-8")
                                            .data(htmlBody)
                                            .build())
                                    .build())
                            .build())
                    .source(fromEmail)
                    .build();

            SendEmailResponse response = sesClient.sendEmail(request);
            System.out.println("HTML Email sent! Message ID: " + response.messageId());
        } catch (Exception e) {
            System.err.println("Error sending HTML email: " + e.getMessage());
        }
    }
}
```

---

## PART 3: TESTING

### Test AWS SES (Email)
1. Run your Spring Boot application
2. Use Postman or create a test endpoint:
```java
@GetMapping("/test/email")
public String testEmail() {
    awsNotificationService.sendEmail(
        "recipient@gmail.com",
        "Test Email",
        "This is a test email from Hospital Management System"
    );
    return "Email sent!";
}
```

### Test AWS SNS (SMS)
```java
@GetMapping("/test/sms")
public String testSMS() {
    awsNotificationService.sendSMS(
        "+1234567890",  // Your verified phone number
        "Test SMS from Hospital Management System"
    );
    return "SMS sent!";
}
```

---

## NEXT STEPS

Would you like me to continue with:
1. **Real-time WebSocket notifications** (appointment reminders, status updates)
2. **Frontend integration** (Angular WebSocket client, toast notifications)
3. **S3 file upload** (patient documents, medical reports)
4. **Scheduled tasks** (auto appointment reminders)

Let me know which part you want to implement next!


---

# 🔑 DETAILED GUIDE: How to Get AWS Access Key & Secret Key

## Method 1: Using IAM User (Recommended for Learning)

### Step 1: Login to AWS Console
1. Go to: https://console.aws.amazon.com/
2. Sign in with your AWS account

### Step 2: Navigate to IAM Service
1. In the search bar at top, type **"IAM"**
2. Click on **"IAM"** (Identity and Access Management)

### Step 3: Create IAM User
1. In left sidebar, click **"Users"**
2. Click **"Create user"** button (orange button, top right)
3. Enter username: `hospital-app-user`
4. Click **"Next"**

### Step 4: Set Permissions
1. Select **"Attach policies directly"**
2. Search and check these policies:
   - ✅ **AmazonSNSFullAccess** (for SMS/Push notifications)
   - ✅ **AmazonSESFullAccess** (for Email)
   - ✅ **AmazonS3FullAccess** (for File storage)
3. Click **"Next"**
4. Click **"Create user"**

### Step 5: Create Access Key
1. Click on the user you just created (`hospital-app-user`)
2. Click **"Security credentials"** tab
3. Scroll down to **"Access keys"** section
4. Click **"Create access key"**
5. Select **"Local code"** (or "Application running outside AWS")
6. Check the confirmation box
7. Click **"Next"**
8. (Optional) Add description: "Hospital Management App"
9. Click **"Create access key"**

### Step 6: SAVE YOUR CREDENTIALS ⚠️
**IMPORTANT: This is the ONLY time you'll see the Secret Access Key!**

You'll see a screen like this:
```
Access key ID: AKIAIOSFODNN7EXAMPLE
Secret access key: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
```

**DO THIS NOW:**
1. Click **"Download .csv file"** button (saves both keys)
2. OR copy both keys to a safe place (Notepad, password manager)
3. Click **"Done"**

---

## Method 2: Using Root Account (Quick but NOT Recommended)

### Step 1: Login to AWS Console
1. Go to: https://console.aws.amazon.com/
2. Sign in with your root account

### Step 2: Access Security Credentials
1. Click your **account name** (top right corner)
2. Click **"Security credentials"** from dropdown

### Step 3: Create Access Key
1. Scroll down to **"Access keys"** section
2. Click **"Create access key"**
3. You'll see a warning (root keys are risky) - for learning, click **"Create access key"**
4. **SAVE YOUR CREDENTIALS** (same as Method 1, Step 6)

---

## 📝 What to Do with Your Keys

### Copy to application.properties
Open: `Backend/src/main/resources/application.properties`

Replace these lines:
```properties
aws.accessKeyId=YOUR_ACCESS_KEY_ID_HERE
aws.secretKey=YOUR_SECRET_KEY_HERE
```

With your actual keys:
```properties
aws.accessKeyId=AKIAIOSFODNN7EXAMPLE
aws.secretKey=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
```

---

## 🔒 SECURITY TIPS

### ⚠️ NEVER:
- ❌ Commit keys to GitHub/GitLab
- ❌ Share keys in screenshots
- ❌ Post keys in chat/forums
- ❌ Email keys to anyone

### ✅ ALWAYS:
- ✅ Keep keys in `.gitignore` files
- ✅ Use environment variables in production
- ✅ Delete keys if compromised
- ✅ Rotate keys regularly

### Add to .gitignore
Make sure `Backend/.gitignore` includes:
```
application.properties
*.csv
.env
```

---

## 🆘 Troubleshooting

### "Access Denied" Error?
**Solution:** Make sure you attached the correct policies:
1. Go to IAM → Users → Your user
2. Click "Permissions" tab
3. Verify these policies are attached:
   - AmazonSNSFullAccess
   - AmazonSESFullAccess
   - AmazonS3FullAccess

### Lost Your Secret Key?
**Solution:** You can't retrieve it, but you can create a new one:
1. Go to IAM → Users → Your user → Security credentials
2. Find the old access key
3. Click "Actions" → "Deactivate" (or "Delete")
4. Create a new access key (follow Step 5 above)

### Keys Not Working?
**Check:**
1. ✅ No extra spaces in application.properties
2. ✅ Keys are not wrapped in quotes
3. ✅ Region is correct (us-east-1)
4. ✅ IAM user has correct permissions

---

## 📸 Visual Guide

### Where to Find IAM:
```
AWS Console Home
    ↓
Search bar (top) → Type "IAM"
    ↓
Click "IAM" service
    ↓
Left sidebar → "Users"
```

### Where to Create Access Key:
```
IAM → Users → [Your User]
    ↓
"Security credentials" tab
    ↓
Scroll to "Access keys" section
    ↓
"Create access key" button
```

---

## ✅ Verification

After getting your keys, test them:

### Test 1: Check AWS CLI (Optional)
```bash
aws configure
# Enter your Access Key ID
# Enter your Secret Access Key
# Enter region: us-east-1
# Enter output format: json

# Test connection
aws sts get-caller-identity
```

### Test 2: Run Your Spring Boot App
```bash
cd Backend
mvn clean install
mvn spring-boot:run
```

If keys are correct, you should see:
```
Started HospitalManagement in X.XXX seconds
```

No errors about AWS credentials ✅

---

## 🎯 Next Steps

Once you have your keys:
1. ✅ Update `application.properties` with your keys
2. ✅ Verify email in SES (check your email for verification link)
3. ✅ Test email sending (use the test endpoint)
4. ✅ Test SMS sending (if you verified phone number)

**Ready to continue? Let me know if you got your keys successfully!** 🚀
