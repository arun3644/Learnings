# 🗄️ LOCAL DATABASE SETUP - PostgreSQL

## Quick Fix for Email Testing

Your backend needs a database to run. Here are your options:

---

## ✅ OPTION 1: Install PostgreSQL Locally (Recommended)

### Step 1: Download PostgreSQL
**Windows:**
1. Go to: https://www.postgresql.org/download/windows/
2. Download the installer (latest version)
3. Run the installer

### Step 2: Installation Settings
During installation:
- **Password**: Set to `postgres` (or remember what you set)
- **Port**: Keep default `5432`
- **Locale**: Default
- Check: "Stack Builder" is NOT required

### Step 3: Create Database
After installation, open **pgAdmin** (installed with PostgreSQL):
1. Right-click "Databases" → "Create" → "Database"
2. Name: `hospital`
3. Click "Save"

**OR use Command Line:**
```bash
# Open Command Prompt or PowerShell
psql -U postgres
# Enter password: postgres

# Create database
CREATE DATABASE hospital;

# Exit
\q
```

### Step 4: Update application.properties
Already done! Your config is:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/hospital
spring.datasource.username=postgres
spring.datasource.password=postgres
```

### Step 5: Run Backend
```bash
cd Backend
mvn spring-boot:run
```

✅ **Should start successfully!**

---

## ✅ OPTION 2: Use H2 In-Memory Database (Quick Test)

No installation needed! Add to `pom.xml`:

```xml
<dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
    <scope>runtime</scope>
</dependency>
```

Update `application.properties`:
```properties
# H2 In-Memory Database
spring.datasource.url=jdbc:h2:mem:hospital
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=create-drop

# Disable Flyway
spring.flyway.enabled=false
```

---

## ✅ OPTION 3: Fix AWS RDS Connection

If your RDS database still exists:

### Check RDS Status:
1. Go to AWS Console: https://console.aws.amazon.com/rds/
2. Check if database `hospital-db` exists
3. Check status: Should be "Available"

### Fix Connection:
1. **Security Group**: Allow inbound traffic on port 5432 from your IP
2. **Public Access**: Must be enabled for remote connection
3. **VPC Settings**: Check if accessible from your network

Update `application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://hospital-db.cmpgiskuml99.us-east-1.rds.amazon.com:5432/hospital
spring.datasource.username=postgres
spring.datasource.password=Hospital123!

spring.flyway.enabled=true
```

---

## 🎯 RECOMMENDED: PostgreSQL Local (5 minutes)

**Why?**
- ✅ No cloud dependencies
- ✅ Free forever
- ✅ Full features
- ✅ Works offline
- ✅ Fast development

**Installation Time:** 5-10 minutes
**Download:** https://www.postgresql.org/download/

---

## 🔧 Troubleshooting

### "Connection refused" error?
- PostgreSQL service not running
- **Fix (Windows)**: Open Services → Find "postgresql" → Start

### "Password authentication failed"?
- Wrong password in application.properties
- **Fix**: Update password to match what you set during installation

### "Database 'hospital' does not exist"?
- Database not created
- **Fix**: Create it using pgAdmin or command line

---

## ✅ After Database Setup

Test email notifications:
```bash
# Run backend
cd Backend
mvn spring-boot:run

# Test with Postman
POST http://localhost:8080/api/notifications/send-email
Params:
  toEmail: arunkarthikk365@gmail.com
  subject: Test
  message: Email works!
```

**That's it!** 🎉
