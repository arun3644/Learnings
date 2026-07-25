package com.hospital.dto;

import java.util.List;
import java.util.Map;

public class PermissionsResponse {

    private List<String> roles;
    private List<String> pages;
    private Map<String, Map<String, Boolean>> allowedPages;
    private boolean success;
    private String error;
    private String message;

    public PermissionsResponse() {
    }

    public PermissionsResponse(boolean success, String error) {
        this.success = success;
        this.error = error;
    }

    public PermissionsResponse(
            List<String> roles,
            List<String> pages,
            Map<String, Map<String, Boolean>> allowedPages,
            boolean success,
            String error) {
        this.roles = roles;
        this.pages = pages;
        this.allowedPages = allowedPages;
        this.success = success;
        this.error = error;
    }
    
    public PermissionsResponse(
            List<String> roles,
            List<String> pages,
            Map<String, Map<String, Boolean>> allowedPages,
            boolean success,
            String error, String message) {
        this.roles = roles;
        this.pages = pages;
        this.allowedPages = allowedPages;
        this.success = success;
        this.error = error;
        this.message = message;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public List<String> getRoles() {
        return roles;
    }
    
    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

    public List<String> getPages() {
        return pages;
    }

    public void setPages(List<String> pages) {
        this.pages = pages;
    }

    public Map<String, Map<String, Boolean>> getAllowedPages() {
        return allowedPages;
    }

    public void setAllowedPages(Map<String, Map<String, Boolean>> allowedPages) {
        this.allowedPages = allowedPages;
    }
}