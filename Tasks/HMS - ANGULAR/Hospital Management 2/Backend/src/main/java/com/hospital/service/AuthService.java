package com.hospital.service;

import org.springframework.stereotype.Service;

import com.hospital.dto.LoginRequest;
import com.hospital.dto.LoginResponse;
import com.hospital.model.Admin;
import com.hospital.model.Doctor;
import com.hospital.model.Nurse;
import com.hospital.model.Patient;
import com.hospital.security.JwtUtil;

@Service
public class AuthService {
	private final AdminService adminService;
	private final DoctorService doctorService;
	private final PatientService patientService;
	private final NurseService nurseService;
	private final JwtUtil jwtUtil;
	
	public AuthService(AdminService adminService, JwtUtil jwtUtil, DoctorService doctorService, NurseService nurseService, PatientService patientService) {
		this.adminService = adminService;
		this.jwtUtil = jwtUtil;
		this.doctorService = doctorService;
		this.patientService = patientService;
		this.nurseService =  nurseService;
	}
	public LoginResponse login(LoginRequest request) {
		String userName = request.getUsername();
		String password = request.getPassword();
		String role = request.getRole();
		switch(role) {
		case "Admin":
			Admin admin = adminService.findByUsername(userName);
			if(admin!=null && admin.getPassword().equals(password)) {
				String token = jwtUtil.generateToken(admin.getUsername(), role, admin.getName());
				return new LoginResponse(token, admin.getId(), admin.getUsername(), admin.getName(), admin.getEmail(),role);
			}
			else
				return new LoginResponse(false , null, null,"Invalid credentials");
		case "Doctor": 
			Doctor doctor = doctorService.findByUsername(userName);
			if(doctor != null && doctor.getPassword().equals(password)) {
				String token = jwtUtil.generateToken(doctor.getUsername(), role, doctor.getName());
				return new LoginResponse(token, doctor.getId(), doctor.getUsername(), doctor.getName(), doctor.getEmail(),role);
			}
			else 
				return new LoginResponse(false , null, null,"Invalid credentials");
		case "Nurse":
			Nurse nurse  = nurseService.findByUsername(userName);
			if(nurse != null && nurse.getPassword().equals(password)) {
				String token = jwtUtil.generateToken(nurse.getUsername(), role, nurse.getName());
				return new LoginResponse(token, nurse.getId(), nurse.getUsername(), nurse.getName(), nurse.getEmail(), role);
			}
			else
				return new LoginResponse(false, null, null, "Invalid credentials");
			
		case "Patient":
			Patient patient = patientService.findByUsername(userName);
			if(patient != null && patient.getPassword().equals(password)) {
				String token = jwtUtil.generateToken(patient.getUsername(), role, patient.getName());
				return new LoginResponse(token, patient.getId(), patient.getUsername(), patient.getName(), patient.getEmail(), role);
			}
			else
				return new LoginResponse(false, null, null, "Invalid credentials");
		default:
			throw new RuntimeException("Invalid Role");
		}

    }
}
