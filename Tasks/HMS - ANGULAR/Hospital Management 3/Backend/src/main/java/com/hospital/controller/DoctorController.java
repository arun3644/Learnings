package com.hospital.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.dto.AppointmentInfo;
import com.hospital.dto.DoctorDashboardStats;
import com.hospital.dto.DoctorResponse;
import com.hospital.dto.DoctorUpdateRequest;
import com.hospital.model.DoctorTimeSlot;
import com.hospital.service.DashBoardService;
import com.hospital.service.DoctorService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("api/doctors")
@CrossOrigin(origins = "*")
public class DoctorController {
	
	private final DoctorService doctorService;
	private final DashBoardService dashBoardService;
	
	public DoctorController(DoctorService doctorService, DashBoardService dashBoardService) {
		this.doctorService = doctorService;
		this.dashBoardService = dashBoardService;
	}
	
	@GetMapping("")
	public ResponseEntity<List<DoctorResponse>> getAllDoctors() {
		try {
			List<DoctorResponse> doctors = doctorService.getAllDoctors();
			return ResponseEntity.ok(doctors);
		} catch (Exception e) {
			return ResponseEntity.status(500).body(null);
		}
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<DoctorResponse> getDoctorById(@PathVariable Long id) {
		try {
			DoctorResponse response = doctorService.getDoctorById(id);
			if (response.getError() != null) {
				return ResponseEntity.status(404).body(response);
			}
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			return ResponseEntity.status(500).body(new DoctorResponse("Error", "Internal server error"));
		}
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<?> updateDoctor(@PathVariable Long id, @Valid @RequestBody DoctorUpdateRequest request) {
		try {
			DoctorResponse response = doctorService.updateDoctor(id, request);
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
			errorResponse.put("message", "Error updating doctor: " + e.getMessage());
			return ResponseEntity.status(500).body(errorResponse);
		}
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteDoctor(@PathVariable Long id) {
		try {
			DoctorResponse response = doctorService.deleteDoctor(id);
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
			errorResponse.put("message", "Error deleting doctor: " + e.getMessage());
			return ResponseEntity.status(500).body(errorResponse);
		}
	}
	
	@GetMapping("/{id}/available-slots")
	public ResponseEntity<List<DoctorTimeSlot>> getAvailableTimeSlots(
			@PathVariable Long id,
			@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date date) {
		try {
			List<DoctorTimeSlot> slots = doctorService.getAvailableTimeSlots(id, date);
			return ResponseEntity.ok(slots);
		} catch (Exception e) {
			return ResponseEntity.status(500).body(null);
		}
	}
	
	@GetMapping("/{id}/booked-slots")
	public ResponseEntity<List<DoctorTimeSlot>> getBookedTimeSlots(
	        @PathVariable Long id,
	        @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date date) {
	    try {
	        List<DoctorTimeSlot> slots = doctorService.getBookedSlots(id, date);
	        return ResponseEntity.ok(slots);
	    } catch (Exception e) {
	        return ResponseEntity.status(500).body(null);
	    }
	}
	
	@GetMapping("/{id}/appointments")
	public ResponseEntity<List<AppointmentInfo>> getDoctorAppointments(@PathVariable Long id) {
		try {
			List<AppointmentInfo> appointments = doctorService.getDoctorAppointments(id);
			return ResponseEntity.ok(appointments);
		} catch (Exception e) {
			return ResponseEntity.status(500).body(null);
		}
	}
	
	@GetMapping("/{id}/all-slots")
	public ResponseEntity<List<DoctorTimeSlot>> getAllDoctorSlots(@PathVariable Long id) {
		try {
			List<DoctorTimeSlot> slots = doctorService.getAllDoctorSlots(id);
			return ResponseEntity.ok(slots);
		} catch (Exception e) {
			return ResponseEntity.status(500).body(null);
		}
	}
	
	@GetMapping("/{id}/generate-slots")
	public ResponseEntity<?> generateSlotsForDoctor(@PathVariable Long id) {
		try {
			String result = doctorService.generateSlotsForDoctor(id);
			Map<String, String> response = new HashMap<>();
			response.put("message", result);
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			Map<String, String> errorResponse = new HashMap<>();
			errorResponse.put("error", "Error generating slots: " + e.getMessage());
			return ResponseEntity.status(500).body(errorResponse);
		}
	}
	
	@GetMapping("/{doctorId}/dashboard-stats")
	public ResponseEntity<DoctorDashboardStats> getDashBoardStats3(@PathVariable Long doctorId) {
	    try {
	        DoctorDashboardStats response = dashBoardService.getDoctorDashBaordStats(doctorId);
	        return ResponseEntity.status(200).body(response);
	    } catch(Exception e) {
	        DoctorDashboardStats errorResponse = new DoctorDashboardStats("error", "Error DashboardStats: " + e.getMessage());
	        return ResponseEntity.status(500).body(errorResponse);
	    }
	}

}
