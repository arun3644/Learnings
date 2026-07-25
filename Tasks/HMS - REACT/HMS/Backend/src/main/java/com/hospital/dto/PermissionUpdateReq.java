package com.hospital.dto;

import java.util.List;
import java.util.Map;

public class PermissionUpdateReq {
	private List<String> roles;
	private List<String> pages;
	private Map<String, Map<String, Boolean>> allowedPages;
	
	public PermissionUpdateReq() {
		super();
	}

	public PermissionUpdateReq(List<String> roles, List<String> pages, Map<String, Map<String, Boolean>> allowedPages) {
		super();
		this.roles = roles;
		this.pages = pages;
		this.allowedPages = allowedPages;
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
