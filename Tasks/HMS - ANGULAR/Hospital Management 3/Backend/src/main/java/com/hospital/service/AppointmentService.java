package com.hospital.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.hospital.dto.AppointmentRequest;
import com.hospital.dto.AppointmentResponse;
import com.hospital.dto.AppointmentResponse.AppointmentData;
import com.hospital.dto.AppointmentResponse.DoctorBasicInfo;
import com.hospital.dto.AppointmentResponse.PatientBasicInfo;
import com.hospital.dto.AppointmentUpdateRequest;
import com.hospital.model.Appointment;
import com.hospital.model.Doctor;
import com.hospital.model.DoctorTimeSlot;
import com.hospital.model.Patient;
import com.hospital.repository.AppointmentRepository;
import com.hospital.repository.DoctorRepository;
import com.hospital.repository.DoctorTimeSlotRepository;
import com.hospital.repository.PatientRepository;

@Service
public class AppointmentService {
	
	private final DoctorTimeSlotRepository doctorTimeSlotRepository;
	private final AppointmentRepository appointmentRepository;
	private final PatientRepository patientRepository;
	private final DoctorRepository doctorRepository;
	private final NotificationService notificationService;

	public AppointmentService(DoctorTimeSlotRepository doctorTimeSlotRepository, 
			AppointmentRepository appointmentRepository,
			PatientRepository patientRepository,
			DoctorRepository doctorRepository,
			NotificationService notificationService) {
		this.doctorTimeSlotRepository = doctorTimeSlotRepository;
		this.appointmentRepository = appointmentRepository;
		this.patientRepository = patientRepository;
		this.doctorRepository = doctorRepository;
		this.notificationService = notificationService;
	}
	
	public List<AppointmentResponse.AppointmentData> getAllAppointment() {
		List<Appointment> apts = appointmentRepository.findAll();
		
		return apts.stream().map( 
				apt -> {
					Optional<Patient> patientOpt = patientRepository.findById(apt.getPatientId());
					Optional<Doctor> doctorOpt = doctorRepository.findById(apt.getDoctorId());
					
					Patient patient = patientOpt.get();
					Doctor doctor = doctorOpt.get();
					
					AppointmentResponse.PatientBasicInfo patientInfo = new AppointmentResponse.PatientBasicInfo(patient.getId(), patient.getName(), patient.getPatientId());
					AppointmentResponse.DoctorBasicInfo  doctorInfo = new AppointmentResponse.DoctorBasicInfo(doctor.getId(), doctor.getName(), doctor.getSpecialization());
					
					return  new AppointmentResponse.AppointmentData(
							apt.getId(),
							apt.getAppointmentId(),
							patientInfo,
							doctorInfo,
							apt.getAppointmentDate(),
							apt.getAppointmentTime(),
							apt.getDuration(),
							apt.getReason(),
							apt.getStatus(),
							apt.getCreatedAt()
							);
		}).collect(Collectors.toList());
	}
	
	public AppointmentResponse.AppointmentData getAptById(Long id){
		
		Optional<Appointment> aptOpt = appointmentRepository.findById(id);
		
		if(!aptOpt.isPresent()) {
			return null;
		}
		
		Appointment apt = aptOpt.get();
		
		Optional<Patient> patientOpt = patientRepository.findById(apt.getPatientId());
		Optional<Doctor> doctorOpt = doctorRepository.findById(apt.getDoctorId());
		
		Patient patient = patientOpt.get();
		Doctor doctor = doctorOpt.get();
		
		AppointmentResponse.PatientBasicInfo patientInfo = new AppointmentResponse.PatientBasicInfo(patient.getId(), patient.getName(), patient.getPatientId());
		AppointmentResponse.DoctorBasicInfo  doctorInfo = new AppointmentResponse.DoctorBasicInfo(doctor.getId(), doctor.getName(), doctor.getSpecialization());
		
	    return new AppointmentResponse.AppointmentData(
				apt.getId(),
				apt.getAppointmentId(),
				patientInfo,
				doctorInfo,
				apt.getAppointmentDate(),
				apt.getAppointmentTime(),
				apt.getDuration(),
				apt.getReason(),
				apt.getStatus(),
				apt.getCreatedAt()
				);
	}
	
