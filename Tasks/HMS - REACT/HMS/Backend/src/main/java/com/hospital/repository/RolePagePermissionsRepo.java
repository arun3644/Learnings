package com.hospital.repository;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.hospital.model.RolePagePermissions;

public interface RolePagePermissionsRepo extends JpaRepository<RolePagePermissions, Integer> {

    List<RolePagePermissions> findByRole(String role);
    
    @Query("SELECT DISTINCT r.role FROM RolePagePermissions r")
    List<String> findRole();
    

	@Query("SELECT DISTINCT r.page FROM RolePagePermissions r")
	List<String> findPage();
	
	RolePagePermissions findByRoleAndPage(String role, String page);
}