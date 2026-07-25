package com.hospital.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.dto.PrescriptionRequest;
import com.hospital.dto.PrescriptionResponse;
import com.hospital.service.PrescriptionService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/prescription")
public class PrescriptionController {

    @Autowired
    private PrescriptionService prescriptionService;
    
    @PostMapping
    public ResponseEntity<PrescriptionResponse> createPrescription(
            @RequestBody PrescriptionRequest request) {

        PrescriptionResponse response =
                prescriptionService.createPrescription(request);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/{prescriptionId}")
    public ResponseEntity<PrescriptionResponse> updatePrescription( 
    		@PathVariable int prescriptionId,
            @RequestBody PrescriptionRequest requestDTO) {

        PrescriptionResponse response = prescriptionService.updatePrescription( prescriptionId, requestDTO);

        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{prescriptionId}/cancel")
    public ResponseEntity<PrescriptionResponse.CancelPrescriptionResponse> cancelPrescription(
            @PathVariable int prescriptionId,
            @RequestBody @Valid PrescriptionRequest.CancelPrescriptionRequest request) {

        PrescriptionResponse.CancelPrescriptionResponse res = prescriptionService.cancelPrescription(prescriptionId, request);

        return ResponseEntity.ok(res);
    }
   
    @GetMapping("/{prescriptionId}")
    public ResponseEntity<PrescriptionResponse> getPrescriptionById(
            @PathVariable int prescriptionId) {

        PrescriptionResponse response =
                prescriptionService.getPrescriptionById(prescriptionId);

        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<PrescriptionResponse>> getAllPrescriptions() {

        List<PrescriptionResponse> prescriptions =
                prescriptionService.getAllPrescriptions();

        return ResponseEntity.ok(prescriptions);
    }
}