	public AppointmentResponse bookAppointment(AppointmentRequest request) {
		Long patientId = request.getPatientId();
		Long doctorId = request.getDoctorId();
		
		
		Patient patient = validateAndGetPatient(patientId);
		if (patient == null) {
			return new AppointmentResponse(false, "Patient not found");
		}
		
		Doctor doctor = validateAndGetDoctor(doctorId);
		if (doctor == null) {
			return new AppointmentResponse(false, "Doctor not found");
		}
		
		Date normalizedDate = normalizeDate(request.getDate());
		
		DoctorTimeSlot slot = validateAndBookTimeSlot(doctorId, normalizedDate, request.getTime());
		if (slot == null) {
			return new AppointmentResponse(false, "Time slot not available");
		}
		
		Appointment appointment = new Appointment();
		appointment.setAppointmentId(generateAppointmentId());
		appointment.setPatientId(patientId);
		appointment.setDoctorId(doctorId);
		appointment.setDoctorName(doctor.getName());
		appointment.setAppointmentDate(normalizedDate);
		appointment.setAppointmentTime(request.getTime());
		appointment.setDuration(request.getDuration() != null ? request.getDuration() : 30);
		appointment.setReason(request.getReason());
		appointment.setStatus("Scheduled");
		appointment.setNotes(request.getNotes());
		appointment.setCreatedAt(new Date());
		appointment.setUpdatedAt(new Date());
		
		Appointment savedAppointment = appointmentRepository.save(appointment);
		AppointmentData appointmentData = buildAppointmentData(savedAppointment, patient, doctor);
		
		// Send email notification to patient
		sendAppointmentConfirmationEmail(patient, doctor, savedAppointment);
		
		return new AppointmentResponse(true, "Appointment created successfully", appointmentData);
	}
	
	public AppointmentResponse updateAppointment(Long id, AppointmentUpdateRequest request) {
		Optional<Appointment> aptOpt = appointmentRepository.findById(id);
		if (!aptOpt.isPresent()) {
			return new AppointmentResponse(false, "Appointment not found");
		}
		
		Appointment apt = aptOpt.get();
		boolean isRescheduled = false;
		
		if (request.getDate() != null || request.getTime() != null) {
			Date newDate = request.getDate() != null ? normalizeDate(request.getDate()) : apt.getAppointmentDate();
			String newTime = request.getTime() != null ? request.getTime() : apt.getAppointmentTime();
			Long doctorId = request.getDoctorId() != null ? request.getDoctorId().longValue() : apt.getDoctorId();
			
			boolean dateChanged = !newDate.equals(apt.getAppointmentDate());
			boolean timeChanged = !newTime.equals(apt.getAppointmentTime());
			
			if (dateChanged || timeChanged) {
				isRescheduled = true;
				
				DoctorTimeSlot newSlot = validateAndBookTimeSlot(doctorId, newDate, newTime);
				if (newSlot == null) {
					return new AppointmentResponse(false, "Time slot not available");
				}
				
				releaseTimeSlot(apt.getDoctorId(), apt.getAppointmentDate(), apt.getAppointmentTime());
				
				apt.setAppointmentDate(newDate);
				apt.setAppointmentTime(newTime);
			}
		}
		
		if (request.getStatus() != null) {
			apt.setStatus(request.getStatus());
		} else if (isRescheduled) {
			apt.setStatus("Rescheduled");
		}
		
		if (request.getNotes() != null) {
			apt.setNotes(request.getNotes());
		}
		
		if (request.getDoctorId() != null) {
			apt.setDoctorId(request.getDoctorId().longValue());
			Doctor doctor = validateAndGetDoctor(request.getDoctorId().longValue());
			if (doctor != null) {
				apt.setDoctorName(doctor.getName());
			}
		}
		
		apt.setUpdatedAt(new Date());
		Appointment updatedApt = appointmentRepository.save(apt);
		
		Patient patient = validateAndGetPatient(updatedApt.getPatientId());
		Doctor doctor = validateAndGetDoctor(updatedApt.getDoctorId());
		
		if (patient == null || doctor == null) {
			return new AppointmentResponse(false, "Patient or doctor not found");
		}
		
		// Send email notification for status change or reschedule
		if (isRescheduled) {
			sendAppointmentRescheduleEmail(patient, doctor, updatedApt);
		} else if (request.getStatus() != null) {
			sendAppointmentStatusChangeEmail(patient, doctor, updatedApt);
		}
		
		AppointmentData appointmentData = buildAppointmentData(updatedApt, patient, doctor);
		return new AppointmentResponse(true, "Appointment updated successfully", appointmentData);
	}
	
