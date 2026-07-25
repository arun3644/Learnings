package com.hospital.service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hospital.dto.AppointmentInfo;
import com.hospital.dto.DoctorRegisterRequest;
import com.hospital.dto.DoctorRegisterResponse;
import com.hospital.dto.DoctorResponse;
import com.hospital.dto.DoctorUpdateRequest;
import com.hospital.dto.PatientResponse;
import com.hospital.model.Appointment;
import com.hospital.model.Doctor;
import com.hospital.model.DoctorTimeSlot;
import com.hospital.model.Patient;
import com.hospital.repository.AppointmentRepository;
import com.hospital.repository.DoctorRepository;
import com.hospital.repository.DoctorTimeSlotRepository;
import com.hospital.repository.PatientRepository;
import com.hospital.security.JwtUtil;

@Service
public class DoctorService {
	
	private final DoctorRepository doctorRepository;
	private final JwtUtil jwtUtil;
	private final DoctorTimeSlotRepository doctorTimeSlotRepository;
	private final AppointmentRepository appointmentRepository;
	private final PatientRepository patientRepository;
	private final JdbcTemplate jdbcTemplate;
	
	public DoctorService(DoctorRepository doctorRepository, JwtUtil jwtUtil, DoctorTimeSlotRepository doctorTimeSlotRepository,
			AppointmentRepository appointmentRepository, PatientRepository patientRepository, JdbcTemplate jdbcTemplate) {
		this.doctorRepository = doctorRepository;
		this.jwtUtil = jwtUtil;
		this.doctorTimeSlotRepository = doctorTimeSlotRepository;
		this.appointmentRepository = appointmentRepository;
		this.patientRepository = patientRepository;
		this.jdbcTemplate = jdbcTemplate;
	}
	
	public DoctorRegisterResponse register(DoctorRegisterRequest request) {
		
		if (doctorRepository.existsByUsername(request.getUsername())) 
			return DoctorRegisterResponse.error("Username already exists");
		
		if (doctorRepository.existsByEmail(request.getEmail()))
			return DoctorRegisterResponse.error("Email already exists");
		
		Doctor newDoctor = new Doctor();
		newDoctor.setUsername(request.getUsername());
		newDoctor.setEmail(request.getEmail());
		newDoctor.setName(request.getName());
		newDoctor.setPassword(request.getPassword());
		newDoctor.setSpecialization(request.getSpecialization());
		newDoctor.setYearsOfExperience(request.getYearsOfExperience());
		newDoctor.setPhoneNumber(request.getPhoneNumber());
		newDoctor.setLicenseNumber(request.getLicenseNumber());
		
		Doctor savedDoctor = doctorRepository.save(newDoctor);
		
		Date today = new Date();
		String[] slotTimes = {"09:00", "09:30", "10:00", "10:30", "11:00", "11:30"};
		List<Object[]> batchArgs = new java.util.ArrayList<>();
		Date now = new Date();

		for (int day = 0; day < 30; day++) {
			Date date = addDays(today, day);
			for (String slot : slotTimes) {
				batchArgs.add(new Object[]{ savedDoctor.getId(), date, slot, true, now, now });
			}
		}

		jdbcTemplate.batchUpdate(
			"INSERT INTO doctor_time_slots (doctor_id, date, time_slot, is_available, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)",
			batchArgs
		);
		
		String token = jwtUtil.generateToken(savedDoctor.getUsername(), "Doctor", savedDoctor.getName());
		
		DoctorRegisterResponse.DoctorInfo doctorInfo = new DoctorRegisterResponse.DoctorInfo(
			savedDoctor.getId(),
			savedDoctor.getUsername(),
			"Doctor",
			savedDoctor.getName(),
			savedDoctor.getEmail(),
			savedDoctor.getSpecialization(),
			savedDoctor.getYearsOfExperience(),
			savedDoctor.getPhoneNumber()
		);
		
		return new DoctorRegisterResponse(true, "Doctor registered successfully", token, doctorInfo);
	}
	
	public Doctor findByUsername(String username) {
		return doctorRepository.findByUsername(username).orElse(null);
	}
	
