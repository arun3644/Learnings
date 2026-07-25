# 🚀 QUICK START GUIDE

## Step 1: Run the Application

```bash
cd practice-springboot
mvn spring-boot:run
```

## Step 2: Verify It's Running

Open browser or use curl:
```bash
curl http://localhost:8080/api/health
```

You should see:
```json
{
  "status": "UP",
  "message": "Practice Spring Boot Application is running!",
  "timestamp": "2024-04-12T10:30:00",
  "port": 8080
}
```

## Step 3: Start Coding!

### Create Your First Controller

**File:** `src/main/java/com/practice/controller/MyController.java`

```java
package com.practice.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/my")
public class MyController {
    
    @GetMapping("/test")
    public String test() {
        return "My first endpoint!";
    }
}
```

### Test Your Endpoint

```bash
curl http://localhost:8080/api/my/test
```

## Step 4: Add a Service

**File:** `src/main/java/com/practice/service/MyService.java`

```java
package com.practice.service;

import org.springframework.stereotype.Service;

@Service
public class MyService {
    
    public String getMessage() {
        return "Hello from service!";
    }
}
```

### Use Service in Controller

```java
package com.practice.controller;

import com.practice.service.MyService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/my")
@RequiredArgsConstructor
public class MyController {
    
    private final MyService myService;
    
    @GetMapping("/test")
    public String test() {
        return myService.getMessage();
    }
}
```

## Step 5: Create a Model

**File:** `src/main/java/com/practice/model/Person.java`

```java
package com.practice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Person {
    private Long id;
    private String name;
    private String email;
}
```

### Return Model from Controller

```java
@GetMapping("/person")
public Person getPerson() {
    return new Person(1L, "John Doe", "john@example.com");
}
```

## 🎉 That's It!

You now have a working Spring Boot application. Keep practicing and adding more features!

## 📝 Common Commands

```bash
# Run application
mvn spring-boot:run

# Build JAR
mvn clean package

# Run JAR
java -jar target/practice-springboot-1.0.0.jar

# Clean build
mvn clean install

# Skip tests
mvn clean install -DskipTests
```

## 🔧 Configuration Tips

### Change Port
Edit `application.properties`:
```properties
server.port=8081
```

### Add CORS
```properties
cors.allowed.origins=http://localhost:4200
```

### Enable Debug Logging
```properties
logging.level.com.practice=DEBUG
```

Happy Coding! 🚀
