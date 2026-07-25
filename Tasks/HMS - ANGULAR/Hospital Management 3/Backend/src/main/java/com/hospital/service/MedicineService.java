package com.hospital.service;

import java.util.List;
import com.hospital.dto.MedicineRequest;
import com.hospital.dto.MedicineResponse;

public interface MedicineService {

    MedicineResponse createMedicine(MedicineRequest request);

    List<MedicineResponse> getAllMedicines();

    MedicineResponse getMedicineById(Long id);

    MedicineResponse updateMedicine(Long id, MedicineRequest request);


    void deleteMedicine(Long id);
}
