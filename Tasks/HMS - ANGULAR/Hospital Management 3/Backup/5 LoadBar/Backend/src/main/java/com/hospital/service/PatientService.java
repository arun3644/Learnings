package com.hospital.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.hospital.dto.AppointmentInfo;
import com.hospital.dto.PatientRegisterRequest;
import com.hospital.dto.PatientRegisterResponse;
import com.hospital.dto.PatientResponse;
import com.hospital.dto.PatientUpdateRequest;
import com.hospital.model.Appointment;
import com.hospital.model.Patient;
import com.hospital.repository.AppointmentRepository;
import com.hospital.repository.PatientRepository;
import com.hospital.security.JwtUtil;

@Service
public class PatientService {
	
	private final PatientRepository patientRepository;
	private final JwtUtil jwtUtil;
	private final AppointmentRepository appointmentRepository;
	
	public PatientService(PatientRepository patientRepository, JwtUtil jwtUtil, AppointmentRepository appointmentRepository) {
		this.patientRepository = patientRepository;
		this.jwtUtil = jwtUtil;
		this.appointmentRepository = appointmentRepository;
	}
	
	public PatientRegisterResponse createPatient(PatientRegisterRequest request) {
		
		if (patientRepository.existsByUsername(request.getUsername())) 
			return PatientRegisterResponse.error("Username already exists");
		
		if (patientRepository.existsByEmail(request.getEmail()))
			return PatientRegisterResponse.error("Email already exists");
		
		Patient newPatient = new Patient();
		newPatient.setUsername(request.getUsername());
		newPatient.setEmail(request.getEmail());
		newPatient.setName(request.getName());
		newPatient.setPassword(request.getPassword());
		newPatient.setAge(request.getAge());
		newPatient.setGender(request.getGender());
		newPatient.setPhoneNumber(request.getPhoneNumber());
		newPatient.setBloodGroup(request.getBloodGroup());
		newPatient.setCondition(request.getCondition());
		newPatient.setAddress(request.getAddress());
		newPatient.setCreatedAt(new Date());
		newPatient.setUpdatedAt(new Date());
		newPatient.setPatientId(generatePatientId());
		newPatient.setStatus("Active");
		
		Patient savedPatient = patientRepository.save(newPatient);
		
		String token = jwtUtil.generateToken(savedPatient.getUsername(), "Patient", savedPatient.getName());
		
		PatientRegisterResponse.PatientInfo patientInfo = new PatientRegisterResponse.PatientInfo(
			savedPatient.getId(),
			savedPatient.getUsername(),
			"Patient",
			savedPatient.getName(),
			savedPatient.getEmail(),
			savedPatient.getAge(),
			savedPatient.getGender(),
			savedPatient.getPhoneNumber()
		);
		
		return new PatientRegisterResponse(true, "Patient registered successfully", token, patientInfo);
	}
	
	public List<PatientResponse> getAllPatients() {
		List<Patient> patients = patientRepository.findAll();
		
		return patients.stream()
				.map(patient -> {
					PatientResponse response = new PatientResponse(
						patient.getId(),
						patient.getPatientId(),
						patient.getUsername(),
						patient.getName(),
						patient.getEmail(),
						patient.getAge(),
						patient.getGender(),
						patient.getPhoneNumber(),
						patient.getBloodGroup(),
						patient.getAddress(),
						patient.getStatus(),
						patient.getCreatedAt().toString(),
						patient.getUpdatedAt().toString()
					);
					
					List<Appointment> appointments = appointmentRepository.findByPatientId(patient.getId());
					List<AppointmentInfo> appointmentInfos = appointments.stream()
						    .map(apt -> {
						        AppointmentInfo info = new AppointmentInfo();
						        info.setId(apt.getId());
						        info.setAppointmentId(apt.getAppointmentId());
						        info.setAppointmentDate(apt.getAppointmentDate());
						        info.setTime(apt.getAppointmentTime());
						        info.setDoctorName(apt.getDoctorName());
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
				})
				.collect(Collectors.toList());
	}
	
	public PatientResponse getPatientById(Long id) {
		Optional<Patient> patientOpt = patientRepository.findById(id);
		if(!patientOpt.isPresent())
			return new PatientResponse("Error", "Paitent not found with Id: "+ id);
		
		Patient patient = patientOpt.get();

		PatientResponse  response = new PatientResponse(patient.getId(), patient.getPatientId(), patient.getUsername(), patient.getName(), patient.getEmail(),
				patient.getAge(), patient.getGender(), patient.getPhoneNumber(), patient.getBloodGroup(),
				patient.getAddress(), patient.getStatus(), patient.getCreatedAt().toString(), patient.getUpdatedAt().toString());
		

		List<Appointment> appointments = appointmentRepository.findByPatientId(patient.getId());
		List<AppointmentInfo> appointmentInfos = appointments.stream()
			    .map(apt -> {
			        AppointmentInfo info = new AppointmentInfo();
			        info.setId(apt.getId());
			        info.setAppointmentId(apt.getAppointmentId());
			        info.setAppointmentDate(apt.getAppointmentDate());
			        info.setTime(apt.getAppointmentTime());
			        info.setDoctorName(apt.getDoctorName());
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
	public Patient findByUsername(String username) {
		return patientRepository.findByUsername(username).orElse(null);
	}
	
	public PatientResponse updatePatient(Long id, PatientUpdateRequest request) {
		Optional<Patient> patientOpt = patientRepository.findById(id);
		if (!patientOpt.isPresent()) {
			return new PatientResponse("Error", "Patient not found with Id: " + id);
		}
		
		Patient patient = patientOpt.get();
		
		if (request.getName() != null) {
			patient.setName(request.getName());
		}
		
		if (request.getEmail() != null) {
			patient.setEmail(request.getEmail());
		}
		
		if (request.getAge() != null) {
			patient.setAge(request.getAge());
		}
		
		if (request.getGender() != null) {
			patient.setGender(request.getGender());
		}
		
		if (request.getPhoneNumber() != null) {
			patient.setPhoneNumber(request.getPhoneNumber());
		}
		
		if (request.getBloodGroup() != null) {
			patient.setBloodGroup(request.getBloodGroup());
		}
		
		if (request.getAddress() != null) {
			patient.setAddress(request.getAddress());
		}
		
		if (request.getStatus() != null) {
			patient.setStatus(request.getStatus());
		}
		
		patient.setUpdatedAt(new Date());
		Patient updatedPatient = patientRepository.save(patient);
		
		return new PatientResponse(
			updatedPatient.getId(),
			updatedPatient.getPatientId(),
			updatedPatient.getUsername(),
			updatedPatient.getName(),
			updatedPatient.getEmail(),
			updatedPatient.getAge(),
			updatedPatient.getGender(),
			updatedPatient.getPhoneNumber(),
			updatedPatient.getBloodGroup(),
			updatedPatient.getAddress(),
			updatedPatient.getStatus(),
			updatedPatient.getCreatedAt().toString(),
			updatedPatient.getUpdatedAt().toString()
		);
	}
	
	public PatientResponse deletePatient(Long id) {
		Optional<Patient> patientOpt = patientRepository.findById(id);
		if (!patientOpt.isPresent()) {
			return new PatientResponse("Error", "Patient not found with Id: " + id);
		}
		
		patientRepository.deleteById(id);
		return new PatientResponse("Success", "Patient deleted successfully");
	}
	
	private String generatePatientId() {
		long num = 1;
		String candidate = String.format("PAT%03d", num);
		while (patientRepository.existsByPatientId(candidate)) {
			num++;
			candidate = String.format("PAT%03d", num);
		}
		return candidate;
	}
	

}