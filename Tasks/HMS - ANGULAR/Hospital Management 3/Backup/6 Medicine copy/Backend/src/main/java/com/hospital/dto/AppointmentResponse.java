package com.hospital.dto;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class AppointmentResponse {
	
	private boolean success;
	private String message;
	private AppointmentData appointment;
	
	public AppointmentResponse() {
	}
	
	public AppointmentResponse(boolean success, String message, AppointmentData appointment) {
		this.success = success;
		this.message = message;
		this.appointment = appointment;
	}
	public AppointmentResponse(AppointmentData appointment) {
		this.appointment = appointment;
	}
	
	public AppointmentResponse(boolean success, String message) {
		this.success = success;
		this.message = message;
	}
	
	public boolean isSuccess() {
		return success;
	}
	
	public void setSuccess(boolean success) {
		this.success = success;
	}
	
	public String getMessage() {
		return message;
	}
	
	public void setMessage(String message) {
		this.message = message;
	}
	
	public AppointmentData getAppointment() {
		return appointment;
	}
	
	public void setAppointment(AppointmentData appointment) {
		this.appointment = appointment;
	}
	
	public static class AppointmentData {
		private Long id;
		private String appointmentId;
		private PatientBasicInfo patient;
		private DoctorBasicInfo doctor;
		
		@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Kolkata")
		private Date date;
		
		private String time;
		private Integer duration;
		private String reason;
		private String status;
		private Date createdAt;
		
		public AppointmentData() {
		}
		
		public AppointmentData(Long id, String appointmentId, PatientBasicInfo patient, 
				DoctorBasicInfo doctor, Date date, String time, Integer duration, 
				String reason, String status, Date createdAt) {
			this.id = id;
			this.appointmentId = appointmentId;
			this.patient = patient;
			this.doctor = doctor;
			this.date = date;
			this.time = time;
			this.duration = duration;
			this.reason = reason;
			this.status = status;
			this.createdAt = createdAt;
		}
		
		public Long getId() {
			return id;
		}
		
		public void setId(Long id) {
			this.id = id;
		}
		
		public String getAppointmentId() {
			return appointmentId;
		}
		
		public void setAppointmentId(String appointmentId) {
			this.appointmentId = appointmentId;
		}
		
		public PatientBasicInfo getPatient() {
			return patient;
		}
		
		public void setPatient(PatientBasicInfo patient) {
			this.patient = patient;
		}
		
		public DoctorBasicInfo getDoctor() {
			return doctor;
		}
		
		public void setDoctor(DoctorBasicInfo doctor) {
			this.doctor = doctor;
		}
		
		public Date getDate() {
			return date;
		}
		
		public void setDate(Date date) {
			this.date = date;
		}
		
		public String getTime() {
			return time;
		}
		
		public void setTime(String time) {
			this.time = time;
		}
		
		public Integer getDuration() {
			return duration;
		}
		
		public void setDuration(Integer duration) {
			this.duration = duration;
		}
		
		public String getReason() {
			return reason;
		}
		
		public void setReason(String reason) {
			this.reason = reason;
		}
		
		public String getStatus() {
			return status;
		}
		
		public void setStatus(String status) {
			this.status = status;
		}
		
		public Date getCreatedAt() {
			return createdAt;
		}
		
		public void setCreatedAt(Date createdAt) {
			this.createdAt = createdAt;
		}

	}
	
	public static class PatientBasicInfo {
		private Long id;
		private String name;
		private String patientId;		
		
		public PatientBasicInfo() {
		}
		
		public PatientBasicInfo(Long id, String name, String patientId) {
			this.id = id;
			this.name = name;
			this.patientId = patientId;
		}
		
		public Long getId() {
			return id;
		}
		
		public void setId(Long id) {
			this.id = id;
		}
		
		public String getName() {
			return name;
		}
		
		public void setName(String name) {
			this.name = name;
		}

		public String getPatientId() {
			return patientId;
		}

		public void setPatientId(String patientId) {
			this.patientId = patientId;
		}
		
		
	}
	
	public static class DoctorBasicInfo {
		private Long id;
		private String name;
		private String specialization;
		
		public DoctorBasicInfo() {
		}
		
		public DoctorBasicInfo(Long id, String name) {
			this.id = id;
			this.name = name;
		}
		
		
		public DoctorBasicInfo(Long id, String name, String specialization) {
			super();
			this.id = id;
			this.name = name;
			this.specialization = specialization;
		}

		public Long getId() {
			return id;
		}
		
		public void setId(Long id) {
			this.id = id;
		}
		
		public String getName() {
			return name;
		}
		
		public void setName(String name) {
			this.name = name;
		}

		public String getSpecialization() {
			return specialization;
		}

		public void setSpecialization(String specialization) {
			this.specialization = specialization;
		}
		
	}
}
