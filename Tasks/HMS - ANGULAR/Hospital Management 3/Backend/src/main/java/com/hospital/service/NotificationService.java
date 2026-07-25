
package com.hospital.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.ses.SesClient;
import software.amazon.awssdk.services.ses.model.*;

@Service
public class NotificationService {

    @Autowired
    private SesClient sesClient;

    @Value("${aws.ses.from.email}")
    private String fromEmail;
    
    @Value("${aws.ses.from.name}")
    private String fromName;

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