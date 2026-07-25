package com.hospital.controller;

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

import com.hospital.dto.NurseResponse;
import com.hospital.dto.NurseUpdateRequest;
import com.hospital.service.NurseService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("api/nurses")
@CrossOrigin(origins = "*")
public class NurseController {
	
	private final NurseService nurseService;
	
	public NurseController(NurseService nurseService) {
		this.nurseService = nurseService;
	}
	
	@GetMapping("")
	public ResponseEntity<List<NurseResponse>> getAllNurses() {
		try {
			List<NurseResponse> nurses = nurseService.getAllNurses();
			return ResponseEntity.ok(nurses);
		} catch (Exception e) {
			return ResponseEntity.status(500).body(null);
		}
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<NurseResponse> getNurseById(@PathVariable Long id) {
		try {
			NurseResponse response = nurseService.getNurseById(id);
			if (response.getError() != null) {
				return ResponseEntity.status(404).body(response);
			}
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			return ResponseEntity.status(500).body(new NurseResponse("Error", "Internal server error"));
		}
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<?> updateNurse(@PathVariable Long id, @Valid @RequestBody NurseUpdateRequest request) {
		try {
			NurseResponse response = nurseService.updateNurse(id, request);
			if (response.getError() != null) {
				Map<String, String> errorResponse = new HashMap<>();
				errorResponse.put("error", response.getError());
				errorResponse.put("message", response.getMessage());
				return ResponseEntity.status(404).body(errorResponse);
			}
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			Map<String, String> errorResponse = new HashMap<>();
			errorResponse.put("error", "Error");
			errorResponse.put("message", "Error updating nurse: " + e.getMessage());
			return ResponseEntity.status(500).body(errorResponse);
		}
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteNurse(@PathVariable Long id) {
		try {
			NurseResponse response = nurseService.deleteNurse(id);
			if (response.getError() != null) {
				Map<String, String> errorResponse = new HashMap<>();
				errorResponse.put("error", response.getError());
				errorResponse.put("message", response.getMessage());
				return ResponseEntity.status(404).body(errorResponse);
			}
			Map<String, String> successResponse = new HashMap<>();
			successResponse.put("message", response.getMessage());
			return ResponseEntity.ok(successResponse);
		} catch (Exception e) {
			Map<String, String> errorResponse = new HashMap<>();
			errorResponse.put("error", "Error");
			errorResponse.put("message", "Error deleting nurse: " + e.getMessage());
			return ResponseEntity.status(500).body(errorResponse);
		}
	}
}
