package com.hospital;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.hospital")
public class HospitalManagement {
    
    public static void main(String[] args) {
        SpringApplication.run(HospitalManagement.class, args);
        System.out.println("\n\nServer running at: http://localhost:8080\n\n");
    }
}
