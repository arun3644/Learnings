# Complete Annotations Guide - Hospital Management System

This document explains all annotations used in the project and their purposes.

---

## 📋 TABLE OF CONTENTS

1. [JPA/Hibernate Annotations](#jpahibernate-annotations)
2. [Jackson JSON Annotations](#jackson-json-annotations)
3. [Validation Annotations](#validation-annotations)
4. [Spring Framework Annotations](#spring-framework-annotations)
5. [Summary by Layer](#summary-by-layer)

---

## 1. JPA/HIBERNATE ANNOTATIONS

### Entity & Table Mapping

#### `@Entity`
**Package:** `jakarta.persistence`  
**Use Case:** Marks a class as a JPA entity (database table)  
**Applied To:** All model classes (Doctor, Patient, Admin, Nurse, Appointment, etc.)

```java
@Entity
public class Doctor {
    // ...
}
```

**Why:** Tells JPA that this class should be mapped to a database table.

---

#### `@Table(name = "table_name")`
**Package:** `jakarta.persistence`  
**Use Case:** Specifies the database table name  
**Applied To:** All entity classes

```java
@Entity
@Table(name = "doctors")
public class Doctor {
    // ...
}
```

**Why:** Maps the entity to a specific table name in the database.

---

### Primary Key & ID Generation

#### `@Id`
**Package:** `jakarta.persistence`  
**Use Case:** Marks a field as the primary key  
**Applied To:** `id` field in all entities

```java
@Id
private Long id;
```

**Why:** Identifies the primary key field for the entity.

---

#### `@GeneratedValue(strategy = GenerationType.IDENTITY)`
**Package:** `jakarta.persistence`  
**Use Case:** Auto-generates primary key values  
**Applied To:** `id` field in all entities

```java
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
```

**Why:** Database automatically generates unique IDs (auto-increment).

---

### Column Mapping

#### `@Column`
**Package:** `jakarta.persistence`  
**Use Case:** Maps field to database column with constraints  
**Applied To:** All entity fields

```java
@Column(nullable = false, unique = true, length = 50)
private String username;

@Column(name = "created_at", nullable = false, updatable = false)
private Date createdAt;
```

**Attributes:**
- `nullable = false` - Field cannot be NULL
- `unique = true` - Field must be unique
- `length = 50` - Maximum length for VARCHAR
- `name = "column_name"` - Custom column name
- `updatable = false` - Cannot be updated after creation

**Why:** Defines database column properties and constraints.

---

### Date/Time Handling

#### `@Temporal(TemporalType.TIMESTAMP)`
**Package:** `jakarta.persistence`  
**Use Case:** Specifies how Date fields are stored  
**Applied To:** `createdAt`, `updatedAt` fields

```java
@Temporal(TemporalType.TIMESTAMP)
@Column(name = "created_at")
private Date createdAt;
```

**Types:**
- `TIMESTAMP` - Date + Time
- `DATE` - Date only
- `TIME` - Time only

**Why:** Tells JPA how to map Java Date to database date/time types.

---

### Lifecycle Callbacks

#### `@PrePersist`
**Package:** `jakarta.persistence`  
**Use Case:** Executes method before entity is saved for the first time  
**Applied To:** `onCreate()` method in all entities

```java
@PrePersist
protected void onCreate() {
    createdAt = new Date();
    updatedAt = new Date();
}
```

**Why:** Automatically sets timestamps when creating new records.

---

#### `@PreUpdate`
**Package:** `jakarta.persistence`  
**Use Case:** Executes method before entity is updated  
**Applied To:** `onUpdate()` method in all entities

```java
@PreUpdate
protected void onUpdate() {
    updatedAt = new Date();
}
```

**Why:** Automatically updates `updatedAt` timestamp on every update.

---

## 2. JACKSON JSON ANNOTATIONS

### Field Visibility Control

#### `@JsonIgnore`
**Package:** `com.fasterxml.jackson.annotation`  
**Use Case:** Excludes field from JSON serialization/deserialization  
**Applied To:** `password` getter methods

```java
@JsonIgnore
public String getPassword() {
    return password;
}
```

**Why:** Prevents password from appearing in JSON responses (security).

---

#### `@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)`
**Package:** `com.fasterxml.jackson.annotation`  
**Use Case:** Field can be written (input) but not read (output)  
**Applied To:** `password` field in entities

```java
@Column(nullable = false)
@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
private String password;
```

**Access Types:**
- `WRITE_ONLY` - Can set but not get (passwords)
- `READ_ONLY` - Can get but not set (computed fields)
- `READ_WRITE` - Default (both)

**Why:** Allows password in request but hides it in response.

---

#### `@JsonProperty("fieldName")`
**Package:** `com.fasterxml.jackson.annotation`  
**Use Case:** Maps Java field to JSON property name  
**Applied To:** DTO fields

```java
@JsonProperty("username")
private String username;
```

**Why:** Ensures consistent JSON field names, useful for camelCase/snake_case conversion.

---

#### `@JsonInclude(JsonInclude.Include.NON_NULL)`
**Package:** `com.fasterxml.jackson.annotation`  
**Use Case:** Excludes null fields from JSON output  
**Applied To:** Response DTOs

```java
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DoctorResponse {
    // ...
}
```

**Include Types:**
- `NON_NULL` - Exclude null values
- `NON_EMPTY` - Exclude null and empty collections
- `ALWAYS` - Include everything

**Why:** Cleaner JSON responses, reduces payload size.

---

## 3. VALIDATION ANNOTATIONS

### Required Field Validation

#### `@NotBlank`
**Package:** `jakarta.validation.constraints`  
**Use Case:** Field must not be null, empty, or whitespace  
**Applied To:** String fields in request DTOs

```java
@NotBlank(message = "Username is required")
private String username;
```

**Why:** Ensures required text fields have actual content.

---

#### `@NotNull`
**Package:** `jakarta.validation.constraints`  
**Use Case:** Field must not be null  
**Applied To:** Non-string fields (Integer, Date, etc.)

```java
@NotNull(message = "Years of experience is required")
private Integer yearsOfExperience;
```

**Why:** Ensures required non-text fields are provided.

---

### Format Validation

#### `@Email`
**Package:** `jakarta.validation.constraints`  
**Use Case:** Validates email format  
**Applied To:** `email` fields in request DTOs

```java
@Email(message = "Email must be valid")
private String email;
```

**Why:** Ensures email addresses are properly formatted.

---

#### `@Pattern(regexp = "regex")`
**Package:** `jakarta.validation.constraints`  
**Use Case:** Validates field against regex pattern  
**Applied To:** `username`, `phoneNumber` in request DTOs

```java
@Pattern(regexp = "^[a-zA-Z0-9_]+$", message = "Username can only contain letters, numbers, and underscores")
private String username;

@Pattern(regexp = "^[0-9]{10,15}$", message = "Phone number must be between 10 and 15 digits")
private String phoneNumber;
```

**Why:** Enforces specific format rules (alphanumeric, phone numbers, etc.).

---

### Length Validation

#### `@Size(min = x, max = y)`
**Package:** `jakarta.validation.constraints`  
**Use Case:** Validates string length or collection size  
**Applied To:** String fields in request DTOs

```java
@Size(min = 3, max = 50, message = "Username must be between 3 and 50 characters")
private String username;

@Size(min = 6, max = 100, message = "Password must be between 6 and 100 characters")
private String password;
```

**Why:** Ensures fields meet length requirements.

---

### Numeric Validation

#### `@Min(value = x)`
**Package:** `jakarta.validation.constraints`  
**Use Case:** Validates minimum numeric value  
**Applied To:** Numeric fields in request DTOs

```java
@Min(value = 0, message = "Years of experience must be at least 0")
private Integer yearsOfExperience;

@Min(value = 1, message = "Age must be at least 1")
private Integer age;
```

**Why:** Ensures numeric fields meet minimum requirements.

---

#### `@Max(value = x)`
**Package:** `jakarta.validation.constraints`  
**Use Case:** Validates maximum numeric value  
**Applied To:** Numeric fields with upper limits

```java
@Max(value = 150, message = "Age cannot exceed 150")
private Integer age;
```

**Why:** Ensures numeric fields don't exceed limits.

---

## 4. SPRING FRAMEWORK ANNOTATIONS

### Service Layer

#### `@Service`
**Package:** `org.springframework.stereotype`  
**Use Case:** Marks class as a service component  
**Applied To:** All service classes

```java
@Service
public class DoctorService {
    
    private final DoctorRepository doctorRepository;
    
    // Constructor injection - NO @Autowired needed (Spring 4.3+)
    public DoctorService(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }
}
```

**Why:** Registers class as a Spring bean for dependency injection. Specialized version of `@Component` for service layer.

---

### Dependency Injection

#### Constructor Injection (Recommended - No `@Autowired` needed)
**Package:** N/A (Spring feature)  
**Use Case:** Inject dependencies via constructor  
**Applied To:** All services and controllers

```java
@Service
public class DoctorService {
    
    private final DoctorRepository doctorRepository;
    private final JwtUtil jwtUtil;
    
    // Spring automatically injects dependencies (no @Autowired needed)
    public DoctorService(DoctorRepository doctorRepository, JwtUtil jwtUtil) {
        this.doctorRepository = doctorRepository;
        this.jwtUtil = jwtUtil;
    }
}
```

**Why:** 
- Cleaner code (no `@Autowired` annotation needed)
- Immutable dependencies (`final` fields)
- Easier to test
- Spring 4.3+ automatically uses single constructor for injection

**Note:** `@Autowired` is only needed if class has multiple constructors.

---

#### `@Autowired` (Optional)
**Package:** `org.springframework.beans.factory.annotation`  
**Use Case:** Explicitly marks injection point  
**Applied To:** Constructors (only if multiple), setters, or fields

```java
// Only needed with multiple constructors
@Service
public class DoctorService {
    
    private final DoctorRepository doctorRepository;
    
    @Autowired  // Required when multiple constructors exist
    public DoctorService(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }
    
    public DoctorService() {
        this.doctorRepository = null;
    }
}
```

**Why:** Tells Spring which constructor/setter/field to use for injection.

**Best Practice:** Avoid field injection, prefer constructor injection without `@Autowired`.

---

#### `@Component`
**Package:** `org.springframework.stereotype`  
**Use Case:** Generic Spring-managed component  
**Applied To:** Utility classes that don't fit other stereotypes

```java
@Component
public class EmailUtil {
    
    public void sendEmail(String to, String subject) {
        // Email logic
    }
}
```

**Why:** Registers class as Spring bean. Use specialized versions (`@Service`, `@RestController`, `@Repository`) when possible.

**Specialized Versions:**
- `@Service` - Service layer (business logic)
- `@RestController` - Controller layer (REST APIs)
- `@Repository` - Data layer (database access)
- `@Configuration` - Configuration classes

---

#### `@Repository`
**Package:** `org.springframework.stereotype`  
**Use Case:** Marks data access layer component  
**Applied To:** Repository interfaces (automatically by Spring Data JPA)

```java
@Repository  // Implicit - Spring Data JPA adds this automatically
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    Optional<Doctor> findByUsername(String username);
}
```

**Why:** 
- Enables exception translation (converts database exceptions to Spring exceptions)
- Spring Data JPA automatically creates implementation
- No need to explicitly add `@Repository` when extending JpaRepository

---

#### `@Configuration`
**Package:** `org.springframework.context.annotation`  
**Use Case:** Marks class as source of bean definitions  
**Applied To:** Configuration classes

```java
@Configuration
public class SecurityConfig {
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
```

**Why:** Indicates class contains `@Bean` methods for Spring container.

---

### Controller Layer

#### `@RestController`
**Package:** `org.springframework.web.bind.annotation`  
**Use Case:** Marks class as REST API controller  
**Applied To:** All controller classes

```java
@RestController
@RequestMapping("api/doctors")
public class DoctorController {
    // ...
}
```

**Why:** Combines `@Controller` + `@ResponseBody`, returns JSON by default.

---

#### `@RequestMapping("path")`
**Package:** `org.springframework.web.bind.annotation`  
**Use Case:** Maps base URL path for controller  
**Applied To:** Controller classes

```java
@RestController
@RequestMapping("api/doctors")
public class DoctorController {
    // ...
}
```

**Why:** Defines base path for all endpoints in the controller.

---

#### `@CrossOrigin(origins = "*")`
**Package:** `org.springframework.web.bind.annotation`  
**Use Case:** Enables CORS for cross-origin requests  
**Applied To:** Controller classes

```java
@RestController
@CrossOrigin(origins = "*")
public class DoctorController {
    // ...
}
```

**Why:** Allows frontend (different domain/port) to call APIs.

---

### HTTP Method Mapping

#### `@GetMapping("path")`
**Package:** `org.springframework.web.bind.annotation`  
**Use Case:** Maps HTTP GET requests  
**Applied To:** Controller methods

```java
@GetMapping("")
public ResponseEntity<List<DoctorResponse>> getAllDoctors() {
    // ...
}

@GetMapping("/{id}")
public ResponseEntity<DoctorResponse> getDoctorById(@PathVariable Long id) {
    // ...
}
```

**Why:** Handles GET requests for retrieving data.

---

#### `@PostMapping("path")`
**Package:** `org.springframework.web.bind.annotation`  
**Use Case:** Maps HTTP POST requests  
**Applied To:** Controller methods

```java
@PostMapping("")
public ResponseEntity<AppointmentResponse> bookAppointment(@RequestBody AppointmentRequest request) {
    // ...
}
```

**Why:** Handles POST requests for creating data.

---

#### `@PutMapping("path")`
**Package:** `org.springframework.web.bind.annotation`  
**Use Case:** Maps HTTP PUT requests  
**Applied To:** Controller methods

```java
@PutMapping("/{id}")
public ResponseEntity<DoctorResponse> updateDoctor(@PathVariable Long id, @RequestBody DoctorUpdateRequest request) {
    // ...
}
```

**Why:** Handles PUT requests for updating data.

---

#### `@DeleteMapping("path")`
**Package:** `org.springframework.web.bind.annotation`  
**Use Case:** Maps HTTP DELETE requests  
**Applied To:** Controller methods

```java
@DeleteMapping("/{id}")
public ResponseEntity<?> deleteDoctor(@PathVariable Long id) {
    // ...
}
```

**Why:** Handles DELETE requests for removing data.

---

### Request Parameter Binding

#### `@PathVariable`
**Package:** `org.springframework.web.bind.annotation`  
**Use Case:** Binds URL path variable to method parameter  
**Applied To:** Controller method parameters

```java
@GetMapping("/{id}")
public ResponseEntity<DoctorResponse> getDoctorById(@PathVariable Long id) {
    // ...
}
```

**URL:** `GET /api/doctors/5` → `id = 5`

**Why:** Extracts dynamic values from URL path.

---

#### `@RequestParam`
**Package:** `org.springframework.web.bind.annotation`  
**Use Case:** Binds query parameter to method parameter  
**Applied To:** Controller method parameters

```java
@GetMapping("/available-slots")
public ResponseEntity<List<DoctorTimeSlot>> getAvailableSlots(
    @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date date) {
    // ...
}
```

**URL:** `GET /api/doctors/1/available-slots?date=2026-04-29` → `date = 2026-04-29`

**Why:** Extracts query parameters from URL.

---

#### `@RequestBody`
**Package:** `org.springframework.web.bind.annotation`  
**Use Case:** Binds HTTP request body to method parameter  
**Applied To:** Controller method parameters

```java
@PostMapping("")
public ResponseEntity<DoctorRegisterResponse> registerDoctor(@RequestBody DoctorRegisterRequest request) {
    // ...
}
```

**Why:** Converts JSON request body to Java object.

---

#### `@Valid`
**Package:** `jakarta.validation`  
**Use Case:** Triggers validation on request object  
**Applied To:** `@RequestBody` parameters

```java
@PostMapping("")
public ResponseEntity<DoctorRegisterResponse> registerDoctor(@Valid @RequestBody DoctorRegisterRequest request) {
    // ...
}
```

**Why:** Validates request data using validation annotations before processing.

---

### Date Formatting

#### `@DateTimeFormat(pattern = "yyyy-MM-dd")`
**Package:** `org.springframework.format.annotation`  
**Use Case:** Specifies date format for request parameters  
**Applied To:** Date parameters

```java
@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date date
```

**Why:** Converts string date from URL to Java Date object.

---

## 5. SUMMARY BY LAYER

### Entity Layer (Models)
**Purpose:** Database mapping and persistence

| Annotation | Purpose |
|------------|---------|
| `@Entity` | Mark as JPA entity |
| `@Table` | Map to database table |
| `@Id` | Primary key |
| `@GeneratedValue` | Auto-generate ID |
| `@Column` | Column mapping & constraints |
| `@Temporal` | Date/time type |
| `@PrePersist` | Before insert callback |
| `@PreUpdate` | Before update callback |
| `@JsonIgnore` | Hide from JSON |
| `@JsonProperty` | JSON access control |

**Files:** `Doctor.java`, `Patient.java`, `Admin.java`, `Nurse.java`, `Appointment.java`

---

### DTO Layer (Request/Response)
**Purpose:** Data transfer and validation

| Annotation | Purpose |
|------------|---------|
| `@NotBlank` | Required string |
| `@NotNull` | Required field |
| `@Email` | Email format |
| `@Pattern` | Regex validation |
| `@Size` | Length validation |
| `@Min` / `@Max` | Numeric range |
| `@JsonProperty` | JSON field mapping |
| `@JsonInclude` | Hide null fields |

**Files:** `DoctorRegisterRequest.java`, `DoctorResponse.java`, `PatientRegisterRequest.java`, etc.

---

### Service Layer
**Purpose:** Business logic and dependency injection

| Annotation | Purpose |
|------------|---------|
| `@Service` | Spring service component |
| Constructor Injection | Inject dependencies (no `@Autowired` needed) |
| `@Autowired` | Explicit injection (only if multiple constructors) |
| `@Component` | Generic Spring component |
| `@Repository` | Data access component (implicit in Spring Data JPA) |
| `@Configuration` | Configuration class with bean definitions |

**Files:** `DoctorService.java`, `PatientService.java`, `AdminService.java`, etc.

---

### Controller Layer
**Purpose:** REST API endpoints

| Annotation | Purpose |
|------------|---------|
| `@RestController` | REST controller |
| `@RequestMapping` | Base URL path |
| `@CrossOrigin` | Enable CORS |
| `@GetMapping` | HTTP GET |
| `@PostMapping` | HTTP POST |
| `@PutMapping` | HTTP PUT |
| `@DeleteMapping` | HTTP DELETE |
| `@PathVariable` | URL path variable |
| `@RequestParam` | Query parameter |
| `@RequestBody` | Request body |
| `@Valid` | Trigger validation |
| `@DateTimeFormat` | Date format |

**Files:** `DoctorController.java`, `PatientController.java`, `AdminController.java`, etc.

---

## 6. ANNOTATION FLOW EXAMPLE

### Registration Flow

```
1. CLIENT REQUEST
   POST /api/auth/register/doctor
   Body: { "username": "doctor1", "password": "pass123", ... }

2. CONTROLLER (@RestController, @PostMapping, @Valid, @RequestBody)
   → Receives request
   → @Valid triggers validation
   → @RequestBody converts JSON to DoctorRegisterRequest

3. DTO VALIDATION (@NotBlank, @Email, @Pattern, @Size, @Min)
   → Validates all fields
   → Returns 400 if validation fails

4. SERVICE (@Service)
   → Business logic
   → Creates Doctor entity

5. ENTITY (@Entity, @PrePersist)
   → @PrePersist sets createdAt/updatedAt
   → @JsonProperty hides password

6. DATABASE
   → @Table, @Column, @Id, @GeneratedValue
   → Saves to database

7. RESPONSE (@JsonInclude, @JsonIgnore)
   → @JsonIgnore hides password
   → @JsonInclude hides null fields
   → Returns JSON response
```

---

## 7. BEST PRACTICES

### ✅ DO:
- Use validation annotations on **DTOs** (request/response objects)
- Use JPA annotations on **Entities** (database models)
- Use `@PrePersist` and `@PreUpdate` for automatic timestamps
- Use `@JsonIgnore` for sensitive fields (passwords)
- Use `@JsonInclude(NON_NULL)` to clean up responses
- Use `@Valid` on `@RequestBody` to trigger validation

### ❌ DON'T:
- Don't put validation annotations on entities (causes issues)
- Don't manually set `createdAt`/`updatedAt` (use lifecycle callbacks)
- Don't expose passwords in JSON responses
- Don't forget `@CrossOrigin` for frontend integration
- Don't skip `@Valid` annotation (validation won't work)

---

## 8. QUICK REFERENCE

### Common Annotation Combinations

**Entity Class:**
```java
@Entity
@Table(name = "doctors")
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String username;
    
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
    
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at", updatable = false)
    private Date createdAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = new Date();
    }
}
```

**Request DTO:**
```java
public class DoctorRegisterRequest {
    @NotBlank(message = "Username is required")
    @Size(min = 3, max = 50)
    @Pattern(regexp = "^[a-zA-Z0-9_]+$")
    private String username;
    
    @NotBlank
    @Email
    private String email;
    
    @NotNull
    @Min(0)
    private Integer yearsOfExperience;
}
```

**Response DTO:**
```java
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DoctorResponse {
    @JsonProperty("id")
    private Long id;
    
    @JsonProperty("username")
    private String username;
}
```

**Controller:**
```java
@RestController
@RequestMapping("api/doctors")
@CrossOrigin(origins = "*")
public class DoctorController {
    
    @PostMapping("")
    public ResponseEntity<DoctorResponse> register(
        @Valid @RequestBody DoctorRegisterRequest request) {
        // ...
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<DoctorResponse> getById(@PathVariable Long id) {
        // ...
    }
}
```

---

**Total Annotations Used:** 30+  
**Categories:** JPA (10), Jackson (5), Validation (8), Spring (12)

---

This guide covers all annotations used in the Hospital Management System project!
