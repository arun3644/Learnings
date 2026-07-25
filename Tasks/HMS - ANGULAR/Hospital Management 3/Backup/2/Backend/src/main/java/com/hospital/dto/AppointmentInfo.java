package com.hospital.dto;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.hospital.dto.DoctorRegisterResponse.DoctorInfo;


@JsonInclude(JsonInclude.Include.NON_NULL)
public class AppointmentInfo {
	
	private Long id;
	private String appointmentId;
	private Long patientId;
	private Long doctorId;
	private String time;
	private String status;
	private Integer duration;
	private String reason;
	private Date appointmentDate;
	private Date createdAt;
	private Date updatedAt;
	
	private  PatientResponse patientResponse;
	private DoctorInfo doctorInfo;
	
	private boolean success;
	private String message;
	
	private String doctorName;
	
	public AppointmentInfo() {
	}
	
	public AppointmentInfo(Long id, Date appointmentDate, String time, String doctorName, String status) {
		this.id = id;
		this.appointmentDate = appointmentDate;
		this.time = time;
		this.doctorName = doctorName;
		this.status = status;
	}
	
	public AppointmentInfo(boolean  success, String message, Long id, Date appointmentDate, String time, String status, String appointmentId, Integer duration,
			String reason, Date createdAt, Date updatedAt, PatientResponse patientResponse,
			DoctorInfo doctorInfo) {
		this.success = success;
		this.message = message;
		this.id = id;
		this.appointmentDate = appointmentDate;
		this.time = time;
		this.status = status;
		this.appointmentId = appointmentId;
		this.duration = duration;
		this.reason = reason;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
		this.patientResponse = patientResponse;
		this.doctorInfo = doctorInfo;
	}
	
	public AppointmentInfo(boolean success, String message) {
		this.success = success;
		this.message = message;
	}
	public String getAppointmentId() {
		return appointmentId;
	}

	public void setAppointmentId(String appointmentId) {
		this.appointmentId = appointmentId;
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

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public String getTime() {
		return time;
	}
	
	public void setTime(String time) {
		this.time = time;
	}
	
	public String getStatus() {
		return status;
	}
	
	public void setStatus(String status) {
		this.status = status;
	}

	public PatientResponse getPatientResponse() {
		return patientResponse;
	}

	public void setPatientResponse(PatientResponse patientResponse) {
		this.patientResponse = patientResponse;
	}

	public DoctorInfo getDoctorInfo() {
		return doctorInfo;
	}

	public void setDoctorInfo(DoctorInfo doctorInfo) {
		this.doctorInfo = doctorInfo;
	}

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

	public String getDoctorName() {
		return doctorName;
	}

	public void setDoctorName(String doctorName) {
		this.doctorName = doctorName;
	}

	public Date getAppointmentDate() {
		return appointmentDate;
	}

	public void setAppointmentDate(Date appointmentDate) {
		this.appointmentDate = appointmentDate;
	}
	
}
