package com.hospital.dto;

public class LoginResponse {
	
	private boolean success;
	private String token;
	private UserInfo user;
	private String message;
	
	public LoginResponse(boolean success, String token, UserInfo user, String message) {
		this.success = success;
		this.token = token;
		this.user = user;
		this.message = message;
	}
	public LoginResponse(String token, Long id, String username,String name, String email, String role) {
		this.success = true;
		this.token = token;
		this.user = new UserInfo(id, username, name, email, role);
		this.message = "Login successful";
	}
	public static class UserInfo{
		private Long id;
		private String username;
		private String name;
		private String email;
		private String role;
		
		public UserInfo(Long id, String username, String name, String email, String role) {
			this.id = id;
			this.username = username;
			this.name = name;
			this.email = email;
			this.role = role;
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
		public String getRole() {
			return role;
		}
		public void setRole(String role) {
			this.role = role;
		}
		@Override
		public String toString() {
			return "UserInfo [id=" + id + ", username=" + username + ", name=" + name + ", email=" + email + ", role="
					+ role + "]";
		}
		
	}

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public UserInfo getUser() {
		return user;
	}

	public void setUser(UserInfo user) {
		this.user = user;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	@Override
	public String toString() {
		return "LoginResponse [success=" + success + ", token=" + token + ", user=" + user + ", message=" + message
				+ "]";
	}

	public static LoginResponse error(String message) {
		return new LoginResponse(false, null, null, message);
	}
	
}
