package com.hospital.dto;

import java.util.List;

public class PatientResponse {
	
	private Long id;
	private String patientId;
	private String username;
	private String name;
	private String email;
	private Integer age;
	private String gender;
	private String phoneNumber;
	private String bloodGroup;
	private String address;
	private String status;
	private String createdAt;
	private String updatedAt;
	private String error;
	private String message;
	private List<AppointmentInfo> appointments;

	public PatientResponse(Long id, String patientId, String username) {
		this.id = id;
		this.patientId = patientId;
		this.username = username;
	}
	public PatientResponse(Long id, String patientId, String username, String name, String email, Integer age,
			String gender, String phoneNumber, String bloodGroup, String address, String status, String createdAt,
			String updatedAt) {
		super();
		this.id = id;
		this.patientId = patientId;
		this.username = username;
		this.name = name;
		this.email = email;
		this.age = age;
		this.gender = gender;
		this.phoneNumber = phoneNumber;
		this.bloodGroup = bloodGroup;
		this.address = address;
		this.status = status;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}
	
	public PatientResponse(String error, String message) {
		this.error = error;
		this.message = message;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getPatientId() {
		return patientId;
	}

	public void setPatientId(String patientId) {
		this.patientId = patientId;
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

	public Integer getAge() {
		return age;
	}

	public void setAge(Integer age) {
		this.age = age;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getBloodGroup() {
		return bloodGroup;
	}

	public void setBloodGroup(String bloodGroup) {
		this.bloodGroup = bloodGroup;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
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
		return "PatientResponse [id=" + id + ", patientId=" + patientId + ", username=" + username + ", name=" + name
				+ ", email=" + email + ", age=" + age + ", gender=" + gender + ", phoneNumber=" + phoneNumber
				+ ", bloodGroup=" + bloodGroup + ", address=" + address + ", status=" + status + ", createdAt="
				+ createdAt + ", updatedAt=" + updatedAt + ", error=" + error + ", message=" + message 
				+ ", appointments=" + appointments + "]";
	}
	
	
}
