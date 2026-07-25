package com.hospital.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonProperty;

public class DoctorRegisterRequest {
	
	@NotBlank(message = "Username is required")
	@Size(min = 3, max = 50, message = "Username must be between 3 and 50 characters")
	@Pattern(regexp = "^[a-zA-Z0-9_]+$", message = "Username can only contain letters, numbers, and underscores")
	@JsonProperty("username")
	private String username;
	
	@NotBlank(message = "Password is required")
	@Size(min = 6, max = 100, message = "Password must be between 6 and 100 characters")
	@JsonProperty("password")
	private String password;
	
	@NotBlank(message = "Name is required")
	@Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
	@JsonProperty("name")
	private String name;
	
	@NotBlank(message = "Email is required")
	@Email(message = "Email must be valid")
	@JsonProperty("email")
	private String email;
	
	@NotBlank(message = "Specialization is required")
	@Size(min = 2, max = 100, message = "Specialization must be between 2 and 100 characters")
	@JsonProperty("specialization")
	private String specialization;
	
	@NotNull(message = "Years of experience is required")
	@Min(value = 0, message = "Years of experience must be at least 0")
	@JsonProperty("yearsOfExperience")
	private Integer yearsOfExperience;
	
	@NotBlank(message = "Phone number is required")
	@Pattern(regexp = "^[0-9]{10,15}$", message = "Phone number must be between 10 and 15 digits")
	@JsonProperty("phoneNumber")
	private String phoneNumber;
	
	@Size(max = 50, message = "License number cannot exceed 50 characters")
	@JsonProperty("licenseNumber")
	private String licenseNumber;
	
	public String getUsername() {
		return username;
	}
	
	public void setUsername(String username) {
		this.username = username;
	}
	
	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
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
	
	public String getLicenseNumber() {
		return licenseNumber;
	}
	
	public void setLicenseNumber(String licenseNumber) {
		this.licenseNumber = licenseNumber;
	}
	
	@Override
	public String toString() {
		return "DoctorRegisterRequest [username=" + username + ", name=" + name + ", email="
				+ email + ", specialization=" + specialization + ", yearsOfExperience=" + yearsOfExperience
				+ ", phoneNumber=" + phoneNumber + ", licenseNumber=" + licenseNumber + "]";
	}
}
