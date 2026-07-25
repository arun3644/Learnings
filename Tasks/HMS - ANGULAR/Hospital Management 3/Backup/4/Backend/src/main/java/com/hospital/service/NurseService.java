package com.hospital.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.hospital.dto.NurseRegisterRequest;
import com.hospital.dto.NurseRegisterResponse;
import com.hospital.dto.NurseResponse;
import com.hospital.dto.NurseUpdateRequest;
import com.hospital.model.Nurse;
import com.hospital.repository.NurseRepository;
import com.hospital.security.JwtUtil;

@Service
public class NurseService {
	
	private final NurseRepository nurseRepository;
	private final JwtUtil jwtUtil;
	
	public NurseService(NurseRepository nurseRepository, JwtUtil jwtUtil) {
		this.nurseRepository = nurseRepository;
		this.jwtUtil = jwtUtil;
	}
	
	public NurseRegisterResponse register(NurseRegisterRequest request) {
		
		if (nurseRepository.existsByUsername(request.getUsername())) 
			return NurseRegisterResponse.error("Username already exists");
		
		if (nurseRepository.existsByEmail(request.getEmail()))
			return NurseRegisterResponse.error("Email already exists");
		
		Nurse newNurse = new Nurse();
		newNurse.setUsername(request.getUsername());
		newNurse.setEmail(request.getEmail());
		newNurse.setName(request.getName());
		newNurse.setPassword(request.getPassword());
		newNurse.setDepartment(request.getDepartment());
		newNurse.setYearsOfExperience(request.getYearsOfExperience());
		newNurse.setPhoneNumber(request.getPhoneNumber());
		newNurse.setShift(request.getShift());
		newNurse.setCreatedAt(new Date());
		newNurse.setUpdatedAt(new Date());
		
		Nurse savedNurse = nurseRepository.save(newNurse);
		
		String token = jwtUtil.generateToken(savedNurse.getUsername(), "Nurse", savedNurse.getName());
		
		NurseRegisterResponse.NurseInfo nurseInfo = new NurseRegisterResponse.NurseInfo(
			savedNurse.getId(),
			savedNurse.getUsername(),
			"Nurse",
			savedNurse.getName(),
			savedNurse.getEmail(),
			savedNurse.getDepartment(),
			savedNurse.getYearsOfExperience(),
			savedNurse.getPhoneNumber()
		);
		
		return new NurseRegisterResponse(true, "Nurse registered successfully", token, nurseInfo);
	}
	public Nurse findByUsername(String username) {
		return nurseRepository.findByUsername(username).orElse(null);
	}
	
	public List<NurseResponse> getAllNurses() {
		List<Nurse> nurses = nurseRepository.findAll();
		return nurses.stream()
			.map(nurse -> new NurseResponse(
				nurse.getId(),
				nurse.getUsername(),
				nurse.getName(),
				nurse.getEmail(),
				nurse.getDepartment(),
				nurse.getShift(),
				nurse.getPhoneNumber(),
				nurse.getCreatedAt() != null ? nurse.getCreatedAt().toString() : null,
				nurse.getUpdatedAt() != null ? nurse.getUpdatedAt().toString() : null
			))
			.collect(Collectors.toList());
	}
	
	public NurseResponse getNurseById(Long id) {
		Optional<Nurse> nurseOpt = nurseRepository.findById(id);
		if (!nurseOpt.isPresent()) {
			return new NurseResponse("Error", "Nurse not found with Id: " + id);
		}
		
		Nurse nurse = nurseOpt.get();
		return new NurseResponse(
			nurse.getId(),
			nurse.getUsername(),
			nurse.getName(),
			nurse.getEmail(),
			nurse.getDepartment(),
			nurse.getShift(),
			nurse.getPhoneNumber(),
			nurse.getCreatedAt() != null ? nurse.getCreatedAt().toString() : null,
			nurse.getUpdatedAt() != null ? nurse.getUpdatedAt().toString() : null
		);
	}
	
	public NurseResponse updateNurse(Long id, NurseUpdateRequest request) {
		Optional<Nurse> nurseOpt = nurseRepository.findById(id);
		if (!nurseOpt.isPresent()) {
			return new NurseResponse("Error", "Nurse not found with Id: " + id);
		}
		
		Nurse nurse = nurseOpt.get();
		
		if (request.getName() != null) {
			nurse.setName(request.getName());
		}
		if (request.getEmail() != null) {
			nurse.setEmail(request.getEmail());
		}
		if (request.getDepartment() != null) {
			nurse.setDepartment(request.getDepartment());
		}
		if (request.getShift() != null) {
			nurse.setShift(request.getShift());
		}
		if (request.getPhoneNumber() != null) {
			nurse.setPhoneNumber(request.getPhoneNumber());
		}
		
		nurse.setUpdatedAt(new Date());
		Nurse updatedNurse = nurseRepository.save(nurse);
		
		return new NurseResponse(
			updatedNurse.getId(),
			updatedNurse.getUsername(),
			updatedNurse.getName(),
			updatedNurse.getEmail(),
			updatedNurse.getDepartment(),
			updatedNurse.getShift(),
			updatedNurse.getPhoneNumber(),
			updatedNurse.getCreatedAt() != null ? updatedNurse.getCreatedAt().toString() : null,
			updatedNurse.getUpdatedAt() != null ? updatedNurse.getUpdatedAt().toString() : null
		);
	}
	
	public NurseResponse deleteNurse(Long id) {
		Optional<Nurse> nurseOpt = nurseRepository.findById(id);
		if (!nurseOpt.isPresent()) {
			return new NurseResponse("Error", "Nurse not found with Id: " + id);
		}
		
		nurseRepository.deleteById(id);
		return new NurseResponse("Success", "Nurse deleted successfully");
	}

}
