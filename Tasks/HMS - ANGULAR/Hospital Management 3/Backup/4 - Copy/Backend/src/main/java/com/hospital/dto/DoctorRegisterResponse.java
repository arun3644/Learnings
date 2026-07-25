package com.hospital.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class DoctorRegisterResponse {
	
	@JsonProperty("success")
	private boolean success;
	
	@JsonProperty("message")
	private String message;
	
	@JsonProperty("token")
	private String token;
	
	@JsonProperty("doctor")
	private DoctorInfo doctor;
	
	public DoctorRegisterResponse() {
	}
	
	public DoctorRegisterResponse(boolean success, String message, String token, DoctorInfo doctor) {
		this.success = success;
		this.message = message;
		this.token = token;
		this.doctor = doctor;
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
	
	public String getToken() {
		return token;
	}
	
	public void setToken(String token) {
		this.token = token;
	}
	
	public DoctorInfo getDoctor() {
		return doctor;
	}
	
	public void setDoctor(DoctorInfo doctor) {
		this.doctor = doctor;
	}
	
	@JsonInclude(JsonInclude.Include.NON_NULL)
	public static class DoctorInfo {
		
		@JsonProperty("id")
		private Long id;
		
		@JsonProperty("username")
		private String username;
		
		@JsonProperty("role")
		private String role;
		
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
		
		public DoctorInfo() {
		}
		
		public DoctorInfo(Long id, String username, String role, String name, String email, 
				String specialization, Integer yearsOfExperience, String phoneNumber) {
			this.id = id;
			this.username = username;
			this.role = role;
			this.name = name;
			this.email = email;
			this.specialization = specialization;
			this.yearsOfExperience = yearsOfExperience;
			this.phoneNumber = phoneNumber;
		}
		
		public DoctorInfo(Long id, String name, String specialization) {
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
		
		public String getUsername() {
			return username;
		}
		
		public void setUsername(String username) {
			this.username = username;
		}
		
		public String getRole() {
			return role;
		}
		
		public void setRole(String role) {
			this.role = role;
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
		
		@Override
		public String toString() {
			return "DoctorInfo [id=" + id + ", username=" + username + ", role=" + role + ", name=" + name + ", email="
					+ email + ", specialization=" + specialization + ", yearsOfExperience=" + yearsOfExperience
					+ ", phoneNumber=" + phoneNumber + "]";
		}
	}
	
	public static DoctorRegisterResponse error(String message) {
		return new DoctorRegisterResponse(false, message, null, null);
	}
	
	@Override
	public String toString() {
		return "DoctorRegisterResponse [success=" + success + ", message=" + message + ", token=" + token + ", doctor="
				+ doctor + "]";
	}
}