	public List<DoctorResponse> getAllDoctors() {
		List<Doctor> doctors = doctorRepository.findAll();
		return doctors.stream()
			.map(doctor -> new DoctorResponse(
				doctor.getId(),
				doctor.getUsername(),
				doctor.getName(),
				doctor.getEmail(),
				doctor.getSpecialization(),
				doctor.getYearsOfExperience(),
				doctor.getPhoneNumber(),
				doctor.getCreatedAt() != null ? doctor.getCreatedAt().toString() : null,
				doctor.getUpdatedAt() != null ? doctor.getUpdatedAt().toString() : null
			))
			.collect(Collectors.toList());
	}
	
	public DoctorResponse getDoctorById(Long id) {
		Optional<Doctor> doctorOpt = doctorRepository.findById(id);
		if (!doctorOpt.isPresent()) {
			return new DoctorResponse("Error", "Doctor not found with Id: " + id);
		}
		
		Doctor doctor = doctorOpt.get();
		DoctorResponse response = new DoctorResponse(
			doctor.getId(),
			doctor.getUsername(),
			doctor.getName(),
			doctor.getEmail(),
			doctor.getSpecialization(),
			doctor.getYearsOfExperience(),
			doctor.getPhoneNumber(),
			doctor.getCreatedAt() != null ? doctor.getCreatedAt().toString() : null,
			doctor.getUpdatedAt() != null ? doctor.getUpdatedAt().toString() : null
		);
		
		List<Appointment> appointments = appointmentRepository.findByDoctorId(doctor.getId());
		List<AppointmentInfo> appointmentInfos = appointments.stream()
			.map(apt -> {
				Optional<Patient> patientOpt = patientRepository.findById(apt.getPatientId());
				Patient patient = patientOpt.get();
				PatientResponse patientInfo = new PatientResponse(patient.getId(), patient.getPatientId(), patient.getUsername());
				
				AppointmentInfo info = new AppointmentInfo();
				info.setPatientResponse(patientInfo);
				info.setId(apt.getId());
				info.setAppointmentId(apt.getAppointmentId());
				info.setAppointmentDate(apt.getAppointmentDate());
				info.setTime(apt.getAppointmentTime());
				info.setStatus(apt.getStatus());
				info.setDuration(apt.getDuration());
				info.setReason(apt.getReason());
				info.setPatientId(apt.getPatientId());
				info.setDoctorId(apt.getDoctorId());
				info.setCreatedAt(apt.getCreatedAt());
				info.setUpdatedAt(apt.getUpdatedAt());
				return info;
			})
			.collect(Collectors.toList());
		
		response.setAppointments(appointmentInfos);
		return response;
	}
	
	public DoctorResponse updateDoctor(Long id, DoctorUpdateRequest request) {
		Optional<Doctor> doctorOpt = doctorRepository.findById(id);
		if (!doctorOpt.isPresent()) {
			return new DoctorResponse("Error", "Doctor not found with Id: " + id);
		}
		
		Doctor doctor = doctorOpt.get();
		
		if (request.getName() != null) {
			doctor.setName(request.getName());
		}
		if (request.getEmail() != null) {
			doctor.setEmail(request.getEmail());
		}
		if (request.getSpecialization() != null) {
			doctor.setSpecialization(request.getSpecialization());
		}
		if (request.getYearsOfExperience() != null) {
			doctor.setYearsOfExperience(request.getYearsOfExperience());
		}
		if (request.getPhoneNumber() != null) {
			doctor.setPhoneNumber(request.getPhoneNumber());
		}
		
		Doctor updatedDoctor = doctorRepository.save(doctor);
		
		return new DoctorResponse(
			updatedDoctor.getId(),
			updatedDoctor.getUsername(),
			updatedDoctor.getName(),
			updatedDoctor.getEmail(),
			updatedDoctor.getSpecialization(),
			updatedDoctor.getYearsOfExperience(),
			updatedDoctor.getPhoneNumber(),
			updatedDoctor.getCreatedAt() != null ? updatedDoctor.getCreatedAt().toString() : null,
			updatedDoctor.getUpdatedAt() != null ? updatedDoctor.getUpdatedAt().toString() : null
		);
	}
	
	public DoctorResponse deleteDoctor(Long id) {
		Optional<Doctor> doctorOpt = doctorRepository.findById(id);
		if (!doctorOpt.isPresent()) {
			return new DoctorResponse("Error", "Doctor not found with Id: " + id);
		}
		
		doctorRepository.deleteById(id);
		return new DoctorResponse("Success", "Doctor deleted successfully");
	}
	
