package com.hospital.dto;

public class PatientRegisterResponse {
	private boolean success;
	private String message;
	private String token;
	private PatientInfo patient;
	
	public PatientRegisterResponse(boolean success, String message, String token, PatientInfo patient) {
		this.success = success;
		this.message = message;
		this.token = token;
		this.patient = patient;
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
	
	public PatientInfo getPatient() {
		return patient;
	}
	
	public void setPatient(PatientInfo patient) {
		this.patient = patient;
	}
	
	public static class PatientInfo {
		private Long id;
		private String username;
		private String role;
		private String name;
		private String email;
		private Integer age;
		private String gender;
		private String phoneNumber;
		
		public PatientInfo(Long id, String username, String role, String name, String email, Integer age, String gender, String phoneNumber) {
			this.id = id;
			this.username = username;
			this.role = role;
			this.name = name;
			this.email = email;
			this.age = age;
			this.gender = gender;
			this.phoneNumber = phoneNumber;
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
	}
	
	public static PatientRegisterResponse error(String message) {
		return new PatientRegisterResponse(false, message, null, null);
	}
}
