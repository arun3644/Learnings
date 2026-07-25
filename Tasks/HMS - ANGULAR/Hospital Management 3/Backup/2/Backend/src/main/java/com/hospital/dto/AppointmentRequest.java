package com.hospital.dto;

import java.util.Date;

import jakarta.validation.constraints.NotNull;

public class AppointmentRequest {

	@NotNull( message = "PatientId is required")
	private Long patientId;
	
	@NotNull( message = "DoctorId is required")
	private Long doctorId;
	
	@NotNull( message = "Date is required")
	private Date date;
	
	@NotNull( message = "Time is required")	
	private String time;

	
	@NotNull( message = "Duration is required")
	private Integer duration;

	
	@NotNull( message = "Reason is required")
	private String reason;
	
	private String notes;

	public Long getPatientId() {
		return patientId;
	}

	public void setPatientId(Long patientId) {
		this.patientId = patientId;
	}

	public Long getDoctorId() {
		return doctorId;
	}

	public void setDoctorId(Long doctorId) {
		this.doctorId = doctorId;
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

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}
}
