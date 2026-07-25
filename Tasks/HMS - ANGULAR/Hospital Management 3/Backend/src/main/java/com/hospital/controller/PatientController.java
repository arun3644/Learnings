package com.hospital.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.dto.PatientDashboardStats;
import com.hospital.dto.PatientResponse;
import com.hospital.dto.PatientUpdateRequest;
import com.hospital.service.DashBoardService;
import com.hospital.service.PatientService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("api/patients")
@CrossOrigin(origins = "*")
public class PatientController {
	private final PatientService patientService;
	private final DashBoardService dashBoardService;
	
	public PatientController(PatientService patientService, DashBoardService dashBoardService) {
		this.patientService = patientService;
		this.dashBoardService = dashBoardService;
	}
	
	@GetMapping("")
	public ResponseEntity<List<PatientResponse>> getAllPatients() {
	    try {
	        List<PatientResponse> patients = patientService.getAllPatients();
	        return ResponseEntity.ok(patients);
	    } 
	    catch (Exception e) {
	        return ResponseEntity.status(500).body(new ArrayList<>());
	    }
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<PatientResponse> getPatientById(@PathVariable Long id){
		try {
			PatientResponse response = patientService.getPatientById(id);
			return ResponseEntity.status(200).body(response);
		}catch(Exception e) {
			return ResponseEntity.status(500).body(new PatientResponse(e.getMessage(), "Internal server error"));
		}
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<?> updatePatient(@PathVariable Long id, @Valid @RequestBody PatientUpdateRequest request) {
		try {
			PatientResponse response = patientService.updatePatient(id, request);
			if (response.getError() != null) {
				Map<String, String> errorResponse = new HashMap<>();
				errorResponse.put("error", response.getError());
				errorResponse.put("message", response.getMessage());
				return ResponseEntity.status(404).body(errorResponse);
			}
			return ResponseEntity.status(200).body(response);
		} catch (Exception e) {
			Map<String, String> errorResponse = new HashMap<>();
			errorResponse.put("error", "Error");
			errorResponse.put("message", "Error updating patient: " + e.getMessage());
			return ResponseEntity.status(500).body(errorResponse);
		}
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deletePatient(@PathVariable Long id) {
		try {
			PatientResponse response = patientService.deletePatient(id);
			if (response.getError() != null) {
				Map<String, String> errorResponse = new HashMap<>();
				errorResponse.put("error", response.getError());
				errorResponse.put("message", response.getMessage());
				return ResponseEntity.status(404).body(errorResponse);
			}
			Map<String, String> successResponse = new HashMap<>();
			successResponse.put("message", response.getMessage());
			return ResponseEntity.status(200).body(successResponse);
		} catch (Exception e) {
			Map<String, String> errorResponse = new HashMap<>();
			errorResponse.put("error", "Error");
			errorResponse.put("message", "Error deleting patient: " + e.getMessage());
			return ResponseEntity.status(500).body(errorResponse);
		}
	}
	
	@GetMapping("/{patientId}/dashboard-stats")
	public ResponseEntity<PatientDashboardStats> getDashBoardStats(@PathVariable Long patientId) {
		try {
			PatientDashboardStats response = dashBoardService.getPatientDashBoardStats(patientId);
			return ResponseEntity.status(200).body(response);
		} catch(Exception e) {
			PatientDashboardStats errorResponse = new PatientDashboardStats("error", "Error DashboardStats: " + e.getMessage());
			return ResponseEntity.status(500).body(errorResponse);
		}
	}

}