	public AppointmentResponse deleteAppointment(Long id) {
		Optional<Appointment> aptOpt = appointmentRepository.findById(id);
		if (!aptOpt.isPresent()) {
			return new AppointmentResponse(false, "Appointment not found");
		}
		
		Appointment apt = aptOpt.get();
		
		releaseTimeSlot(apt.getDoctorId(), apt.getAppointmentDate(), apt.getAppointmentTime());
		
		appointmentRepository.deleteById(id);
		
		return new AppointmentResponse(true, "Appointment deleted successfully");
	}

	private Patient validateAndGetPatient(Long patientId) {
		Optional<Patient> patientOpt = patientRepository.findById(patientId);
		return patientOpt.orElse(null);
	}
	
	private Doctor validateAndGetDoctor(Long doctorId) {
		Optional<Doctor> doctorOpt = doctorRepository.findById(doctorId);
		return doctorOpt.orElse(null);
	}
	
	private DoctorTimeSlot validateAndBookTimeSlot(Long doctorId, Date date, String time) {
		String timeSlot = extractTimeSlot(time);
		System.out.println("date 1===>"+ date);
		Date normalizedDate = normalizeDate(date);
		System.out.println("date 2===>"+ normalizedDate);
		System.out.println("=== BOOKING SLOT: DoctorId=" + doctorId + ", Date=" + normalizedDate + ", Time=" + time + ", Extracted TimeSlot=" + timeSlot + " ===");
		
		Optional<DoctorTimeSlot> slotOpt = doctorTimeSlotRepository
			.findByDoctorIdAndDateAndTimeSlot(doctorId, normalizedDate, timeSlot);
		
		if (!slotOpt.isPresent()) {
			System.out.println("=== SLOT NOT FOUND in database ===");
			List<DoctorTimeSlot> allSlotsForDate = doctorTimeSlotRepository.findByDoctorIdAndDate(doctorId, normalizedDate);
			System.out.println("=== Available slots for this date: " + allSlotsForDate.size() + " ===");
			for (DoctorTimeSlot s : allSlotsForDate) {
				System.out.println("    Slot: " + s.getTimeSlot() + " (Available: " + s.getIsAvailable() + ")");
			}
			return null;
		}
		
		DoctorTimeSlot slot = slotOpt.get();
		System.out.println("=== SLOT FOUND: ID=" + slot.getId() + ", IsAvailable=" + slot.getIsAvailable() + " ===");
		
		if (!slot.getIsAvailable()) {
			System.out.println("=== SLOT NOT AVAILABLE (already booked) ===");
			return null;
		}
		
		slot.setIsAvailable(false);
		slot.setUpdatedAt(new Date());
		DoctorTimeSlot savedSlot = doctorTimeSlotRepository.save(slot);
		System.out.println("=== SLOT BOOKED SUCCESSFULLY ===");
		return savedSlot;
	}
	
	private void releaseTimeSlot(Long doctorId, Date date, String time) {
		String timeSlot = extractTimeSlot(time);
		
		Optional<DoctorTimeSlot> slotOpt = doctorTimeSlotRepository
			.findByDoctorIdAndDateAndTimeSlot(doctorId, date, timeSlot);
		
		if (slotOpt.isPresent()) {
			DoctorTimeSlot slot = slotOpt.get();
			slot.setIsAvailable(true);
			slot.setUpdatedAt(new Date());
			doctorTimeSlotRepository.save(slot);
			System.out.println("=== SLOT RELEASED: DoctorId=" + doctorId + ", Date=" + date + ", TimeSlot=" + timeSlot + " ===");
		}
	}

	private Date normalizeDate(Date date) {
		if (date == null) {
			return null;
		}
		java.util.Calendar cal = java.util.Calendar.getInstance();
		cal.setTime(date);
		cal.set(java.util.Calendar.HOUR_OF_DAY, 0);
		cal.set(java.util.Calendar.MINUTE, 0);
		cal.set(java.util.Calendar.SECOND, 0);
		cal.set(java.util.Calendar.MILLISECOND, 0);
		return cal.getTime();
	}
	
	private AppointmentData buildAppointmentData(Appointment appointment, Patient patient, Doctor doctor) {
		PatientBasicInfo patientInfo = new PatientBasicInfo(
			patient.getId(), 
			patient.getName(), 
			patient.getPatientId()
		);
		
		DoctorBasicInfo doctorInfo = new DoctorBasicInfo(
			doctor.getId(), 
			doctor.getName(), 
			doctor.getSpecialization()
		);
		
		System.out.println("apptdate-===>"+ appointment.getAppointmentDate());
		return new AppointmentData(
			appointment.getId(),
			appointment.getAppointmentId(),
			patientInfo,
			doctorInfo,
			appointment.getAppointmentDate(),
			appointment.getAppointmentTime(),
			appointment.getDuration(),
			appointment.getReason(),
			appointment.getStatus(),
			appointment.getCreatedAt()
		);
	}
	
