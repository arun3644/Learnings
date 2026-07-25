package com.hospital.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.dto.MedicineListResponse;
import com.hospital.dto.MedicineRequest;
import com.hospital.dto.MedicineResponse;
import com.hospital.dto.MedicineUpdateRequest;
import com.hospital.service.MedicineService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/medicines")
public class MedicineController {

    private final MedicineService medicineService;

    public MedicineController(MedicineService medicineService) {
        this.medicineService = medicineService;
    }

    @PostMapping
    public ResponseEntity<MedicineResponse> createMedicine(@Valid @RequestBody MedicineRequest request) {
        return ResponseEntity.ok(medicineService.createMedicine(request));
    }

    @GetMapping
    public ResponseEntity<MedicineListResponse> getAllMedicines() {
        return ResponseEntity.ok(medicineService.getAllMedicines());
    }

//    @GetMapping("/{id}")
//    public ResponseEntity<MedicineResponse> getMedicineById(@PathVariable Long id) {
//        return ResponseEntity.ok(medicineService.getMedicineById(id));
//    }
    
    @GetMapping("/{medicineCode}")
    public ResponseEntity<MedicineResponse> getMedicineById(@PathVariable String medicineCode) {
        return ResponseEntity.ok(medicineService.getMedicineByCode(medicineCode));
    }
    
    @GetMapping("/low-stock")
    public ResponseEntity<MedicineResponse.LowStockResponse> getLowStocks() {
        return ResponseEntity.ok(medicineService.getLowStocks());
    }

    @GetMapping("/expiring-soon")
    public ResponseEntity<MedicineResponse.ExpirySoonMedResponse> getExpirySoonStocks() {
        return ResponseEntity.ok(medicineService.getExpirySoonStocks());
    }
    
//    @PutMapping("/{id}")
//    public ResponseEntity<MedicineResponse> updateMedicine(
//            @PathVariable Long id,
//            @Valid @RequestBody MedicineRequest request) {
//        return ResponseEntity.ok(medicineService.updateMedicine(id, request));
//    }
    
    @PutMapping("/{medicineCode}")
    public ResponseEntity<MedicineResponse> updateMedicine(
            @PathVariable String medicineCode,
            @Valid @RequestBody MedicineRequest request) {
        return ResponseEntity.ok(medicineService.updateMedicine(medicineCode, request));
    }

    @PatchMapping("/{medicineCode}")
    public ResponseEntity<MedicineResponse> partialUpdateMedicine(
            @PathVariable String medicineCode,
            @RequestBody MedicineUpdateRequest request) {
        return ResponseEntity.ok(medicineService.partialUpdateMedicine(medicineCode, request));
    }
    
    @PatchMapping("/{medicineCode}/stock")
    public ResponseEntity<MedicineResponse.StockResponse> updateStock(@PathVariable String medicineCode, @Valid @RequestBody MedicineRequest.StockRequest request ){
      return ResponseEntity.ok(medicineService.updateStock(medicineCode, request));
    }

//    @DeleteMapping("/{id}")
//    public ResponseEntity<String> deleteMedicine(@PathVariable Long id) {
//        medicineService.deleteMedicine(id);
//        return ResponseEntity.ok("Medicine deleted successfully.");
//    }   
    
    @DeleteMapping("/{medicineCode}")
    public ResponseEntity<MedicineResponse> deleteMedicineByCode(@PathVariable String medicineCode){
    	return ResponseEntity.ok(medicineService.deleteMedicineByCode(medicineCode));
    }
}
