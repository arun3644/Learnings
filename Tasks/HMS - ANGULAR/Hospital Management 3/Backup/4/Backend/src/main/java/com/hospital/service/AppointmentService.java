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
	private final SnsNotificationService snsNotificationService;

	public AppointmentService(DoctorTimeSlotRepository doctorTimeSlotRepository, 
			AppointmentRepository appointmentRepository,
			PatientRepository patientRepository,
			DoctorRepository doctorRepository,
			SnsNotificationService snsNotificationService) {
		this.doctorTimeSlotRepository = doctorTimeSlotRepository;
		this.appointmentRepository = appointmentRepository;
		this.patientRepository = patientRepository;
		this.doctorRepository = doctorRepository;
		this.snsNotificationService = snsNotificationService;
	}
	
	public List<AppointmentResponse.AppointmentData> getAllAppointment() {
		List<Appointment> apts = appointmentRepository.findAll();
		
		return apts.stream().filter(apt -> {
					Optional<Doctor> doctorOpt = doctorRepository.findById(apt.getDoctorId());
					Optional<Patient> patientOpt = patientRepository.findById(apt.getPatientId());
					return doctorOpt.isPresent() && patientOpt.isPresent();
				}).map( 
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
		
		try {
			snsNotificationService.sendAppointmentConfirmation(savedAppointment, patient, doctor);
		} catch (Exception e) {
			System.err.println("Failed to send SNS notification: " + e.getMessage());
		}
		
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
		
		AppointmentData appointmentData = buildAppointmentData(updatedApt, patient, doctor);
		return new AppointmentResponse(true, "Appointment updated successfully", appointmentData);
	}
	
	public AppointmentResponse deleteAppointment(Long id) {
		Optional<Appointment> aptOpt = appointmentRepository.findById(id);
		if (!aptOpt.isPresent()) {
			return new AppointmentResponse(false, "Appointment not found");
		}
		
		Appointment apt = aptOpt.get();
		
		Patient patient = validateAndGetPatient(apt.getPatientId());
		Doctor doctor = validateAndGetDoctor(apt.getDoctorId());
		
		releaseTimeSlot(apt.getDoctorId(), apt.getAppointmentDate(), apt.getAppointmentTime());
		
		appointmentRepository.deleteById(id);
		
		if (patient != null && doctor != null) {
			try {
				snsNotificationService.sendAppointmentCancellation(apt, patient, doctor);
			} catch (Exception e) {
				System.err.println("Failed to send cancellation notification: " + e.getMessage());
			}
		}
		
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
		return time.split(" ")[0];
	}
	
	public List<Appointment> getAppointmentsByDate(Long id, Date date) {
		Date normalizedDate = normalizeDate(date);
		return appointmentRepository.findByDoctorIdAndAppointmentDate(id, normalizedDate);	
	}
}