	private String generateAppointmentId() {
		Long count = appointmentRepository.count();
		
		String maxId = "APT000";
		try {
			List<Appointment> allAppointments = appointmentRepository.findAll();
			int maxNumber = 0;
			
			for (Appointment apt : allAppointments) {
				String aptId = apt.getAppointmentId();
				if (aptId != null && aptId.startsWith("APT")) {
					try {
						int number = Integer.parseInt(aptId.substring(3));
						if (number > maxNumber) {
							maxNumber = number;
						}
					} catch (NumberFormatException e) {
					}
				}
			}
			
			return String.format("APT%03d", maxNumber + 1);
			
		} catch (Exception e) {
			return String.format("APT%03d", count + 1);
		}
	}
	
	private String extractTimeSlot(String time) {
		if (time == null) {
			return null;
		}
//		String[] parts = time.split(" ");
//		String timeOnly = parts[0]; 
//		return timeOnly;
		return time.split(" ")[0];
	}
	
	public List<Appointment> getAppointmentsByDate(Long id, Date date) {
		Date normalizedDate = normalizeDate(date);
		return appointmentRepository.findByDoctorIdAndAppointmentDate(id, normalizedDate);	
	}
	
	// Email notification methods
	private void sendAppointmentConfirmationEmail(Patient patient, Doctor doctor, Appointment appointment) {
		try {
			String subject = "Appointment Confirmation - " + appointment.getAppointmentId();
			String htmlBody = buildAppointmentConfirmationEmailHtml(patient, doctor, appointment);
			notificationService.sendHtmlEmail(patient.getEmail(), subject, htmlBody);
		} catch (Exception e) {
			System.err.println("Failed to send confirmation email: " + e.getMessage());
		}
	}
	
	private void sendAppointmentRescheduleEmail(Patient patient, Doctor doctor, Appointment appointment) {
		try {
			String subject = "Appointment Rescheduled - " + appointment.getAppointmentId();
			String htmlBody = buildAppointmentRescheduleEmailHtml(patient, doctor, appointment);
			notificationService.sendHtmlEmail(patient.getEmail(), subject, htmlBody);
		} catch (Exception e) {
			System.err.println("Failed to send reschedule email: " + e.getMessage());
		}
	}
	
	private void sendAppointmentStatusChangeEmail(Patient patient, Doctor doctor, Appointment appointment) {
		try {
			String subject = "Appointment Status Update - " + appointment.getAppointmentId();
			String htmlBody = buildAppointmentStatusChangeEmailHtml(patient, doctor, appointment);
			notificationService.sendHtmlEmail(patient.getEmail(), subject, htmlBody);
		} catch (Exception e) {
			System.err.println("Failed to send status change email: " + e.getMessage());
		}
	}
	
	private String buildAppointmentConfirmationEmailHtml(Patient patient, Doctor doctor, Appointment appointment) {
		return String.format("""
			<!DOCTYPE html>
			<html>
			<head>
				<style>
					body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
					.container { max-width: 600px; margin: 0 auto; padding: 20px; }
					.header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; }
					.content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
					.details { margin: 20px 0; }
					.detail-row { padding: 10px 0; border-bottom: 1px solid #eee; }
					.label { font-weight: bold; color: #555; }
					.footer { text-align: center; padding: 20px; color: #777; font-size: 12px; }
				</style>
			</head>
			<body>
				<div class="container">
					<div class="header">
						<h1>Appointment Confirmed</h1>
					</div>
					<div class="content">
						<p>Dear %s,</p>
						<p>Your appointment has been successfully scheduled.</p>
						<div class="details">
							<div class="detail-row">
								<span class="label">Appointment ID:</span> %s
							</div>
							<div class="detail-row">
								<span class="label">Doctor:</span> Dr. %s (%s)
							</div>
							<div class="detail-row">
								<span class="label">Date:</span> %s
							</div>
							<div class="detail-row">
								<span class="label">Time:</span> %s
							</div>
							<div class="detail-row">
								<span class="label">Duration:</span> %d minutes
							</div>
							<div class="detail-row">
								<span class="label">Reason:</span> %s
							</div>
						</div>
						<p><strong>Please arrive 10 minutes before your scheduled time.</strong></p>
					</div>
					<div class="footer">
						<p>Hospital Management System</p>
						<p>This is an automated email. Please do not reply.</p>
					</div>
				</div>
			</body>
			</html>
			""",
			patient.getName(),
			appointment.getAppointmentId(),
			doctor.getName(),
			doctor.getSpecialization(),
			appointment.getAppointmentDate().toString(),
			appointment.getAppointmentTime(),
			appointment.getDuration(),
			appointment.getReason()
		);
	}
	
