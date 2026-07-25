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

import com.hospital.dto.AdminDashboardStats;
import com.hospital.dto.AdminResponse;
import com.hospital.dto.AdminUpdateRequest;
import com.hospital.service.AdminService;
import com.hospital.service.DashBoardService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("api/admins")
@CrossOrigin(origins = "*")
public class AdminController {
	
	private final AdminService adminService;
	private final DashBoardService dashBoardService;
	
	public AdminController(AdminService adminService, DashBoardService dashBoardService) {
		this.adminService = adminService;
		this.dashBoardService = dashBoardService;
	}
	
	@GetMapping("")
	public ResponseEntity<List<AdminResponse>> getAllAdmins() {
		try {
			List<AdminResponse> admins = adminService.getAllAdmins();
			return ResponseEntity.ok(admins);
		} catch (Exception e) {
			return ResponseEntity.status(500).body(null);
		}
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<AdminResponse> getAdminById(@PathVariable Long id) {
		try {
			AdminResponse response = adminService.getAdminById(id);
			if (response.getError() != null) {
				return ResponseEntity.status(404).body(response);
			}
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			return ResponseEntity.status(500).body(new AdminResponse("Error", "Internal server error"));
		}
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<?> updateAdmin(@PathVariable Long id, @Valid @RequestBody AdminUpdateRequest request) {
		try {
			AdminResponse response = adminService.updateAdmin(id, request);
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
			errorResponse.put("message", "Error updating admin: " + e.getMessage());
			return ResponseEntity.status(500).body(errorResponse);
		}
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteAdmin(@PathVariable Long id) {
		try {
			AdminResponse response = adminService.deleteAdmin(id);
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
			errorResponse.put("message", "Error deleting admin: " + e.getMessage());
			return ResponseEntity.status(500).body(errorResponse);
		}
	}
	
	@GetMapping("/dashboard-stats")
	public ResponseEntity<AdminDashboardStats> getDashBoardStats() {
		try {
			AdminDashboardStats response = dashBoardService.getAdminDashBoardStats();
			return ResponseEntity.status(200).body(response);
		} catch(Exception e) {
			AdminDashboardStats errorResponse = new AdminDashboardStats("error", "Error DashboardStats: " + e.getMessage());
			return ResponseEntity.status(500).body(errorResponse);
		}
	}
}
