# AWS SNS Setup for Hospital Management System

## Time Required: 10-15 minutes

## Prerequisites
- AWS Account with appropriate permissions
- AWS CLI installed and configured (optional but recommended)

---

## Step 1: Create SNS Topic (5 minutes)

### Using AWS Console:

1. **Navigate to SNS Service**
   - Go to AWS Console → Search "SNS" → Click "Simple Notification Service"

2. **Create Topic**
   - Click "Topics" in left sidebar
   - Click "Create topic"
   - **Type**: Standard
   - **Name**: `hospital-appointments`
   - **Display name**: `Hospital Appointments`
   - Click "Create topic"

3. **Copy the Topic ARN**
   - After creation, you'll see: `arn:aws:sns:us-east-1:123456789012:hospital-appointments`
   - Copy this ARN (you'll need it for configuration)

### Using AWS CLI:

```bash
# Create SNS topic
aws sns create-topic --name hospital-appointments --region us-east-1

# Output will show the ARN
```

---

## Step 2: Create Email Subscriptions (3 minutes)

### For Testing - Subscribe Your Email:

1. **In SNS Console**
   - Go to Topics → Click `hospital-appointments`
   - Click "Create subscription"

2. **Subscription Details**
   - **Protocol**: Email
   - **Endpoint**: your-email@example.com
   - Click "Create subscription"

3. **Confirm Subscription**
   - Check your email inbox
   - Click the confirmation link from AWS
   - Status will change from "Pending confirmation" to "Confirmed"

### Using AWS CLI:

```bash
# Subscribe email
aws sns subscribe \
  --topic-arn arn:aws:sns:us-east-1:123456789012:hospital-appointments \
  --protocol email \
  --notification-endpoint your-email@example.com

# You'll receive a confirmation email - click the link
```

### For Production - Multiple Subscriptions:

You can add multiple emails, SMS, or even Lambda functions:

```bash
# Email subscription
aws sns subscribe \
  --topic-arn arn:aws:sns:us-east-1:123456789012:hospital-appointments \
  --protocol email \
  --notification-endpoint patient@example.com

# SMS subscription (requires phone number with country code)
aws sns subscribe \
  --topic-arn arn:aws:sns:us-east-1:123456789012:hospital-appointments \
  --protocol sms \
  --notification-endpoint +1234567890
```

---

## Step 3: Create IAM User/Role (5 minutes)

### Option A: Using IAM User (for Development)

1. **Create IAM User**
   - AWS Console → IAM → Users → "Create user"
   - **User name**: `hospital-sns-user`
   - **Access type**: Programmatic access
   - Click "Next"

2. **Attach Policy**
   - Click "Attach policies directly"
   - Search and select: `AmazonSNSFullAccess` (or create custom policy below)
   - Click "Next" → "Create user"

3. **Download Credentials**
   - Copy **Access Key ID** and **Secret Access Key**
   - Store them securely

4. **Configure in Application**
   - Add to `~/.aws/credentials`:
     ```
     [default]
     ```

### Option B: Using IAM Role (for EC2 Deployment)

If deploying on EC2, attach this IAM role to your EC2 instance:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "sns:Publish",
        "sns:GetTopicAttributes"
      ],
      "Resource": "arn:aws:sns:us-east-1:123456789012:hospital-appointments"
    }
  ]
}
```

### Custom SNS Policy (Least Privilege - Recommended):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowSNSPublish",
      "Effect": "Allow",
      "Action": [
        "sns:Publish",
        "sns:GetTopicAttributes",
        "sns:ListSubscriptionsByTopic"
      ],
      "Resource": "arn:aws:sns:us-east-1:YOUR_ACCOUNT_ID:hospital-appointments"
    }
  ]
}
```

---

## Step 4: Update Application Configuration

Update `Backend/src/main/resources/application.properties`:

