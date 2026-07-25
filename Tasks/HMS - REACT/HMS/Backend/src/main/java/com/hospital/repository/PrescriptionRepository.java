package com.hospital.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.hospital.model.Prescription;

@Repository
public interface PrescriptionRepository
        extends JpaRepository<Prescription, Integer> {

    @Query(value = """
            SELECT p.*, pm.*
            FROM prescriptions p
            LEFT JOIN prescription_medicines pm
            ON p.prescription_id = pm.prescription_id
            WHERE p.prescription_id = :id
            """,
            nativeQuery = true)
    List<Object[]> findPrescriptionWithMedicines(
            @Param("id") Integer id);
    
    Optional<Prescription> findByPrescriptionId(int prescription_id);
}