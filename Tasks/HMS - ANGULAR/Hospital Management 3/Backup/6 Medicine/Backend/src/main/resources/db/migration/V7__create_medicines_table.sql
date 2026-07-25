CREATE TABLE IF NOT EXISTS medicines (
    medicineId BIGSERIAL PRIMARY KEY,
    medicineCode VARCHAR(50) NOT NULL,
    medicineName VARCHAR(255) NOT NULL,
    genericName VARCHAR(255) NOT NULL,
    brandName VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    dosageForm VARCHAR(100) NOT NULL,
    strength VARCHAR(50) NOT NULL,
    batchNumber VARCHAR(100) NOT NULL,

    manufacturedDate DATE NOT NULL,
    expiryDate DATE NOT NULL,
    expiryAlertDays INT NOT NULL,

    isNearExpiry BOOLEAN DEFAULT FALSE,
    isExpired BOOLEAN DEFAULT FALSE,

    supplierId BIGINT NOT NULL,

    purchasePrice DECIMAL(10,2) NOT NULL,
    sellingPrice DECIMAL(10,2) NOT NULL,

    stockCount INT NOT NULL,
    minimumStockLevel INT NOT NULL,
    reorderLevel INT NOT NULL,
    maximumStockLevel INT NOT NULL,
    reservedStock INT NOT NULL DEFAULT 0,
    availableStock INT NOT NULL,
    damagedStock INT NOT NULL DEFAULT 0,
    returnedStock INT NOT NULL DEFAULT 0,

    storageLocation VARCHAR(255) NOT NULL,
    barcode VARCHAR(100),

    isPrescriptionRequired BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) NOT NULL,

    createdBy VARCHAR(100) NOT NULL,
    updatedBy VARCHAR(100) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);