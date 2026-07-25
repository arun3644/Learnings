package com.hospital.dto;

public class NurseRegisterResponse {
	private boolean success;
	private String message;
	private String token;
	private NurseInfo nurse;
	
	public NurseRegisterResponse(boolean success, String message, String token, NurseInfo nurse) {
		this.success = success;
		this.message = message;
		this.token = token;
		this.nurse = nurse;
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
	
	public NurseInfo getNurse() {
		return nurse;
	}
	
	public void setNurse(NurseInfo nurse) {
		this.nurse = nurse;
	}
	
	public static class NurseInfo {
		private Long id;
		private String username;
		private String role;
		private String name;
		private String email;
		private String department;
		private Integer yearsOfExperience;
		private String phoneNumber;
		
		public NurseInfo(Long id, String username, String role, String name, String email, String department, Integer yearsOfExperience, String phoneNumber) {
			this.id = id;
			this.username = username;
			this.role = role;
			this.name = name;
			this.email = email;
			this.department = department;
			this.yearsOfExperience = yearsOfExperience;
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
		
		public String getDepartment() {
			return department;
		}
		
		public void setDepartment(String department) {
			this.department = department;
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
	}
	
	public static NurseRegisterResponse error(String message) {
		return new NurseRegisterResponse(false, message, null, null);
	}
}
