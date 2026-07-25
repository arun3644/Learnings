# Dependency Injection in Spring Boot - Complete Guide

## What We Use in This Project

### ✅ Constructor Injection (Recommended)

**No `@Autowired` annotation needed!**

```java
@Service
public class DoctorService {
    
    private final DoctorRepository doctorRepository;
    private final JwtUtil jwtUtil;
    private final DoctorTimeSlotRepository doctorTimeSlotRepository;
    
    // Spring automatically injects dependencies
    public DoctorService(DoctorRepository doctorRepository, 
                         JwtUtil jwtUtil,
                         DoctorTimeSlotRepository doctorTimeSlotRepository) {
        this.doctorRepository = doctorRepository;
        this.jwtUtil = jwtUtil;
        this.doctorTimeSlotRepository = doctorTimeSlotRepository;
    }
}
```

### Why This Approach?

✅ **Cleaner code** - No `@Autowired` annotation clutter  
✅ **Immutable dependencies** - Can use `final` keyword  
✅ **Easier testing** - Can create instances with mock dependencies  
✅ **Compile-time safety** - Constructor ensures all dependencies are provided  
✅ **Modern Spring** - Recommended since Spring 4.3+

---

## Comparison: Different Injection Methods

### 1. Constructor Injection (✅ RECOMMENDED - What We Use)

```java
@Service
public class DoctorService {
    
    private final DoctorRepository doctorRepository;
    
    // No @Autowired needed!
    public DoctorService(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }
}
```

**Pros:**
- ✅ No `@Autowired` needed (Spring 4.3+)
- ✅ Dependencies are `final` (immutable)
- ✅ Easy to test (just call constructor with mocks)
- ✅ Clear dependencies (visible in constructor)
- ✅ Prevents circular dependencies

**Cons:**
- ⚠️ Constructor can get long with many dependencies (sign of code smell)

---

### 2. Field Injection (❌ NOT RECOMMENDED)

```java
@Service
public class DoctorService {
    
    @Autowired  // ❌ Avoid this
    private DoctorRepository doctorRepository;
    
    @Autowired
    private JwtUtil jwtUtil;
}
```

**Pros:**
- ✅ Less code (no constructor)
- ✅ Easy to add new dependencies

**Cons:**
- ❌ Cannot use `final` (mutable dependencies)
- ❌ Hard to test (need Spring context or reflection)
- ❌ Hidden dependencies (not visible in class signature)
- ❌ Can cause NullPointerException if used before injection
- ❌ Allows circular dependencies (bad design)

---

### 3. Setter Injection (⚠️ RARELY USED)

```java
@Service
public class DoctorService {
    
    private DoctorRepository doctorRepository;
    
    @Autowired
    public void setDoctorRepository(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }
}
```

**Pros:**
- ✅ Optional dependencies (can be null)
- ✅ Can change dependencies at runtime

**Cons:**
- ❌ Cannot use `final`
- ❌ Dependencies might be null
- ❌ More verbose than constructor injection

**Use Case:** Optional dependencies that might not always be available.

---

## Spring Stereotype Annotations

### What We Use:

| Annotation | Layer | Purpose | Example |
|------------|-------|---------|---------|
| `@Service` | Service | Business logic | `DoctorService` |
| `@RestController` | Controller | REST APIs | `DoctorController` |
| `@Repository` | Data | Database access | `DoctorRepository` |
| `@Configuration` | Config | Bean definitions | `SecurityConfig` |
| `@Component` | Generic | Utility classes | `EmailUtil` |

---

### 1. `@Service` (What We Use for Services)

```java
@Service
public class DoctorService {
    
    private final DoctorRepository doctorRepository;
    
    public DoctorService(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }
    
    public DoctorResponse getDoctorById(Long id) {
        // Business logic
    }
}
```

**Purpose:** Marks service layer classes (business logic)  
**Why not `@Component`?** More specific, indicates purpose clearly

---

### 2. `@RestController` (What We Use for Controllers)

