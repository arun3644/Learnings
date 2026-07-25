package com.hospital.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hospital.model.Patient;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
	
	Optional<Patient> findByUsername(String username);
	
	Optional<Patient> findByEmail(String email);
	
	boolean existsByEmail(String email);
	
	boolean existsByUsername(String username);
}
