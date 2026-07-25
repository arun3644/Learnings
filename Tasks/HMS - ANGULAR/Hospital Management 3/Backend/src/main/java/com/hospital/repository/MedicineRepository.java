package com.hospital.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hospital.model.Medicine;

@Repository()
public interface MedicineRepository extends JpaRepository<Medicine, Long>{

	Medicine findByMedicineCode(String medicineCode);
	
	boolean existsByMedicineCode(String medicineCode);
}
