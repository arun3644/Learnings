package com.hospital.dto;

import java.util.Map;

public class RolePermissionResponse {

    private Map<String, Boolean> permissions;

    public RolePermissionResponse() {}

    public RolePermissionResponse(Map<String, Boolean> permissions) {
        this.permissions = permissions;
    }

    public Map<String, Boolean> getPermissions() {
        return permissions;
    }

    public void setPermissions(Map<String, Boolean> permissions) {
        this.permissions = permissions;
    }
}
