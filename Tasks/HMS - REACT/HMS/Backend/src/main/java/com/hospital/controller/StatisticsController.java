package com.hospital.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.dto.AppointmentResponse;
import com.hospital.service.StatisticsService;

@RestController
@RequestMapping("api/statistics")
@CrossOrigin(origins = "*")
public class StatisticsController {
	
	private final StatisticsService statisticsService;
	
	public StatisticsController(StatisticsService statisticsService) {
		this.statisticsService = statisticsService;
	}
	
	@GetMapping
	public ResponseEntity<Map<String, Object>> getDashboardStatistics() {
		try {
			Map<String, Object> response = new HashMap<>();
			response.put("success", true);
			response.put("totalPatients", statisticsService.getTotalPatientsCount());
			response.put("totalDoctors", statisticsService.getTotalDoctorsCount());
			response.put("totalStaffs", statisticsService.getTotalStaffsCount());
			response.put("totalStaff", statisticsService.getTotalStaffsCount());
			response.put("totalAppointments", statisticsService.getTotalAppointmentsCount());
			response.put("appointments", statisticsService.getTotalAppointmentsCount());
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			Map<String, Object> errorResponse = new HashMap<>();
			errorResponse.put("success", false);
			errorResponse.put("message", "Error fetching dashboard statistics: " + e.getMessage());
			return ResponseEntity.status(500).body(errorResponse);
		}
	}
	
	@GetMapping("/appointments-by-status")
	public ResponseEntity<List<AppointmentResponse.AppointmentData>> getAppointmentsByStatus(
			@RequestParam String status) {
		try {
			List<AppointmentResponse.AppointmentData> appointments = statisticsService.getAppointmentsByStatus(status);
			return ResponseEntity.ok(appointments);
		} catch (Exception e) {
			return ResponseEntity.status(500).body(null);
		}
	}
	
	@GetMapping("/today-appointments")
	public ResponseEntity<List<AppointmentResponse.AppointmentData>> getTodayAppointments() {
		try {
			List<AppointmentResponse.AppointmentData> appointments = statisticsService.getTodayAppointments();
			return ResponseEntity.ok(appointments);
		} catch (Exception e) {
			return ResponseEntity.status(500).body(null);
		}
	}
	
	@GetMapping("/upcoming-appointments")
	public ResponseEntity<List<AppointmentResponse.AppointmentData>> getUpcomingAppointments() {
		try {
			List<AppointmentResponse.AppointmentData> appointments = statisticsService.getUpcomingAppointments();
			return ResponseEntity.ok(appointments);
		} catch (Exception e) {
			return ResponseEntity.status(500).body(null);
		}
	}
}