	public List<DoctorTimeSlot> getAvailableTimeSlots(Long doctorId, Date date) {
		Date normalizedDate = normalizeDate(date);
		return doctorTimeSlotRepository.findByDoctorIdAndDateAndIsAvailable(doctorId, normalizedDate, true);
	}
	
	public List<DoctorTimeSlot> getBookedSlots(Long doctorId, Date date){
		Date normalizedDate = normalizeDate(date);
		return doctorTimeSlotRepository.findByDoctorIdAndDateAndIsAvailable(doctorId, normalizedDate, false);
	}
	public List<AppointmentInfo> getDoctorAppointments(Long doctorId) {
		List<Appointment> appointments = appointmentRepository.findByDoctorId(doctorId);
		return appointments.stream()
			.map(apt -> {
				Optional<Patient> patientOpt = patientRepository.findById(apt.getPatientId());
				Patient patient = patientOpt.get();
				PatientResponse patientInfo = new PatientResponse(patient.getId(), patient.getPatientId(), patient.getUsername());
				
				AppointmentInfo info = new AppointmentInfo();
				info.setPatientResponse(patientInfo);
				info.setId(apt.getId());
				info.setAppointmentId(apt.getAppointmentId());
				info.setAppointmentDate(apt.getAppointmentDate());
				info.setTime(apt.getAppointmentTime());
				info.setStatus(apt.getStatus());
				info.setDuration(apt.getDuration());
				info.setReason(apt.getReason());
				info.setPatientId(apt.getPatientId());
				info.setDoctorId(apt.getDoctorId());
				info.setCreatedAt(apt.getCreatedAt());
				info.setUpdatedAt(apt.getUpdatedAt());
				return info;
			})
			.collect(Collectors.toList());
	}
	
	public List<DoctorTimeSlot> getAllDoctorSlots(Long doctorId) {
		return doctorTimeSlotRepository.findByDoctorId(doctorId);
	}
	
	@Transactional
	public String generateSlotsForDoctor(Long doctorId) {
		Optional<Doctor> doctorOpt = doctorRepository.findById(doctorId);
		if (!doctorOpt.isPresent()) {
			return "Doctor not found with ID: " + doctorId;
		}
		
		List<DoctorTimeSlot> existingSlots = doctorTimeSlotRepository.findByDoctorId(doctorId);
		if (!existingSlots.isEmpty()) {
			doctorTimeSlotRepository.deleteAll(existingSlots);
			doctorTimeSlotRepository.flush();
		}
		
		Date today = normalizeDate(new Date());
		int slotsGenerated = 0;
		
		for (int day = 0; day < 30; day++) {
			Date date = addDays(today, day);
			
			String[] slots = {"09:00", "09:30", "10:00", "10:30", "11:00", "11:30"};
			
			for (String slot : slots) {
				if (!doctorTimeSlotRepository.existsByDoctorIdAndDateAndTimeSlot(doctorId, date, slot)) {
					DoctorTimeSlot timeSlot = new DoctorTimeSlot();
					timeSlot.setDoctorId(doctorId);
					timeSlot.setDate(date);
					timeSlot.setTimeSlot(slot);
					timeSlot.setIsAvailable(true);
					timeSlot.setCreatedAt(new Date());
					timeSlot.setUpdatedAt(new Date());
					
					doctorTimeSlotRepository.save(timeSlot);
					slotsGenerated++;
				}
			}
		}
		
		return "Generated " + slotsGenerated + " time slots for doctor ID: " + doctorId;
	}
	
	private Date addDays(Date date, int days) {
	    Calendar calendar = Calendar.getInstance();
	    calendar.setTime(date);
	    calendar.add(Calendar.DAY_OF_MONTH, days);
	    return normalizeDate(calendar.getTime());
	}
	
	private Date normalizeDate(Date date) {
		if (date == null) {
			return null;
		}
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.set(Calendar.HOUR_OF_DAY, 0);
		cal.set(Calendar.MINUTE, 0);
		cal.set(Calendar.SECOND, 0);
		cal.set(Calendar.MILLISECOND, 0);
		return cal.getTime();
	}
}


