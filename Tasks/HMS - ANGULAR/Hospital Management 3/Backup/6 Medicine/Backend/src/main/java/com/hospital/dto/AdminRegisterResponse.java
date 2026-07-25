package com.hospital.dto;

public class AdminRegisterResponse {
	private boolean success;
	private String message;
	private String token;
	private AdminInfo admin;
		
	public AdminRegisterResponse(boolean success, String message, String token, AdminInfo admin) {
		this.success = success;
		this.message = message;
		this.token = token;
		this.admin = admin;
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

	public AdminInfo getAdmin() {
		return admin;
	}

	public void setAdmin(AdminInfo admin) {
		this.admin = admin;
	}

	
	public static class AdminInfo{
		private Long id;
		private String username;
		private String role;
		private String name;
		private String email;
		
		public AdminInfo(Long id, String username, String role, String name, String email) {
			this.id = id;
			this.username = username;
			this.role = role;
			this.name = name;
			this.email = email;
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

		@Override
		public String toString() {
			return "AdminInfo [id=" + id + ", username=" + username + ", role=" + role + ", name=" + name + ", email="
					+ email + "]";
		}
		
	}
	
	public static AdminRegisterResponse error(String message) {
		return new AdminRegisterResponse(false, message, null, null);
	}


	@Override
	public String toString() {
		return "AdminRegisterResponse [success=" + success + ", message=" + message + ", token=" + token + ", admin="
				+ admin + "]";
	}
	
	
}
