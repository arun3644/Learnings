package com.hospital.service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hospital.dto.MedicineListResponse;
import com.hospital.dto.MedicineRequest;
import com.hospital.dto.MedicineResponse;
import com.hospital.dto.MedicineResponse.MedicineData;
import com.hospital.dto.MedicineUpdateRequest;
import com.hospital.model.Medicine;
import com.hospital.repository.MedicineRepository;

@Service
public class MedicineService {

    private final MedicineRepository medicineRepository;

    public MedicineService(MedicineRepository medicineRepository) {
        this.medicineRepository = medicineRepository;
    }
    
    public MedicineResponse createMedicine(MedicineRequest request) {
        if (medicineRepository.existsByMedicineCode(request.getMedicineCode())) {
            return new MedicineResponse(false, "Medicine with code " + request.getMedicineCode() + " already exists");
        }

        Medicine medicine = new Medicine();
        medicine.setMedicineCode(request.getMedicineCode());
        medicine.setMedicineName(request.getMedicineName());
        medicine.setGenericName(request.getGenericName());
        medicine.setBrandName(request.getBrandName());
        medicine.setCategory(request.getCategory());
        medicine.setDosageForm(request.getDosageForm());
        medicine.setStrength(request.getStrength());
        medicine.setBatchNumber(request.getBatchNumber());
        medicine.setManufacturedDate(request.getManufacturedDate());
        medicine.setExpiryDate(request.getExpiryDate());
        medicine.setExpiryAlertDays(request.getExpiryAlertDays());
        medicine.setSupplierId(request.getSupplierId());
        medicine.setPurchasePrice(request.getPurchasePrice());
        medicine.setSellingPrice(request.getSellingPrice());
        medicine.setStockCount(request.getStockCount());
        medicine.setMinimumStockLevel(request.getMinimumStockLevel());
        medicine.setReorderLevel(request.getReorderLevel());
        medicine.setMaximumStockLevel(request.getMaximumStockLevel());
        medicine.setAvailableStock(request.getAvailableStock());
        medicine.setIsPrescriptionRequired(request.getIsPrescriptionRequired());
        medicine.setStorageLocation(request.getStorageLocation());
        medicine.setBarcode(request.getBarcode());
        medicine.setStatus(request.getStatus());
        medicine.setCreatedBy(request.getCreatedBy());
        medicine.setUpdatedBy(request.getUpdatedBy());

        Medicine savedMedicine = medicineRepository.save(medicine);
        return new MedicineResponse(true, "Medicine created successfully", convertToMedicineData(savedMedicine));
    }

    public MedicineListResponse getAllMedicines() {
    	List<MedicineData> medicines = medicineRepository.findAll().stream()
                .map(this::convertToMedicineData)
                .collect(Collectors.toList());
        return new MedicineListResponse(true, "Success", medicines);
    }

    public MedicineResponse getMedicineById(Long id) {
        Medicine medicine = medicineRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Medicine not found with id: " + id));
        return new MedicineResponse(true, "Medicine retrieved successfully", convertToMedicineData(medicine));
    }
    
    public MedicineResponse.LowStockResponse getLowStocks() {
    	
    	List<MedicineResponse.LowStockResponse.LowStockData> lowStockMedicine = medicineRepository.findAll().stream()
    			.filter(med -> med.getAvailableStock() < med.getMinimumStockLevel())
    			.map(this::convertToLowMedicineList)
    			.collect(Collectors.toList());
    	return new MedicineResponse.LowStockResponse(true, "Low stock medicines retrieved successfully", lowStockMedicine);
    	
    }
    
    
    public MedicineResponse.ExpirySoonMedResponse getExpirySoonStocks() {
    	
    	List<MedicineResponse.ExpirySoonMedResponse.ExpirySoonMed> expirySoonMed = medicineRepository.findAll().stream()
    			.map(this::convertToExpirySoonData)
    			.filter(med -> med.getDaysUntilExpiry() <  100)
    			.collect(Collectors.toList());
    	return new MedicineResponse.ExpirySoonMedResponse(true, "Expiring medicines retrieved successfully", expirySoonMed);
    }

    public MedicineResponse getMedicineByCode(String code) {
    	 Medicine medicine = medicineRepository.findByMedicineCode(code)
    	            .orElseThrow(() -> new RuntimeException("Medicine not found with code: " + code));
    	        return new MedicineResponse(true, "Medicine retrieved successfully", convertToMedicineData(medicine));
    }
    
