package com.hospital.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.Date;

public class MedicineRequest {

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

    @NotNull(message = "expiryAlertDays is required.")
    private Integer expiryAlertDays;

    @NotNull(message = "supplierId is required.")
    private Long supplierId;

    @NotNull(message = "purchasePrice is required.")
    private BigDecimal purchasePrice;

    @NotNull(message = "sellingPrice is required.")
    private BigDecimal sellingPrice;

    @NotNull(message = "stockCount is required.")
    private Integer stockCount;

    @NotNull(message = "minimumStockLevel is required.")
    private Integer minimumStockLevel;

    @NotNull(message = "reorderLevel is required.")
    private Integer reorderLevel;

    @NotNull(message = "maximumStockLevel is required.")
    private Integer maximumStockLevel;

    @NotNull(message = "availableStock is required.")
    private Integer availableStock;

    @NotNull(message = "isPrescriptionRequired is required.")
    private Boolean isPrescriptionRequired;

    @NotBlank(message = "storageLocation is required.")
    private String storageLocation;

    private String barcode;

    @NotBlank(message = "status is required.")
    private String status;

    @NotBlank(message = "createdBy is required.")
    private String createdBy;

    @NotBlank(message = "updatedBy is required.")
    private String updatedBy;
    
    public static class StockRequest{
    	
    	@NotNull(message = "stockCount is required.")
        private Integer stockCount;
    	
    	@NotNull(message = "remarks is required.")
    	private String remarks;

    	@NotNull(message = "transactionType is required.")
    	private String transactionType;

		public StockRequest(
				@NotNull(message = "stockCount is required.") Integer stockCount,
				@NotNull(message = "remarks is required.") String remarks,
				@NotNull(message = "transactionType is required.") String transactionType) {
			super();
			this.stockCount = stockCount;
			this.remarks = remarks;
			this.transactionType = transactionType;
		}
		
		public Integer getStockCount() {
			return stockCount;
		}

		public void setStockCount(Integer stockCount) {
			this.stockCount = stockCount;
		}

		public String getRemarks() {
			return remarks;
		}

		public void setRemarks(String remarks) {
			this.remarks = remarks;
		}

		public String getTransactionType() {
			return transactionType;
		}

		public void setTransactionType(String transactionType) {
			this.transactionType = transactionType;
		}

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

	public Integer getExpiryAlertDays() {
		return expiryAlertDays;
	}

	public void setExpiryAlertDays(Integer expiryAlertDays) {
		this.expiryAlertDays = expiryAlertDays;
	}

	public Long getSupplierId() {
		return supplierId;
	}

	public void setSupplierId(Long supplierId) {
		this.supplierId = supplierId;
	}

	public BigDecimal getPurchasePrice() {
		return purchasePrice;
	}

	public void setPurchasePrice(BigDecimal purchasePrice) {
		this.purchasePrice = purchasePrice;
	}

	public BigDecimal getSellingPrice() {
		return sellingPrice;
	}

	public void setSellingPrice(BigDecimal sellingPrice) {
		this.sellingPrice = sellingPrice;
	}

	public Integer getStockCount() {
		return stockCount;
	}

	public void setStockCount(Integer stockCount) {
		this.stockCount = stockCount;
	}

	public Integer getMinimumStockLevel() {
		return minimumStockLevel;
	}

	public void setMinimumStockLevel(Integer minimumStockLevel) {
		this.minimumStockLevel = minimumStockLevel;
	}

	public Integer getReorderLevel() {
		return reorderLevel;
	}

	public void setReorderLevel(Integer reorderLevel) {
		this.reorderLevel = reorderLevel;
	}

	public Integer getMaximumStockLevel() {
		return maximumStockLevel;
	}

	public void setMaximumStockLevel(Integer maximumStockLevel) {
		this.maximumStockLevel = maximumStockLevel;
	}

	public Integer getAvailableStock() {
		return availableStock;
	}

	public void setAvailableStock(Integer availableStock) {
		this.availableStock = availableStock;
	}

	public Boolean getIsPrescriptionRequired() {
		return isPrescriptionRequired;
	}

	public void setIsPrescriptionRequired(Boolean isPrescriptionRequired) {
		this.isPrescriptionRequired = isPrescriptionRequired;
	}

}
