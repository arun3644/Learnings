package com.hospital.dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class AdminRegisterRequest {
	
	@NotBlank(message = "UserName is required.")
	@Size(min = 3, max=50, message = "UserName must be between 3 - 50 characters.")
	private String username;
	
	@NotBlank(message = "Password is required.")
	@Size(min=6, message= "Password must be atleast 6 characters.")
	private String password;
	
	@NotBlank(message = "Name is required")
	private String name;
	
	@NotBlank(message = "Email is required")
	private String email;

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

	@Override
	public String toString() {
		return "AdminRegisterRequest [username=" + username + ", password=" + password + ", name=" + name + ", email="
				+ email + "]";
	}
	
	
}