    @Transactional
    public MedicineResponse updateMedicine(String code, MedicineRequest request) {
        Medicine medicine = medicineRepository.findByMedicineCode(code)
            .orElseThrow(() -> new RuntimeException("Medicine not found with code: " + code));

        medicine.setMedicineCode(request.getMedicineCode());
        medicine.setMedicineName(request.getMedicineName());
        medicine.setGenericName(request.getGenericName());
        medicine.setBrandName(request.getBrandName());
        medicine.setCategory(request.getCategory());
        medicine.setDosageForm(request.getDosageForm());
        medicine.setStrength(request.getStrength());
        medicine.setBatchNumber(request.getBatchNumber());
        medicine.setManufacturedDate(request.getManufacturedDate());
        medicine.setExpiryDate(request.getExpiryDate());
        medicine.setExpiryAlertDays(request.getExpiryAlertDays());
        medicine.setSupplierId(request.getSupplierId());
        medicine.setPurchasePrice(request.getPurchasePrice());
        medicine.setSellingPrice(request.getSellingPrice());
        medicine.setStockCount(request.getStockCount());
        medicine.setMinimumStockLevel(request.getMinimumStockLevel());
        medicine.setReorderLevel(request.getReorderLevel());
        medicine.setMaximumStockLevel(request.getMaximumStockLevel());
        medicine.setAvailableStock(request.getAvailableStock());
        medicine.setIsPrescriptionRequired(request.getIsPrescriptionRequired());
        medicine.setStorageLocation(request.getStorageLocation());
        medicine.setBarcode(request.getBarcode());
        medicine.setStatus(request.getStatus());
        medicine.setUpdatedBy(request.getUpdatedBy());

        Medicine updatedMedicine = medicineRepository.save(medicine);
        return new MedicineResponse(true, "Medicine updated successfully", convertToMedicineData(updatedMedicine));
    }

    @Transactional
    public MedicineResponse partialUpdateMedicine(String code, MedicineUpdateRequest request) {
        Medicine medicine = medicineRepository.findByMedicineCode(code)
            .orElseThrow(() -> new RuntimeException("Medicine not found with code: " + code));

        if (request.getMedicineCode() != null) medicine.setMedicineCode(request.getMedicineCode());
        if (request.getMedicineName() != null) medicine.setMedicineName(request.getMedicineName());
        if (request.getGenericName() != null) medicine.setGenericName(request.getGenericName());
        if (request.getBrandName() != null) medicine.setBrandName(request.getBrandName());
        if (request.getCategory() != null) medicine.setCategory(request.getCategory());
        if (request.getDosageForm() != null) medicine.setDosageForm(request.getDosageForm());
        if (request.getStrength() != null) medicine.setStrength(request.getStrength());
        if (request.getBatchNumber() != null) medicine.setBatchNumber(request.getBatchNumber());
        if (request.getManufacturedDate() != null) medicine.setManufacturedDate(request.getManufacturedDate());
        if (request.getExpiryDate() != null) medicine.setExpiryDate(request.getExpiryDate());
        if (request.getExpiryAlertDays() != null) medicine.setExpiryAlertDays(request.getExpiryAlertDays());
        if (request.getSupplierId() != null) medicine.setSupplierId(request.getSupplierId());
        if (request.getPurchasePrice() != null) medicine.setPurchasePrice(request.getPurchasePrice());
        if (request.getSellingPrice() != null) medicine.setSellingPrice(request.getSellingPrice());
        if (request.getStockCount() != null) medicine.setStockCount(request.getStockCount());
        if (request.getMinimumStockLevel() != null) medicine.setMinimumStockLevel(request.getMinimumStockLevel());
        if (request.getReorderLevel() != null) medicine.setReorderLevel(request.getReorderLevel());
        if (request.getMaximumStockLevel() != null) medicine.setMaximumStockLevel(request.getMaximumStockLevel());
        if (request.getAvailableStock() != null) medicine.setAvailableStock(request.getAvailableStock());
        if (request.getIsPrescriptionRequired() != null) medicine.setIsPrescriptionRequired(request.getIsPrescriptionRequired());
        if (request.getStorageLocation() != null) medicine.setStorageLocation(request.getStorageLocation());
        if (request.getBarcode() != null) medicine.setBarcode(request.getBarcode());
        if (request.getStatus() != null) medicine.setStatus(request.getStatus());
        if (request.getUpdatedBy() != null) medicine.setUpdatedBy(request.getUpdatedBy());

        Medicine updatedMedicine = medicineRepository.save(medicine);
        return new MedicineResponse(true, "Medicine updated successfully", convertToMedicineData(updatedMedicine));
    }

    @Transactional
    public void Medicine(Long id) {
        if (!medicineRepository.existsById(id)) {
            throw new RuntimeException("Medicine not found with id: " + id);
        }
        medicineRepository.deleteById(id);
    }
    
