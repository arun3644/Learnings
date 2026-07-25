package com.hospital.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.hospital.model.Appointment;
import com.hospital.model.Doctor;
import com.hospital.model.Patient;

import software.amazon.awssdk.services.sns.SnsClient;
import software.amazon.awssdk.services.sns.model.PublishRequest;

import java.text.SimpleDateFormat;

@Service
public class SnsNotificationService {
	
	private static final Logger logger = LoggerFactory.getLogger(SnsNotificationService.class);
	
	@Autowired(required = false)
	private SnsClient snsClient;
	
	@Value("${aws.sns.topic.arn:}")
	private String topicArn;
	
	@Value("${aws.sns.enabled:false}")
	private boolean snsEnabled;
	
	public void sendAppointmentConfirmation(Appointment apt, Patient patient, Doctor doctor) {
		if (!snsEnabled || snsClient == null) {
			logger.info("SNS disabled - skipping notification");
			return;
		}
		
		String message = String.format(
			"Dear %s,\n\nYour appointment has been booked!\n\n" +
			"ID: %s\nDoctor: %s (%s)\nDate: %s\nTime: %s\nReason: %s\n\n" +
			"Thank you,\nHospital Management",
			patient.getName(), apt.getAppointmentId(), doctor.getName(), 
			doctor.getSpecialization(), formatDate(apt.getAppointmentDate()), 
			apt.getAppointmentTime(), apt.getReason()
		);
		
		publish(message, "Appointment Confirmed - " + apt.getAppointmentId());
	}
	
	public void sendAppointmentCancellation(Appointment apt, Patient patient, Doctor doctor) {
		if (!snsEnabled || snsClient == null) {
			logger.info("SNS disabled - skipping cancellation notification");
			return;
		}
		
		String message = String.format(
			"Dear %s,\n\nYour appointment %s on %s at %s has been cancelled.\n\n" +
			"Thank you,\nHospital Management",
			patient.getName(), apt.getAppointmentId(), 
			formatDate(apt.getAppointmentDate()), apt.getAppointmentTime()
		);
		
		publish(message, "Appointment Cancelled - " + apt.getAppointmentId());
	}
	
	public void sendAppointmentReminder(Appointment apt, Patient patient, Doctor doctor) {
		if (!snsEnabled || snsClient == null) {
			logger.info("SNS disabled - skipping reminder notification");
			return;
		}
		
		String message = String.format(
			"Dear %s,\n\nReminder: Your appointment with %s is tomorrow at %s.\n\n" +
			"Thank you,\nHospital Management",
			patient.getName(), doctor.getName(), apt.getAppointmentTime()
		);
		
		publish(message, "Appointment Reminder - Tomorrow");
	}
	
	private void publish(String message, String subject) {
		try {
			PublishRequest request = PublishRequest.builder()
				.topicArn(topicArn)
				.message(message)
				.subject(subject)
				.build();
			
			String messageId = snsClient.publish(request).messageId();
			logger.info("SNS sent: {}", messageId);
		} catch (Exception e) {
			logger.error("SNS failed: {}", e.getMessage());
		}
	}
	
	private String formatDate(java.util.Date date) {
		return new SimpleDateFormat("EEEE, MMMM dd, yyyy").format(date);
	}
}
