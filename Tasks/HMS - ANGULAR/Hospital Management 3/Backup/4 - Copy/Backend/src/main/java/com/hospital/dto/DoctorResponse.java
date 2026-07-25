package com.hospital.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class DoctorResponse {
	
	@JsonProperty("id")
	private Long id;
	
	@JsonProperty("username")
	private String username;
	
	@JsonProperty("name")
	private String name;
	
	@JsonProperty("email")
	private String email;
	
	@JsonProperty("specialization")
	private String specialization;
	
	@JsonProperty("yearsOfExperience")
	private Integer yearsOfExperience;
	
	@JsonProperty("phoneNumber")
	private String phoneNumber;
	
	@JsonProperty("createdAt")
	private String createdAt;
	
	@JsonProperty("updatedAt")
	private String updatedAt;
	
	@JsonProperty("error")
	private String error;
	
	@JsonProperty("message")
	private String message;
	
	@JsonProperty("appointments")
	private List<AppointmentInfo> appointments;
	
	public DoctorResponse() {
	}
	
	public DoctorResponse(Long id, String username, String name, String email, String specialization,
			Integer yearsOfExperience, String phoneNumber, String createdAt, String updatedAt) {
		this.id = id;
		this.username = username;
		this.name = name;
		this.email = email;
		this.specialization = specialization;
		this.yearsOfExperience = yearsOfExperience;
		this.phoneNumber = phoneNumber;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}
	
	public DoctorResponse(String error, String message) {
		this.error = error;
		this.message = message;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getSpecialization() {
		return specialization;
	}

	public void setSpecialization(String specialization) {
		this.specialization = specialization;
	}

	public Integer getYearsOfExperience() {
		return yearsOfExperience;
	}

	public void setYearsOfExperience(Integer yearsOfExperience) {
		this.yearsOfExperience = yearsOfExperience;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(String createdAt) {
		this.createdAt = createdAt;
	}

	public String getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(String updatedAt) {
		this.updatedAt = updatedAt;
	}

	public String getError() {
		return error;
	}

	public void setError(String error) {
		this.error = error;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public List<AppointmentInfo> getAppointments() {
		return appointments;
	}

	public void setAppointments(List<AppointmentInfo> appointments) {
		this.appointments = appointments;
	}
	
	@Override
	public String toString() {
		return "DoctorResponse [id=" + id + ", username=" + username + ", name=" + name + ", email=" + email
				+ ", specialization=" + specialization + ", yearsOfExperience=" + yearsOfExperience
				+ ", phoneNumber=" + phoneNumber + ", createdAt=" + createdAt + ", updatedAt=" + updatedAt + "]";
	}
}
