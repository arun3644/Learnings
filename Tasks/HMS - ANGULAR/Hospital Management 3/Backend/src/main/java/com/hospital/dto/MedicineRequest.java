package com.hospital.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.Date;

public class MedicineRequest {

    @NotNull(message = "medicineId is required.")
    private Long medicineId;

    @NotBlank(message = "medicineCode is required.")
    private String medicineCode;

    @NotBlank(message = "medicineName is required.")
    private String medicineName;

    @NotBlank(message = "genericName is required.")
    private String genericName;

    @NotBlank(message = "brandName is required.")
    private String brandName;

    @NotBlank(message = "category is required.")
    private String category;

    @NotBlank(message = "dosageForm is required.")
    private String dosageForm;

    @NotBlank(message = "strength is required.")
    private String strength;

    @NotBlank(message = "batchNumber is required.")
    private String batchNumber;

    @NotNull(message = "manufacturedDate is required.")
    private Date manufacturedDate;

    @NotNull(message = "expiryDate is required.")
    private Date expiryDate;

    @NotBlank(message = "storageLocation is required.")
    private String storageLocation;

    private String barcode;

    @NotBlank(message = "status is required.")
    private String status;

    @NotBlank(message = "createdBy is required.")
    private String createdBy;

    @NotBlank(message = "updatedBy is required.")
    private String updatedBy;

	public Long getMedicineId() {
		return medicineId;
	}

	public void setMedicineId(Long medicineId) {
		this.medicineId = medicineId;
	}

	public String getMedicineCode() {
		return medicineCode;
	}

	public void setMedicineCode(String medicineCode) {
		this.medicineCode = medicineCode;
	}

	public String getMedicineName() {
		return medicineName;
	}

	public void setMedicineName(String medicineName) {
		this.medicineName = medicineName;
	}

	public String getGenericName() {
		return genericName;
	}

	public void setGenericName(String genericName) {
		this.genericName = genericName;
	}

	public String getBrandName() {
		return brandName;
	}

	public void setBrandName(String brandName) {
		this.brandName = brandName;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getDosageForm() {
		return dosageForm;
	}

	public void setDosageForm(String dosageForm) {
		this.dosageForm = dosageForm;
	}

	public String getStrength() {
		return strength;
	}

	public void setStrength(String strength) {
		this.strength = strength;
	}

	public String getBatchNumber() {
		return batchNumber;
	}

	public void setBatchNumber(String batchNumber) {
		this.batchNumber = batchNumber;
	}

	public Date getManufacturedDate() {
		return manufacturedDate;
	}

	public void setManufacturedDate(Date manufacturedDate) {
		this.manufacturedDate = manufacturedDate;
	}

	public Date getExpiryDate() {
		return expiryDate;
	}

	public void setExpiryDate(Date expiryDate) {
		this.expiryDate = expiryDate;
	}

	public String getStorageLocation() {
		return storageLocation;
	}

	public void setStorageLocation(String storageLocation) {
		this.storageLocation = storageLocation;
	}

	public String getBarcode() {
		return barcode;
	}

	public void setBarcode(String barcode) {
		this.barcode = barcode;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public String getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(String updatedBy) {
		this.updatedBy = updatedBy;
	}

}
