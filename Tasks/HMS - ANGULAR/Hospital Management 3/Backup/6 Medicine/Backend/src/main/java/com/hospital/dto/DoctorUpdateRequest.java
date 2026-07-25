package com.hospital.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonProperty;

public class DoctorUpdateRequest {
	
	@Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
	@JsonProperty("name")
	private String name;
	
	@Email(message = "Email must be valid")
	@JsonProperty("email")
	private String email;
	
	@Size(min = 2, max = 100, message = "Specialization must be between 2 and 100 characters")
	@JsonProperty("specialization")
	private String specialization;
	
	@Min(value = 0, message = "Years of experience must be at least 0")
	@JsonProperty("yearsOfExperience")
	private Integer yearsOfExperience;
	
	@Pattern(regexp = "^[0-9]{10,15}$", message = "Phone number must be between 10 and 15 digits")
	@JsonProperty("phoneNumber")
	private String phoneNumber;
	
	public DoctorUpdateRequest() {
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
		return "DoctorUpdateRequest [name=" + name + ", email=" + email + ", specialization=" + specialization
				+ ", yearsOfExperience=" + yearsOfExperience + ", phoneNumber=" + phoneNumber + "]";
	}
}
