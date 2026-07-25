package com.hospital.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.dto.AdminRegisterRequest;
import com.hospital.dto.AdminRegisterResponse;
import com.hospital.dto.DoctorRegisterRequest;
import com.hospital.dto.DoctorRegisterResponse;
import com.hospital.dto.LoginRequest;
import com.hospital.dto.LoginResponse;
import com.hospital.dto.NurseRegisterRequest;
import com.hospital.dto.NurseRegisterResponse;
import com.hospital.dto.PatientRegisterRequest;
import com.hospital.dto.PatientRegisterResponse;
import com.hospital.dto.ValidateTokenRequest;
import com.hospital.dto.ValidateTokenResponse;
import com.hospital.security.JwtUtil;
import com.hospital.service.AdminService;
import com.hospital.service.AuthService;
import com.hospital.service.DoctorService;
import com.hospital.service.NurseService;
import com.hospital.service.PatientService;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/auth")
public class AuthController {
	private AdminService adminService;
	private DoctorService doctorService;
	private NurseService nurseService;
	private PatientService patientService;
	private AuthService authService;
	private JwtUtil jwtUtil;
	
	public AuthController(AdminService adminService, DoctorService doctorService, NurseService nurseService, PatientService patientService, AuthService authService, JwtUtil jwtUtil) {
		this.adminService = adminService;
		this.doctorService = doctorService;
		this.nurseService = nurseService;
		this.patientService = patientService;
		this.authService = authService;
		this.jwtUtil = jwtUtil;
		System.out.println("AuthController initialized with AuthService: " + (authService != null ? "SUCCESS" : "NULL"));
	}
	
	@PostMapping("login")
	public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request){
		try {
			LoginResponse  response = authService.login(request);
			return ResponseEntity.status(200).body(response);
		}
		catch(RuntimeException e) {
			LoginResponse errorResponse = LoginResponse.error(e.getMessage());
			return ResponseEntity.status(400).body(errorResponse);
		}
	}
	
	@PostMapping("register/admin")
	public ResponseEntity<AdminRegisterResponse> register(@Valid @RequestBody AdminRegisterRequest request){
		try {
			AdminRegisterResponse response = adminService.register(request);
			return ResponseEntity.status(200).body(response);
		}
		catch(RuntimeException e) {
			AdminRegisterResponse errorResponse = AdminRegisterResponse.error(e.getMessage());
			return ResponseEntity.status(400).body(errorResponse);
		}
	}
	
	@PostMapping("register/doctor")
	public ResponseEntity<DoctorRegisterResponse> registerDoctor(@Valid @RequestBody DoctorRegisterRequest request){
		try {
			DoctorRegisterResponse response = doctorService.register(request);
			System.out.print("\n\n"+response);
			return ResponseEntity.status(200).body(response);
		}
		catch(RuntimeException e) {
			DoctorRegisterResponse errorResponse = DoctorRegisterResponse.error(e.getMessage());
			return ResponseEntity.status(400).body(errorResponse);
		}
	}
	
	@PostMapping("register/nurse")
	public ResponseEntity<NurseRegisterResponse> registerNurse(@Valid @RequestBody NurseRegisterRequest request){
		try {
			NurseRegisterResponse response = nurseService.register(request);
			return ResponseEntity.status(200).body(response);
		}
		catch(RuntimeException e) {
			NurseRegisterResponse errorResponse = NurseRegisterResponse.error(e.getMessage());
			return ResponseEntity.status(400).body(errorResponse);
		}
	}
	
	@PostMapping("register/patient")
	public ResponseEntity<PatientRegisterResponse> createPatient(@Valid @RequestBody PatientRegisterRequest request){
		try {
			PatientRegisterResponse response = patientService.createPatient(request);
			return ResponseEntity.status(200).body(response);
		}
		catch(RuntimeException e) {
			PatientRegisterResponse errorResponse = PatientRegisterResponse.error(e.getMessage());
			return ResponseEntity.status(400).body(errorResponse);
		}
	}
	
	@PostMapping("/validate")
	public ResponseEntity<ValidateTokenResponse> validateToken(@Valid @RequestBody ValidateTokenRequest request) {
		try {
			String token = request.getToken();
			
			String username = jwtUtil.extractUsername(token);
			String role = jwtUtil.extractRole(token);
			
			if (jwtUtil.validateToken(token, username)) {
				Date expiration = jwtUtil.extractClaims(token).getExpiration();
				long expiresIn = expiration.getTime() - System.currentTimeMillis();
				
				ValidateTokenResponse response = ValidateTokenResponse.success(username, role, expiresIn);
				return ResponseEntity.ok(response);
			} else {
				ValidateTokenResponse errorResponse = ValidateTokenResponse.error("Token is invalid");
				return ResponseEntity.status(401).body(errorResponse);
			}
		} catch (ExpiredJwtException e) {
			ValidateTokenResponse errorResponse = ValidateTokenResponse.error("Token has expired");
			return ResponseEntity.status(401).body(errorResponse);
		} catch (Exception e) {
			ValidateTokenResponse errorResponse = ValidateTokenResponse.error("Invalid token: " + e.getMessage());
			return ResponseEntity.status(401).body(errorResponse);
		}
	}
	
	@GetMapping("/health")
	public ResponseEntity<Map<String, String>> healthCheck() {
		Map<String, String> response = new HashMap<>();
		response.put("status", "UP");
		response.put("message", "Hospital Management API is running");
		return ResponseEntity.ok(response);
	}
		
}
