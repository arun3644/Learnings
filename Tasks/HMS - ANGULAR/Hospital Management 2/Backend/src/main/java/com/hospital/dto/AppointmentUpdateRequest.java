package com.hospital.dto;

import java.util.Date;

public class AppointmentUpdateRequest {
	
	private Date date;
	private String time;
	private Long doctorId;
	private String status;
	private String notes;
	
	public AppointmentUpdateRequest() {
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
	
	public Long getDoctorId() {
		return doctorId;
	}
	
	public void setDoctorId(Long doctorId) {
		this.doctorId = doctorId;
	}
	
	public String getStatus() {
		return status;
	}
	
	public void setStatus(String status) {
		this.status = status;
	}
	
	public String getNotes() {
		return notes;
	}
	
	public void setNotes(String notes) {
		this.notes = notes;
	}
}