    @Transactional
    public MedicineResponse deleteMedicineByCode(String code) {
    	if(!medicineRepository.existsByMedicineCode(code)) {
    		throw new RuntimeException("Medicine not found with code: " + code);
    	}

    	medicineRepository.deleteByMedicineCode(code);
    	return new MedicineResponse(true, "Medicine deleted successfully with code: "+ code);
    }
    
    
    
    @Transactional
    public MedicineResponse.StockResponse updateStock(String code, MedicineRequest.StockRequest request){
    	Medicine medicine = medicineRepository.findByMedicineCode(code)
    			.orElseThrow(() -> new RuntimeException("Medicine not found with code: " + code));

    	int previousStock = medicine.getStockCount();
    	
    	medicine.setStockCount(medicine.getAvailableStock() + request.getStockCount());
    	medicine.setAvailableStock(medicine.getAvailableStock() + request.getStockCount());
    	medicine.setTransactionType(request.getTransactionType()); 
    	medicine.setRemarks(request.getRemarks());
    	
    	Medicine updatedMedicine = medicineRepository.save(medicine);
    	
    	MedicineResponse.StockResponse.StockData stockData = new MedicineResponse.StockResponse.StockData(
    			updatedMedicine.getMedicineCode(),
    			updatedMedicine.getMedicineName(),
    			previousStock,
    			request.getStockCount(),
    			updatedMedicine.getAvailableStock(),
    			updatedMedicine.getUpdatedAt()
    			);
    	
    	return new MedicineResponse.StockResponse(true, "Stock Updated Successfully.", stockData);
    }
    
    private MedicineResponse.LowStockResponse.LowStockData  convertToLowMedicineList(Medicine medicine) {
    	return new MedicineResponse.LowStockResponse.LowStockData(
    			medicine.getMedicineCode(), 
                medicine.getMedicineName(),
                medicine.getAvailableStock(), 
                medicine.getMinimumStockLevel(),
                medicine.getReorderLevel(),
                medicine.getStatus()
                );
    }
    
    @Transactional
    private MedicineResponse.ExpirySoonMedResponse.ExpirySoonMed convertToExpirySoonData(Medicine medicine){
    	Date expiry = medicine.getExpiryDate();

    	LocalDate expiryDate = expiry.toInstant()
    	        .atZone(ZoneId.systemDefault())
    	        .toLocalDate();

    	LocalDate currentDate = LocalDate.now();

    	long daysRemaining = ChronoUnit.DAYS.between(currentDate, expiryDate);
    	
    	if (daysRemaining < 0) {
    	    medicine.setStatus("Already Expired!");
    	} else if (daysRemaining <= 30) {
    	    medicine.setStatus("Near Expiry");
    	} else {
    	    medicine.setStatus("Not Expired");
    	}
    	
    	Medicine updatedMedicine = medicineRepository.save(medicine);

    	return new MedicineResponse.ExpirySoonMedResponse.ExpirySoonMed(
    			updatedMedicine.getMedicineCode(), 
    			updatedMedicine.getMedicineName(),
    			updatedMedicine.getBatchNumber(),
    			updatedMedicine.getExpiryDate(),
    			daysRemaining,
                updatedMedicine.getAvailableStock(),
                updatedMedicine.getStatus()
    			);
    }
    
    private MedicineData convertToMedicineData(Medicine medicine) {
        return new MedicineData(
            medicine.getMedicineId(),
            medicine.getMedicineCode(),
            medicine.getMedicineName(),
            medicine.getGenericName(),
            medicine.getBrandName(),
            medicine.getCategory(),
            medicine.getDosageForm(),
            medicine.getStrength(),
            medicine.getBatchNumber(),
            medicine.getManufacturedDate(),
            medicine.getExpiryDate(),
            medicine.getExpiryAlertDays(),
            medicine.getIsNearExpiry(),
            medicine.getIsExpired(),
            medicine.getSupplierId(),
            medicine.getPurchasePrice(),
            medicine.getSellingPrice(),
            medicine.getStockCount(),
            medicine.getMinimumStockLevel(),
            medicine.getReorderLevel(),
            medicine.getMaximumStockLevel(),
            medicine.getReservedStock(),
            medicine.getAvailableStock(),
            medicine.getDamagedStock(),
            medicine.getReturnedStock(),
            medicine.getStorageLocation(),
            medicine.getBarcode(),
            medicine.getIsPrescriptionRequired(),
            medicine.getStatus(),
            medicine.getCreatedAt(),
            medicine.getUpdatedAt(),
            medicine.getCreatedBy(),
            medicine.getUpdatedBy()
        );
    }
}