```properties
# AWS SNS Configuration
aws.region=us-east-1
aws.sns.topic.arn=arn:aws:sns:us-east-1:YOUR_ACCOUNT_ID:hospital-appointments
aws.sns.enabled=true

# Optional: Explicitly set credentials (not recommended for production)
# aws.accessKeyId=YOUR_ACCESS_KEY_ID
# aws.secretKey=YOUR_SECRET_ACCESS_KEY
```

**Replace**:
- `YOUR_ACCOUNT_ID` with your AWS account ID (12-digit number)
- The ARN you copied in Step 1

---

## Step 5: Test the Integration (5 minutes)

### 1. Build and Run Application

```bash
cd Backend
./mvnw clean install
./mvnw spring-boot:run
```

### 2. Book an Appointment

```bash
curl -X POST http://localhost:8080/api/appointments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "patientId": 1,
    "doctorId": 2,
    "date": "2024-12-20T00:00:00.000Z",
    "time": "10:00",
    "duration": 30,
    "reason": "Regular checkup"
  }'
```

### 3. Check Email

- You should receive an email with appointment confirmation
- Subject: `Appointment Confirmation - APT001`

### 4. Verify in AWS Console

- Go to SNS → Topics → `hospital-appointments` → "Publish message"
- Check "Published messages" metric in CloudWatch

---

## Cost Estimate

### SNS Pricing (us-east-1):
- **Email/Email-JSON**: $2.00 per 100,000 notifications
- **SMS (US)**: $0.00645 per message
- **First 1,000 notifications/month**: FREE

### Example Costs:
- **100 appointments/day** = 3,000/month
  - Email notifications: **FREE** (under 1,000 free tier) + $0.04 for remaining 2,000
  - Monthly cost: ~**$0.04 - $0.10**

---

## Troubleshooting

### Issue 1: "Access Denied" Error

**Solution**: Check IAM permissions
```bash
# Test SNS access
aws sns list-topics --region us-east-1

# Test publish permission
aws sns publish \
  --topic-arn arn:aws:sns:us-east-1:123456789012:hospital-appointments \
  --message "Test message"
```

### Issue 2: Email Not Received

**Check**:
1. Email subscription is confirmed (not "Pending confirmation")
2. Check spam/junk folder
3. Verify topic ARN in application.properties
4. Check application logs for SNS errors

### Issue 3: "Topic does not exist"

**Solution**: Verify ARN format
- Correct: `arn:aws:sns:us-east-1:123456789012:hospital-appointments`
- Region must match
- Account ID must be correct

### View Logs:

```bash
# Check application logs
tail -f logs/application.log | grep SNS

# Check CloudWatch metrics
aws cloudwatch get-metric-statistics \
  --namespace AWS/SNS \
  --metric-name NumberOfMessagesPublished \
  --dimensions Name=TopicName,Value=hospital-appointments \
  --start-time 2024-12-15T00:00:00Z \
  --end-time 2024-12-15T23:59:59Z \
  --period 3600 \
  --statistics Sum
```

---

## Advanced Configuration

### 1. Filter Policy (Send to Specific Subscribers)

```json
{
  "NotificationType": ["AppointmentConfirmation"]
}
```

### 2. SMS Preferences

```bash
# Set default SMS type
aws sns set-sms-attributes \
  --attributes DefaultSMSType=Transactional
```

### 3. Async Processing with SQS

For high volume, add SQS between application and SNS:
- Application → SQS → Lambda → SNS
- This prevents blocking the booking API

---

## Security Best Practices

1. **Never commit credentials** to Git
2. Use **IAM roles** instead of access keys when possible
3. Apply **least privilege** IAM policies
4. Enable **CloudTrail** for audit logging
5. Use **VPC endpoints** for SNS (no internet traffic)
6. Encrypt messages with **KMS** for sensitive data

---

## Next Steps

- [ ] Add SMS notifications
- [ ] Implement appointment reminders (24h before)
- [ ] Add SQS for async processing
- [ ] Set up CloudWatch alarms for failures
- [ ] Create Lambda function for scheduled reminders
- [ ] Add patient phone numbers to database

---

## Support

- AWS SNS Documentation: https://docs.aws.amazon.com/sns/
- AWS SDK for Java v2: https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/
