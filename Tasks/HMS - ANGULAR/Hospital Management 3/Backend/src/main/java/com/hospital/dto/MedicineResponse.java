package com.hospital.dto;

import java.math.BigDecimal;
import java.util.Date;

public class MedicineResponse {
    private boolean success;
    private String message;
    private MedicineData data;

    public MedicineResponse(boolean success, String message, MedicineData data) {
        this.success = success;
        this.message = message;
        this.data = data;
    }

    public MedicineResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public static class MedicineData {
        private Long medicineId;
        private String medicineCode;
        private String medicineName;
        private String genericName;
        private String brandName;
        private String category;
        private String dosageForm;
        private String strength;
        private String batchNumber;
        private Date manufacturedDate;
        private Date expiryDate;
        private Integer expiryAlertDays;
        private Boolean isNearExpiry;
        private Boolean isExpired;
        private Long supplierId;
        private BigDecimal purchasePrice;
        private BigDecimal sellingPrice;
        private Integer stockCount;
        private Integer minimumStockLevel;
        private Integer reorderLevel;
        private Integer maximumStockLevel;
        private Integer reservedStock;
        private Integer availableStock;
        private Integer damagedStock;
        private Integer returnedStock;
        private String storageLocation;
        private String barcode;
        private Boolean isPrescriptionRequired;
        private String status;
        private Date createdAt;
        private Date updatedAt;
        private String createdBy;
        private String updatedBy;

        public MedicineData(Long medicineId, String medicineCode, String medicineName, String genericName,
                            String brandName, String category, String dosageForm, String strength, String batchNumber,
                            Date manufacturedDate, Date expiryDate, Integer expiryAlertDays, Boolean isNearExpiry,
                            Boolean isExpired, Long supplierId, BigDecimal purchasePrice, BigDecimal sellingPrice,
                            Integer stockCount, Integer minimumStockLevel, Integer reorderLevel, Integer maximumStockLevel,
                            Integer reservedStock, Integer availableStock, Integer damagedStock, Integer returnedStock,
                            String storageLocation, String barcode, Boolean isPrescriptionRequired, String status,
                            Date createdAt, Date updatedAt, String createdBy, String updatedBy) {
            this.medicineId = medicineId;
            this.medicineCode = medicineCode;
            this.medicineName = medicineName;
            this.genericName = genericName;
            this.brandName = brandName;
            this.category = category;
            this.dosageForm = dosageForm;
            this.strength = strength;
            this.batchNumber = batchNumber;
            this.manufacturedDate = manufacturedDate;
            this.expiryDate = expiryDate;
            this.expiryAlertDays = expiryAlertDays;
            this.isNearExpiry = isNearExpiry;
            this.isExpired = isExpired;
            this.supplierId = supplierId;
            this.purchasePrice = purchasePrice;
            this.sellingPrice = sellingPrice;
            this.stockCount = stockCount;
            this.minimumStockLevel = minimumStockLevel;
            this.reorderLevel = reorderLevel;
            this.maximumStockLevel = maximumStockLevel;
            this.reservedStock = reservedStock;
            this.availableStock = availableStock;
            this.damagedStock = damagedStock;
            this.returnedStock = returnedStock;
            this.storageLocation = storageLocation;
            this.barcode = barcode;
            this.isPrescriptionRequired = isPrescriptionRequired;
            this.status = status;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
            this.createdBy = createdBy;
            this.updatedBy = updatedBy;
        }

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

		public Integer getExpiryAlertDays() {
			return expiryAlertDays;
		}

		public void setExpiryAlertDays(Integer expiryAlertDays) {
			this.expiryAlertDays = expiryAlertDays;
		}

		public Boolean getIsNearExpiry() {
			return isNearExpiry;
		}

		public void setIsNearExpiry(Boolean isNearExpiry) {
			this.isNearExpiry = isNearExpiry;
		}

		public Boolean getIsExpired() {
			return isExpired;
		}

		public void setIsExpired(Boolean isExpired) {
			this.isExpired = isExpired;
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

		public Integer getReservedStock() {
			return reservedStock;
		}

		public void setReservedStock(Integer reservedStock) {
			this.reservedStock = reservedStock;
		}

		public Integer getAvailableStock() {
			return availableStock;
		}

		public void setAvailableStock(Integer availableStock) {
			this.availableStock = availableStock;
		}

		public Integer getDamagedStock() {
			return damagedStock;
		}

		public void setDamagedStock(Integer damagedStock) {
			this.damagedStock = damagedStock;
		}

		public Integer getReturnedStock() {
			return returnedStock;
		}

		public void setReturnedStock(Integer returnedStock) {
			this.returnedStock = returnedStock;
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

		public Boolean getIsPrescriptionRequired() {
			return isPrescriptionRequired;
		}

		public void setIsPrescriptionRequired(Boolean isPrescriptionRequired) {
			this.isPrescriptionRequired = isPrescriptionRequired;
		}

		public String getStatus() {
			return status;
		}

		public void setStatus(String status) {
			this.status = status;
		}

		public Date getCreatedAt() {
			return createdAt;
		}

		public void setCreatedAt(Date createdAt) {
			this.createdAt = createdAt;
		}

		public Date getUpdatedAt() {
			return updatedAt;
		}

		public void setUpdatedAt(Date updatedAt) {
			this.updatedAt = updatedAt;
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

		@Override
		public String toString() {
			return "MedicineData [medicineId=" + medicineId + ", medicineCode=" + medicineCode + ", medicineName="
					+ medicineName + ", genericName=" + genericName + ", brandName=" + brandName + ", category="
					+ category + ", dosageForm=" + dosageForm + ", strength=" + strength + ", batchNumber="
					+ batchNumber + ", manufacturedDate=" + manufacturedDate + ", expiryDate=" + expiryDate
					+ ", expiryAlertDays=" + expiryAlertDays + ", isNearExpiry=" + isNearExpiry + ", isExpired="
					+ isExpired + ", supplierId=" + supplierId + ", purchasePrice=" + purchasePrice + ", sellingPrice="
					+ sellingPrice + ", stockCount=" + stockCount + ", minimumStockLevel=" + minimumStockLevel
					+ ", reorderLevel=" + reorderLevel + ", maximumStockLevel=" + maximumStockLevel + ", reservedStock="
					+ reservedStock + ", availableStock=" + availableStock + ", damagedStock=" + damagedStock
					+ ", returnedStock=" + returnedStock + ", storageLocation=" + storageLocation + ", barcode="
					+ barcode + ", isPrescriptionRequired=" + isPrescriptionRequired + ", status=" + status
					+ ", createdAt=" + createdAt + ", updatedAt=" + updatedAt + ", createdBy=" + createdBy
					+ ", updatedBy=" + updatedBy + ", getMedicineId()=" + getMedicineId() + ", getMedicineCode()="
					+ getMedicineCode() + ", getMedicineName()=" + getMedicineName() + ", getGenericName()="
					+ getGenericName() + ", getBrandName()=" + getBrandName() + ", getCategory()=" + getCategory()
					+ ", getDosageForm()=" + getDosageForm() + ", getStrength()=" + getStrength()
					+ ", getBatchNumber()=" + getBatchNumber() + ", getManufacturedDate()=" + getManufacturedDate()
					+ ", getExpiryDate()=" + getExpiryDate() + ", getExpiryAlertDays()=" + getExpiryAlertDays()
					+ ", getIsNearExpiry()=" + getIsNearExpiry() + ", getIsExpired()=" + getIsExpired()
					+ ", getSupplierId()=" + getSupplierId() + ", getPurchasePrice()=" + getPurchasePrice()
					+ ", getSellingPrice()=" + getSellingPrice() + ", getStockCount()=" + getStockCount()
					+ ", getMinimumStockLevel()=" + getMinimumStockLevel() + ", getReorderLevel()=" + getReorderLevel()
					+ ", getMaximumStockLevel()=" + getMaximumStockLevel() + ", getReservedStock()="
					+ getReservedStock() + ", getAvailableStock()=" + getAvailableStock() + ", getDamagedStock()="
					+ getDamagedStock() + ", getReturnedStock()=" + getReturnedStock() + ", getStorageLocation()="
					+ getStorageLocation() + ", getBarcode()=" + getBarcode() + ", getIsPrescriptionRequired()="
					+ getIsPrescriptionRequired() + ", getStatus()=" + getStatus() + ", getCreatedAt()="
					+ getCreatedAt() + ", getUpdatedAt()=" + getUpdatedAt() + ", getCreatedBy()=" + getCreatedBy()
					+ ", getUpdatedBy()=" + getUpdatedBy() + ", getClass()=" + getClass() + ", hashCode()=" + hashCode()
					+ ", toString()=" + super.toString() + "]";
		}
        
    }
}
