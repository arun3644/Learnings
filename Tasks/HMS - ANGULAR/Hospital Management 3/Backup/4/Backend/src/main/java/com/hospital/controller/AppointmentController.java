package com.hospital.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.dto.AppointmentRequest;
import com.hospital.dto.AppointmentResponse;
import com.hospital.dto.AppointmentUpdateRequest;
import com.hospital.service.AppointmentService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {
	
	private final AppointmentService appointmentService;
	
	public AppointmentController(AppointmentService appointmentService) {
		this.appointmentService = appointmentService;
	}
	
	@GetMapping("")
	public ResponseEntity<List<AppointmentResponse.AppointmentData>> getAllAppointment() {
	    try {
	        List<AppointmentResponse.AppointmentData> response = appointmentService.getAllAppointment();
	        return ResponseEntity.status(200).body(response);
	    } catch(RuntimeException e) {
	        return ResponseEntity.status(500).body(null);
	    }
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getAptById(@PathVariable Long id) {
	    try {
	        AppointmentResponse.AppointmentData response = appointmentService.getAptById(id);
	        if(response!= null)
	        	return ResponseEntity.status(200).body(response);
	        else {
	        	Map<String, Object> errRes = new HashMap<>();
	        	errRes.put("success", false);
	        	errRes.put("message", "Appointment not found with id: "+id);
	        	return ResponseEntity.status(400).body(errRes);
	        }
	        	
	    } catch(RuntimeException e) {
	        return ResponseEntity.status(500).body(null);
	    }
	}
	
	@PostMapping("")
	public ResponseEntity<AppointmentResponse> bookAppointment(@Valid @RequestBody AppointmentRequest request) {
		try {
			AppointmentResponse response = appointmentService.bookAppointment(request);
			
			if (response.isSuccess()) {
				return ResponseEntity.status(201).body(response);
			} else {
				return ResponseEntity.status(400).body(response);
			}
		} catch (Exception e) {
			return ResponseEntity.status(500)
					.body(new AppointmentResponse(false, "Error creating appointment: " + e.getMessage()));
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<AppointmentResponse> updateAppointment(@PathVariable Long id, @Valid @RequestBody AppointmentUpdateRequest request){
		try {
			AppointmentResponse response = appointmentService.updateAppointment(id, request);
			if(response.isSuccess()) {
				return ResponseEntity.status(201).body(response);
			}
			else {
				return ResponseEntity.status(400).body(response);
			}
		}catch(RuntimeException e) {
			return ResponseEntity.status(500)
					.body(new AppointmentResponse(false, "Error Updating Appointment: "+ e.getMessage()));
		}
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteAppointment(@PathVariable Long id){
		try {
			AppointmentResponse response = appointmentService.deleteAppointment(id);
			if(response.isSuccess()) {
				return ResponseEntity.status(201).body(response);
			}
			else {
				return ResponseEntity.status(400).body(response);
			}
		}catch(RuntimeException e) {
			return ResponseEntity.status(500)
					.body(new AppointmentResponse(false, "Error Deleting Appointment: "+ e.getMessage()));
		}
	}
	
}