```java
@RestController
@RequestMapping("api/doctors")
@CrossOrigin(origins = "*")
public class DoctorController {
    
    private final DoctorService doctorService;
    
    public DoctorController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<DoctorResponse> getDoctorById(@PathVariable Long id) {
        // Controller logic
    }
}
```

**Purpose:** Marks REST controller classes  
**Combines:** `@Controller` + `@ResponseBody`  
**Why not `@Component`?** Specialized for REST APIs, returns JSON automatically

---

### 3. `@Repository` (Implicit in Spring Data JPA)

```java
// No need to add @Repository explicitly!
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    Optional<Doctor> findByUsername(String username);
    boolean existsByUsername(String username);
}
```

**Purpose:** Marks data access layer  
**Why not add `@Repository`?** Spring Data JPA adds it automatically  
**Benefit:** Exception translation (database exceptions → Spring exceptions)

---

### 4. `@Configuration` (For Config Classes)

```java
@Configuration
public class SecurityConfig {
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    @Bean
    public JwtUtil jwtUtil() {
        return new JwtUtil();
    }
}
```

**Purpose:** Marks configuration classes with bean definitions  
**Contains:** `@Bean` methods

---

### 5. `@Component` (Generic - Rarely Used)

```java
@Component
public class EmailUtil {
    
    public void sendEmail(String to, String subject, String body) {
        // Email sending logic
    }
}
```

**Purpose:** Generic Spring-managed component  
**When to use:** Utility classes that don't fit other stereotypes  
**Prefer:** Use specialized annotations (`@Service`, `@RestController`, etc.) when possible

---

## When Do You Need `@Autowired`?

### Case 1: Single Constructor (NO `@Autowired` needed) ✅

```java
@Service
public class DoctorService {
    
    private final DoctorRepository doctorRepository;
    
    // Spring automatically uses this constructor
    public DoctorService(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }
}
```

**Rule:** If class has **only one constructor**, Spring uses it automatically.

---

### Case 2: Multiple Constructors (NEED `@Autowired`) ⚠️

```java
@Service
public class DoctorService {
    
    private final DoctorRepository doctorRepository;
    private final JwtUtil jwtUtil;
    
    @Autowired  // Required! Tells Spring which constructor to use
    public DoctorService(DoctorRepository doctorRepository, JwtUtil jwtUtil) {
        this.doctorRepository = doctorRepository;
        this.jwtUtil = jwtUtil;
    }
    
    // Another constructor
    public DoctorService(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
        this.jwtUtil = null;
    }
}
```

**Rule:** If class has **multiple constructors**, mark one with `@Autowired`.

---

### Case 3: Field Injection (NEED `@Autowired`) ❌

```java
@Service
public class DoctorService {
    
    @Autowired  // Required for field injection
    private DoctorRepository doctorRepository;
}
```

**Rule:** Field injection always needs `@Autowired`.  
**Recommendation:** Don't use field injection!

---

### Case 4: Setter Injection (NEED `@Autowired`) ⚠️

```java
@Service
public class DoctorService {
    
    private DoctorRepository doctorRepository;
    
    @Autowired  // Required for setter injection
    public void setDoctorRepository(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }
}
```

**Rule:** Setter injection always needs `@Autowired`.  
**Use Case:** Optional dependencies.

---

## Real Examples from Our Project

### Example 1: DoctorService

```java
@Service
public class DoctorService {
    
    private final DoctorRepository doctorRepository;
    private final JwtUtil jwtUtil;
    private final DoctorTimeSlotRepository doctorTimeSlotRepository;
    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    
    // No @Autowired needed - single constructor
    public DoctorService(DoctorRepository doctorRepository, 
                         JwtUtil jwtUtil,
                         DoctorTimeSlotRepository doctorTimeSlotRepository,
                         AppointmentRepository appointmentRepository, 
                         PatientRepository patientRepository) {
        this.doctorRepository = doctorRepository;
        this.jwtUtil = jwtUtil;
        this.doctorTimeSlotRepository = doctorTimeSlotRepository;
        this.appointmentRepository = appointmentRepository;
        this.patientRepository = patientRepository;
    }
}
```

