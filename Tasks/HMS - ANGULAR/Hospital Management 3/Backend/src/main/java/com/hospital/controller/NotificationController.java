package com.hospital.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.hospital.service.NotificationService;

@RestController
@RequestMapping("api/notifications")
@CrossOrigin(origins = "*")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @PostMapping("/send-email")
    public ResponseEntity<String> sendEmail(
            @RequestParam String toEmail,
            @RequestParam String subject,
            @RequestParam String message) {
        try {
            notificationService.sendEmail(toEmail, subject, message);
            return ResponseEntity.ok("Email sent successfully!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to send email: " + e.getMessage());
        }
    }

    @PostMapping("/send-html-email")
    public ResponseEntity<String> sendHtmlEmail(
            @RequestParam String toEmail,
            @RequestParam String subject,
            @RequestParam String htmlBody) {
        try {
            notificationService.sendHtmlEmail(toEmail, subject, htmlBody);
            return ResponseEntity.ok("HTML Email sent successfully!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to send HTML email: " + e.getMessage());
        }
    }
}
