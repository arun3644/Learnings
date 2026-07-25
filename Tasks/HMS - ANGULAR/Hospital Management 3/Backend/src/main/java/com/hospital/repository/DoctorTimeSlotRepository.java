package com.hospital.repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.hospital.model.DoctorTimeSlot;

@Repository
public interface DoctorTimeSlotRepository extends JpaRepository<DoctorTimeSlot, Long> {
	
	List<DoctorTimeSlot> findByDoctorId(Long doctorId);
	
	List<DoctorTimeSlot> findByDoctorIdAndDate(Long doctorId, Date date);
	
	List<DoctorTimeSlot> findByDoctorIdAndDateAndIsAvailable(Long doctorId, Date date, Boolean isAvailable);
	
	List<DoctorTimeSlot> findByDoctorIdAndDateAndTimeSlotAndIsAvailable(Long doctorId, Date date, String timeSlot, Boolean isAvailable);
	
	Optional<DoctorTimeSlot> findByDoctorIdAndDateAndTimeSlot(Long doctorId, Date date, String timeSlot);
	
	List<DoctorTimeSlot> findByDoctorIdAndIsAvailable(Long doctorId, Boolean isAvailable);
	
	boolean existsByDoctorIdAndDateAndTimeSlot(Long doctorId, Date date, String timeSlot);
	
	@Transactional
	void deleteByDoctorId(Long doctorId);
	
	@Transactional
	void deleteByDoctorIdAndDate(Long doctorId, Date date);
}