---

### Example 2: DoctorController

```java
@RestController
@RequestMapping("api/doctors")
@CrossOrigin(origins = "*")
public class DoctorController {
    
    private final DoctorService doctorService;
    private final DashBoardService dashBoardService;
    
    // No @Autowired needed - single constructor
    public DoctorController(DoctorService doctorService, DashBoardService dashBoardService) {
        this.doctorService = doctorService;
        this.dashBoardService = dashBoardService;
    }
}
```

---

### Example 3: AuthController

```java
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/auth")
public class AuthController {
    
    private AdminService adminService;
    private DoctorService doctorService;
    private NurseService nurseService;
    private PatientService patientService;
    private AuthService authService;
    private JwtUtil jwtUtil;
    
    // No @Autowired needed - single constructor
    public AuthController(AdminService adminService, 
                          DoctorService doctorService, 
                          NurseService nurseService, 
                          PatientService patientService, 
                          AuthService authService, 
                          JwtUtil jwtUtil) {
        this.adminService = adminService;
        this.doctorService = doctorService;
        this.nurseService = nurseService;
        this.patientService = patientService;
        this.authService = authService;
        this.jwtUtil = jwtUtil;
    }
}
```

---

## Testing with Constructor Injection

### Easy to Test (No Spring Context Needed)

```java
public class DoctorServiceTest {
    
    @Test
    public void testGetDoctorById() {
        // Create mocks
        DoctorRepository mockRepo = mock(DoctorRepository.class);
        JwtUtil mockJwt = mock(JwtUtil.class);
        
        // Create service with mocks (no Spring needed!)
        DoctorService service = new DoctorService(mockRepo, mockJwt, ...);
        
        // Test
        when(mockRepo.findById(1L)).thenReturn(Optional.of(new Doctor()));
        DoctorResponse response = service.getDoctorById(1L);
        
        assertNotNull(response);
    }
}
```

**Benefit:** Can test without starting Spring context (faster tests).

---

## Summary

### ✅ What We Use:

| Component | Annotation | Injection Method |
|-----------|------------|------------------|
| Services | `@Service` | Constructor (no `@Autowired`) |
| Controllers | `@RestController` | Constructor (no `@Autowired`) |
| Repositories | (implicit `@Repository`) | Spring Data JPA |
| Config | `@Configuration` | N/A |
| Utilities | `@Component` | Constructor (no `@Autowired`) |

### ❌ What We Avoid:

- ❌ Field injection with `@Autowired`
- ❌ Generic `@Component` when specialized annotations exist
- ❌ Multiple constructors (keep it simple)
- ❌ Setter injection (unless optional dependencies)

### 🎯 Best Practices:

1. **Use constructor injection** (no `@Autowired` needed)
2. **Make dependencies `final`** (immutable)
3. **Use specialized annotations** (`@Service`, `@RestController`, not `@Component`)
4. **Keep constructors simple** (if too many dependencies, refactor)
5. **Test without Spring** (constructor injection makes this easy)

---

## Quick Reference

```java
// ✅ GOOD - What we use
@Service
public class MyService {
    private final MyRepository repository;
    
    public MyService(MyRepository repository) {  // No @Autowired!
        this.repository = repository;
    }
}

// ❌ BAD - Avoid this
@Service
public class MyService {
    @Autowired  // Don't do this
    private MyRepository repository;
}

// ⚠️ OKAY - Only if multiple constructors
@Service
public class MyService {
    private final MyRepository repository;
    
    @Autowired  // Needed because multiple constructors
    public MyService(MyRepository repository) {
        this.repository = repository;
    }
    
    public MyService() {
        this.repository = null;
    }
}
```

---

**Remember:** Modern Spring (4.3+) doesn't need `@Autowired` for single-constructor injection!
