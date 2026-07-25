package com.hospital.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.hospital.dto.AdminRegisterRequest;
import com.hospital.dto.AdminRegisterResponse;
import com.hospital.dto.AdminResponse;
import com.hospital.dto.AdminUpdateRequest;
import com.hospital.model.Admin;
import com.hospital.repository.AdminRepository;
import com.hospital.security.JwtUtil;


@Service
public class AdminService {
	
	private  final AdminRepository adminRepository;
	private final JwtUtil jwtUtil;
	
	public AdminService(AdminRepository adminRepository, JwtUtil jwtUtil) {
	     this.adminRepository = adminRepository;
	     this.jwtUtil = jwtUtil;
	 }
	public AdminRegisterResponse register(AdminRegisterRequest request) {
		
		if(adminRepository.existsByUsername(request.getUsername())) 
			return AdminRegisterResponse.error("UserName already exists");
		
		if(adminRepository.existsByEmail(request.getEmail()))
			return AdminRegisterResponse.error("Email already exists");
		
		Admin newUser = new Admin();
		newUser.setUsername(request.getUsername());
		newUser.setEmail(request.getEmail());
		newUser.setName(request.getName());
		newUser.setPassword(request.getPassword());
		newUser.setCreatedAt(new Date());
		newUser.setUpdatedAt(new Date());
		
		Admin savedAdmin = adminRepository.save(newUser);
		
		String token = jwtUtil.generateToken(savedAdmin.getUsername(), "Admin", savedAdmin.getName());
		
		AdminRegisterResponse.AdminInfo adminInfo = new AdminRegisterResponse.AdminInfo(
			savedAdmin.getId(),
			savedAdmin.getUsername(),
			"Admin",
			savedAdmin.getName(),
			savedAdmin.getEmail()
		);
		
		return new AdminRegisterResponse(true, "Admin registered successfully", token, adminInfo);
	}
	
	public Admin findByUsername(String username) {
		return adminRepository.findByUsername(username).orElse(null);
	}
	
	public List<AdminResponse> getAllAdmins() {
		List<Admin> admins = adminRepository.findAll();
		return admins.stream()
			.map(admin -> new AdminResponse(
				admin.getId(),
				admin.getUsername(),
				admin.getName(),
				admin.getEmail(),
				admin.getDepartment(),
				admin.getPhoneNumber(),
				admin.getCreatedAt() != null ? admin.getCreatedAt().toString() : null,
				admin.getUpdatedAt() != null ? admin.getUpdatedAt().toString() : null
			))
			.collect(Collectors.toList());
	}
	
	public AdminResponse getAdminById(Long id) {
		Optional<Admin> adminOpt = adminRepository.findById(id);
		if (!adminOpt.isPresent()) {
			return new AdminResponse("Error", "Admin not found with Id: " + id);
		}
		
		Admin admin = adminOpt.get();
		return new AdminResponse(
			admin.getId(),
			admin.getUsername(),
			admin.getName(),
			admin.getEmail(),
			admin.getDepartment(),
			admin.getPhoneNumber(),
			admin.getCreatedAt() != null ? admin.getCreatedAt().toString() : null,
			admin.getUpdatedAt() != null ? admin.getUpdatedAt().toString() : null
		);
	}
	
	public AdminResponse updateAdmin(Long id, AdminUpdateRequest request) {
		Optional<Admin> adminOpt = adminRepository.findById(id);
		if (!adminOpt.isPresent()) {
			return new AdminResponse("Error", "Admin not found with Id: " + id);
		}
		
		Admin admin = adminOpt.get();
		
		if (request.getName() != null) {
			admin.setName(request.getName());
		}
		if (request.getEmail() != null) {
			admin.setEmail(request.getEmail());
		}
		if (request.getDepartment() != null) {
			admin.setDepartment(request.getDepartment());
		}
		if (request.getPhoneNumber() != null) {
			admin.setPhoneNumber(request.getPhoneNumber());
		}
		
		admin.setUpdatedAt(new Date());
		Admin updatedAdmin = adminRepository.save(admin);
		
		return new AdminResponse(
			updatedAdmin.getId(),
			updatedAdmin.getUsername(),
			updatedAdmin.getName(),
			updatedAdmin.getEmail(),
			updatedAdmin.getDepartment(),
			updatedAdmin.getPhoneNumber(),
			updatedAdmin.getCreatedAt() != null ? updatedAdmin.getCreatedAt().toString() : null,
			updatedAdmin.getUpdatedAt() != null ? updatedAdmin.getUpdatedAt().toString() : null
		);
	}
	
	public AdminResponse deleteAdmin(Long id) {
		Optional<Admin> adminOpt = adminRepository.findById(id);
		if (!adminOpt.isPresent()) {
			return new AdminResponse("Error", "Admin not found with Id: " + id);
		}
		
		adminRepository.deleteById(id);
		return new AdminResponse("Success", "Admin deleted successfully");
	}
}
