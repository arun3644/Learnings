package com.hospital.dto;

import java.time.LocalDateTime;

public class NotificationDTO {
    private String id;
    private String title;
    private String message;
    private String type; 
    private LocalDateTime timestamp;
    private String userId;
    private boolean read;

    public NotificationDTO() {
        this.timestamp = LocalDateTime.now();
        this.read = false;
    }

    public NotificationDTO(String title, String message, String type) {
        this();
        this.title = title;
        this.message = message;
        this.type = type;
    }

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public LocalDateTime getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(LocalDateTime timestamp) {
		this.timestamp = timestamp;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public boolean isRead() {
		return read;
	}

	public void setRead(boolean read) {
		this.read = read;
	}

}