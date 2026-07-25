package com.hospital.model;

import java.math.BigDecimal;
import java.util.Date;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "medicines")
public class Medicine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "medicine_id")
    private Long medicineId;

    @Column(nullable = false, unique = true, length = 50)
    private String medicineCode;

    @Column(nullable = false, length = 255)
    private String medicineName;

    @Column(nullable = false, length = 255)
    private String genericName;

    @Column(nullable = false, length = 255)
    private String brandName;

    @Column(nullable = false, length = 100)
    private String category;

    @Column(nullable = false, length = 100)
    private String dosageForm;

    @Column(nullable = false, length = 50)
    private String strength;

    @Column(nullable = false, length = 100)
    private String batchNumber;

    @Column(nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date manufacturedDate;

    @Column(nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date expiryDate;

    @Column(nullable = false)
    private Integer expiryAlertDays;

    @Column(nullable = false)
    private Boolean isNearExpiry = false;

    @Column(nullable = false)
    private Boolean isExpired = false;

    @Column(nullable = false)
    private Long supplierId;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal purchasePrice;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal sellingPrice;

    @Column(nullable = false)
    private Integer stockCount;

    @Column(nullable = false)
    private Integer minimumStockLevel;

    @Column(nullable = false)
    private Integer reorderLevel;

    @Column(nullable = false)
    private Integer maximumStockLevel;

    @Column(nullable = false)
    private Integer reservedStock = 0;

    @Column(nullable = false)
    private Integer availableStock;

    @Column(nullable = false)
    private Integer damagedStock = 0;

    @Column(nullable = false)
    private Integer returnedStock = 0;

    @Column(nullable = false, length = 255)
    private String storageLocation;

    @Column(length = 100)
    private String barcode;

    @Column(nullable = false)
    private Boolean isPrescriptionRequired = false;

    @Column(nullable = false, length = 20)
    private String status;

    @Column(nullable = false, length = 100)
    private String createdBy;

    @Column(nullable = false, length = 100)
    private String updatedBy;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at", nullable = false, updatable = false)
    private Date createdAt;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "updated_at")
    private Date updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = new Date();
        updatedAt = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = new Date();
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
    
    
}