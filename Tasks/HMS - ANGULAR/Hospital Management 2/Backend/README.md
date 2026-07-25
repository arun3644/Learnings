# Practice Spring Boot Project

A minimal Spring Boot starter project that runs without errors. Perfect for practicing Spring Boot concepts!

## 📋 Project Structure

```
practice-springboot/
├── src/
│   └── main/
│       ├── java/
│       │   └── com/
│       │       └── practice/
│       │           ├── PracticeApplication.java (Main entry point)
│       │           └── controller/
│       │               └── HealthController.java (Sample REST controller)
│       └── resources/
│           └── application.properties (Configuration)
├── pom.xml (Maven dependencies)
└── README.md
```

## 🚀 How to Run

### Prerequisites
- Java 17 or higher
- Maven 3.6+ (or use IDE's built-in Maven)

### Option 1: Using Maven Command
```bash
cd practice-springboot
mvn spring-boot:run
```

### Option 2: Using IDE
1. Open the project in your IDE (IntelliJ IDEA, Eclipse, VS Code)
2. Right-click on `PracticeApplication.java`
3. Select "Run" or "Debug"

### Option 3: Build JAR and Run
```bash
mvn clean package
java -jar target/practice-springboot-1.0.0.jar
```

## 🧪 Test the Application

Once running, test these endpoints:

### Health Check
```bash
curl http://localhost:8080/api/health
```

**Response:**
```json
{
  "status": "UP",
  "message": "Practice Spring Boot Application is running!",
  "timestamp": "2024-04-12T10:30:00",
  "port": 8080
}
```

### Hello Endpoint
```bash
curl http://localhost:8080/api/hello
```

**Response:**
```json
{
  "message": "Hello from Spring Boot!",
  "tip": "Start writing your code in this project"
}
```

## 📦 Dependencies Included

- **spring-boot-starter-web**: For building REST APIs
- **lombok**: For reducing boilerplate code (optional)
- **spring-boot-devtools**: For hot reload during development (optional)

## 📝 What to Practice

### 1. Create a Simple REST API
Create a new controller in `src/main/java/com/practice/controller/`:

```java
package com.practice.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @GetMapping
    public String getUsers() {
        return "List of users";
    }
    
    @PostMapping
    public String createUser(@RequestBody String user) {
        return "User created: " + user;
    }
}
```

### 2. Create a Service Layer
Create a service in `src/main/java/com/practice/service/`:

```java
package com.practice.service;

import org.springframework.stereotype.Service;

@Service
public class UserService {
    
    public String getUserById(Long id) {
        return "User with ID: " + id;
    }
}
```

### 3. Create a Model/Entity
Create a model in `src/main/java/com/practice/model/`:

```java
package com.practice.model;

import lombok.Data;

@Data
public class User {
    private Long id;
    private String name;
    private String email;
}
```

### 4. Add More Dependencies
Edit `pom.xml` to add more dependencies as needed:

```xml
<!-- For database -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>

<!-- For validation -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>

<!-- For security -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```

## 🎯 Practice Topics

- ✅ REST API Controllers (@RestController, @GetMapping, @PostMapping)
- ✅ Service Layer (@Service)
- ✅ Dependency Injection (@Autowired, @RequiredArgsConstructor)
- ✅ Request/Response handling (@RequestBody, @PathVariable, @RequestParam)
- ✅ Configuration (@Value, application.properties)
- ✅ Exception Handling (@ControllerAdvice, @ExceptionHandler)
- ✅ Validation (@Valid, @NotBlank, @Email)
- ✅ Database Integration (JPA, Hibernate)
- ✅ Security (JWT, Spring Security)

## 🛠️ Troubleshooting

### Port Already in Use
If port 8080 is already in use, change it in `application.properties`:
```properties
server.port=8081
```

### Maven Build Fails
Clean and rebuild:
```bash
mvn clean install
```

### Hot Reload Not Working
Make sure `spring-boot-devtools` is in your dependencies and your IDE has "Build Automatically" enabled.

## 📚 Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Guides](https://spring.io/guides)
- [Baeldung Spring Tutorials](https://www.baeldung.com/spring-boot)

## ✨ Happy Coding!

This is your playground. Experiment, break things, learn, and have fun! 🚀
