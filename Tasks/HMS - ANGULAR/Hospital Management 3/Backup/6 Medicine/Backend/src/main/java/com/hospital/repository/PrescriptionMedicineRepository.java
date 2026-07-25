package com.hospital.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hospital.model.PrescriptionMedicines;

@Repository
public interface PrescriptionMedicineRepository
        extends JpaRepository<PrescriptionMedicines, Integer> {
	
	PrescriptionMedicines findByPrescription_PrescriptionId(int prescriptionId);
}