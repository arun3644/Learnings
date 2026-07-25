package com.hospital.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hospital.model.Admin;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
	
	Optional<Admin> findByUsername(String username);
	
	Optional<Admin> findByEmail(String email);
	
	boolean existsByEmail(String email);
	
	boolean existsByUsername(String username);
}