	private String buildAppointmentRescheduleEmailHtml(Patient patient, Doctor doctor, Appointment appointment) {
		return String.format("""
			<!DOCTYPE html>
			<html>
			<head>
				<style>
					body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
					.container { max-width: 600px; margin: 0 auto; padding: 20px; }
					.header { background-color: #FF9800; color: white; padding: 20px; text-align: center; }
					.content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
					.details { margin: 20px 0; }
					.detail-row { padding: 10px 0; border-bottom: 1px solid #eee; }
					.label { font-weight: bold; color: #555; }
					.footer { text-align: center; padding: 20px; color: #777; font-size: 12px; }
				</style>
			</head>
			<body>
				<div class="container">
					<div class="header">
						<h1>Appointment Rescheduled</h1>
					</div>
					<div class="content">
						<p>Dear %s,</p>
						<p>Your appointment has been rescheduled to a new date/time.</p>
						<div class="details">
							<div class="detail-row">
								<span class="label">Appointment ID:</span> %s
							</div>
							<div class="detail-row">
								<span class="label">Doctor:</span> Dr. %s (%s)
							</div>
							<div class="detail-row">
								<span class="label">New Date:</span> %s
							</div>
							<div class="detail-row">
								<span class="label">New Time:</span> %s
							</div>
							<div class="detail-row">
								<span class="label">Duration:</span> %d minutes
							</div>
						</div>
						<p><strong>Please arrive 10 minutes before your scheduled time.</strong></p>
					</div>
					<div class="footer">
						<p>Hospital Management System</p>
						<p>This is an automated email. Please do not reply.</p>
					</div>
				</div>
			</body>
			</html>
			""",
			patient.getName(),
			appointment.getAppointmentId(),
			doctor.getName(),
			doctor.getSpecialization(),
			appointment.getAppointmentDate().toString(),
			appointment.getAppointmentTime(),
			appointment.getDuration()
		);
	}
	
	private String buildAppointmentStatusChangeEmailHtml(Patient patient, Doctor doctor, Appointment appointment) {
		return String.format("""
			<!DOCTYPE html>
			<html>
			<head>
				<style>
					body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
					.container { max-width: 600px; margin: 0 auto; padding: 20px; }
					.header { background-color: #2196F3; color: white; padding: 20px; text-align: center; }
					.content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
					.details { margin: 20px 0; }
					.detail-row { padding: 10px 0; border-bottom: 1px solid #eee; }
					.label { font-weight: bold; color: #555; }
					.status { font-size: 18px; color: #2196F3; font-weight: bold; }
					.footer { text-align: center; padding: 20px; color: #777; font-size: 12px; }
				</style>
			</head>
			<body>
				<div class="container">
					<div class="header">
						<h1>Appointment Status Update</h1>
					</div>
					<div class="content">
						<p>Dear %s,</p>
						<p>Your appointment status has been updated.</p>
						<div class="details">
							<div class="detail-row">
								<span class="label">Appointment ID:</span> %s
							</div>
							<div class="detail-row">
								<span class="label">Doctor:</span> Dr. %s (%s)
							</div>
							<div class="detail-row">
								<span class="label">Date:</span> %s
							</div>
							<div class="detail-row">
								<span class="label">Time:</span> %s
							</div>
							<div class="detail-row">
								<span class="label">New Status:</span> <span class="status">%s</span>
							</div>
						</div>
					</div>
					<div class="footer">
						<p>Hospital Management System</p>
						<p>This is an automated email. Please do not reply.</p>
					</div>
				</div>
			</body>
			</html>
			""",
			patient.getName(),
			appointment.getAppointmentId(),
			doctor.getName(),
			doctor.getSpecialization(),
			appointment.getAppointmentDate().toString(),
			appointment.getAppointmentTime(),
			appointment.getStatus()
		);
	}
}
