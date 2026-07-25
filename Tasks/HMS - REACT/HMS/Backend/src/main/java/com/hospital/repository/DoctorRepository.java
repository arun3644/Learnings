package com.hospital.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.hospital.model.Doctor;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
	
	Optional<Doctor> findByUsername(String username);
	
	Optional<Doctor> findById(Long id);
	
	Optional<Doctor> findByEmail(String email);
	
	boolean existsByEmail(String email);
	
	boolean existsByUsername(String username);
	
	boolean existsByPhoneNumber(String phoneNumber);
	
	@Query("SELECT d.specialization FROM Doctor d")
    List<String> findAllSpecializations();
	
	@Query("SELECT d.yearsOfExperience FROM Doctor d")
	List<Integer> findAllYearsOfExperience();
}
