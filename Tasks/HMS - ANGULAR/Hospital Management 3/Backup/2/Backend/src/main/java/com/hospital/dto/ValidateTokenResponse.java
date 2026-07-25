package com.hospital.dto;

public class ValidateTokenResponse {
	
	private boolean valid;
	private String username;
	private String role;
	private String message;
	private Long expiresIn;
	
	public ValidateTokenResponse(boolean valid, String username, String role, String message, Long expiresIn) {
		this.valid = valid;
		this.username = username;
		this.role = role;
		this.message = message;
		this.expiresIn = expiresIn;
	}
	
	public boolean isValid() {
		return valid;
	}
	
	public void setValid(boolean valid) {
		this.valid = valid;
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
	
	public String getMessage() {
		return message;
	}
	
	public void setMessage(String message) {
		this.message = message;
	}
	
	public Long getExpiresIn() {
		return expiresIn;
	}
	
	public void setExpiresIn(Long expiresIn) {
		this.expiresIn = expiresIn;
	}
	
	public static ValidateTokenResponse error(String message) {
		return new ValidateTokenResponse(false, null, null, message, null);
	}
	
	public static ValidateTokenResponse success(String username, String role, Long expiresIn) {
		return new ValidateTokenResponse(true, username, role, "Token is valid", expiresIn);
	}
}
