# Medicine Management System - API Documentation

## Table of Contents
1. [Medicine APIs](#medicine-apis)
2. [Prescription APIs](#prescription-apis)
3. [Supplier APIs](#supplier-apis)
4. [Dispensing APIs](#dispensing-apis)
5. [Stock Transaction APIs](#stock-transaction-apis)

---

## Medicine APIs

### 1. Create Medicine
**Endpoint:** `POST /api/medicines`

**Request Body:**
```json
{
  "medicineCode": "MED001",
  "medicineName": "Paracetamol 500mg",
  "genericName": "Paracetamol",
  "brandName": "Crocin",
  "category": "Tablet",
  "dosageForm": "Tablet",
  "strength": "500mg",
  "batchNumber": "BATCH12345",
  "manufacturedDate": "2026-01-15",
  "expiryDate": "2028-01-15",
  "expiryAlertDays": 90,
  "supplierId": 1,
  "purchasePrice": 2.50,
  "sellingPrice": 5.00,
  "stockCount": 500,
  "minimumStockLevel": 100,
  "reorderLevel": 150,
  "maximumStockLevel": 1000,
  "storageLocation": "Rack A - Shelf 3",
  "barcode": "8901234567890",
  "isPrescriptionRequired": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Medicine created successfully",
  "data": {
    "medicineId": 1,
    "medicineCode": "MED001",
    "medicineName": "Paracetamol 500mg",
    "genericName": "Paracetamol",
    "brandName": "Crocin",
    "category": "Tablet",
    "dosageForm": "Tablet",
    "strength": "500mg",
    "batchNumber": "BATCH12345",
    "manufacturedDate": "2026-01-15",
    "expiryDate": "2028-01-15",
    "expiryAlertDays": 90,
    "isNearExpiry": false,
    "isExpired": false,
    "supplierId": 1,
    "purchasePrice": 2.50,
    "sellingPrice": 5.00,
    "stockCount": 500,
    "minimumStockLevel": 100,
    "reorderLevel": 150,
    "maximumStockLevel": 1000,
    "reservedStock": 0,
    "availableStock": 500,
    "damagedStock": 0,
    "returnedStock": 0,
    "storageLocation": "Rack A - Shelf 3",
    "barcode": "8901234567890",
    "isPrescriptionRequired": true,
    "status": "ACTIVE",
    "createdAt": "2026-06-12T10:00:00Z",
    "updatedAt": "2026-06-12T10:00:00Z",
    "createdBy": "admin",
    "updatedBy": "admin"
  }
}
```

### 2. Get All Medicines
**Endpoint:** `GET /api/medicines`

**Query Parameters:**
- `page` (optional): Page number (default: 0)
- `size` (optional): Page size (default: 20)
- `search` (optional): Search by medicine name or code
- `category` (optional): Filter by category
- `status` (optional): Filter by status (ACTIVE, INACTIVE, OUT_OF_STOCK)
- `isNearExpiry` (optional): Filter near expiry medicines
- `isExpired` (optional): Filter expired medicines
- `lowStock` (optional): Filter low stock medicines

**Response:**
```json
{
  "success": true,
  "message": "Medicines retrieved successfully",
  "data": {
    "content": [
      {
        "medicineId": 1,
        "medicineCode": "MED001",
        "medicineName": "Paracetamol 500mg",
        "genericName": "Paracetamol",
        "brandName": "Crocin",
        "category": "Tablet",
        "strength": "500mg",
        "availableStock": 480,
        "sellingPrice": 5.00,
        "expiryDate": "2028-01-15",
        "isNearExpiry": false,
        "isExpired": false,
        "status": "ACTIVE"
      }
    ],
    "totalElements": 1,
    "totalPages": 1,
    "currentPage": 0,
    "size": 20
  }
}
```

### 3. Get Medicine by ID
**Endpoint:** `GET /api/medicines/{medicineId}`

**Response:**
```json
{
  "success": true,
  "message": "Medicine retrieved successfully",
  "data": {
    "medicineId": 1,
    "medicineCode": "MED001",
    "medicineName": "Paracetamol 500mg",
    "genericName": "Paracetamol",
    "brandName": "Crocin",
    "category": "Tablet",
    "dosageForm": "Tablet",
    "strength": "500mg",
    "batchNumber": "BATCH12345",
    "manufacturedDate": "2026-01-15",
    "expiryDate": "2028-01-15",
    "expiryAlertDays": 90,
    "isNearExpiry": false,
    "isExpired": false,
    "supplierId": 1,
    "supplierName": "ABC Pharma",
    "purchasePrice": 2.50,
    "sellingPrice": 5.00,
    "stockCount": 500,
    "minimumStockLevel": 100,
    "reorderLevel": 150,
    "maximumStockLevel": 1000,
    "reservedStock": 20,
    "availableStock": 480,
    "damagedStock": 5,
    "returnedStock": 2,
    "storageLocation": "Rack A - Shelf 3",
    "barcode": "8901234567890",
    "isPrescriptionRequired": true,
    "status": "ACTIVE",
    "createdAt": "2026-06-12T10:00:00Z",
    "updatedAt": "2026-06-12T10:00:00Z",
    "createdBy": "admin",
    "updatedBy": "pharmacist"
  }
}
```

### 4. Update Medicine
**Endpoint:** `PUT /api/medicines/{medicineId}`

**Request Body:**
```json
{
  "medicineName": "Paracetamol 500mg",
  "genericName": "Paracetamol",
  "brandName": "Crocin",
  "category": "Tablet",
  "dosageForm": "Tablet",
  "strength": "500mg",
  "purchasePrice": 2.50,
  "sellingPrice": 5.50,
  "minimumStockLevel": 120,
  "reorderLevel": 160,
  "maximumStockLevel": 1200,
  "storageLocation": "Rack A - Shelf 3",
  "isPrescriptionRequired": true,
  "status": "ACTIVE"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Medicine updated successfully",
  "data": {
    "medicineId": 1,
    "medicineCode": "MED001",
    "medicineName": "Paracetamol 500mg",
    "sellingPrice": 5.50,
    "minimumStockLevel": 120,
    "reorderLevel": 160,
    "maximumStockLevel": 1200,
    "status": "ACTIVE",
    "updatedAt": "2026-06-12T11:00:00Z",
    "updatedBy": "admin"
  }
}
```

### 5. Delete Medicine
**Endpoint:** `DELETE /api/medicines/{medicineId}`

**Response:**
```json
{
  "success": true,
  "message": "Medicine deleted successfully"
}
```

### 6. Update Stock
**Endpoint:** `PATCH /api/medicines/{medicineId}/stock`

**Request Body:**
```json
{ 
  "stockCount": 600,
  "transactionType": "PURCHASE",
  "remarks": "New stock received from supplier"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Stock updated successfully",
  "data": {
    "medicineId": 1,
    "medicineName": "Paracetamol 500mg",
    "previousStock": 500,
    "newStock": 600,
    "availableStock": 580,
    "updatedAt": "2026-06-12T12:00:00Z"
  }
}
```

### 7. Get Low Stock Medicines
**Endpoint:** `GET /api/medicines/low-stock`

**Response:**
```json
{
  "success": true,
  "message": "Low stock medicines retrieved successfully",
  "data": [
    {
      "medicineId": 2,
      "medicineName": "Amoxicillin 250mg",
      "currentStock": 80,
      "minimumStockLevel": 100,
      "reorderLevel": 150,
      "status": "LOW_STOCK"
    }
  ]
}
```

### 8. Get Expiring Soon Medicines
**Endpoint:** `GET /api/medicines/expiring-soon`

**Query Parameters:**
- `days` (optional): Number of days threshold (default: 90)

**Response:**
```json
{
  "success": true,
  "message": "Expiring medicines retrieved successfully",
  "data": [
    {
      "medicineCode": 3,
      "medicineName": "Ibuprofen 400mg",
      "batchNumber": "BATCH56789",
      "expiryDate": "2026-08-15",
      "daysUntilExpiry": 64,
      "availableStock": 150,
      "status": "NEAR_EXPIRY"
    }
  ]
}
```

---

## Prescription APIs

### 1. Create Prescription (Doctor)
**Endpoint:** `POST /api/prescriptions`

**Request Body:**
```json
{
  "patientId": 1001,
  "prescriptionDate": "2026-06-12",
  "medicines": [
    {
      "medicineId": 1,
      "dosage": "1 Tablet",
      "frequency": "Twice Daily",
      "duration": "5 Days",
      "quantity": 10,
      "instructions": "After Food"
    },
    {
      "medicineId": 2,
      "dosage": "2 Tablets",
      "frequency": "Three Times Daily",
      "duration": "7 Days",
      "quantity": 42,
      "instructions": "Before Food"
    }
  ],
  "notes": "Patient has mild fever"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Prescription created successfully",
  "data": {
    "prescriptionId": 101,
    "patientId": 1001,
    "patientName": "John Doe",
    "doctorId": 501,
    "doctorName": "Dr. Smith",
    "prescriptionDate": "2026-06-12",
    "medicines": [
      {
        "prescriptionMedicineId": 1,
        "medicineCode": 1,
        "medicineName": "Paracetamol 500mg",
        "dosage": "1 Tablet",
        "frequency": "Twice Daily",
        "duration": "5 Days",
        "quantity": 10,
        "instructions": "After Food"
      },
      {
        "prescriptionMedicineId": 2,
        "medicineId": 2,
        "medicineName": "Amoxicillin 250mg",
        "dosage": "2 Tablets",
        "frequency": "Three Times Daily",
        "duration": "7 Days",
        "quantity": 42,
        "instructions": "Before Food"
      }
    ],
    "notes": "Patient has mild fever",
    "status": "PENDING",
    "createdAt": "2026-06-12T10:30:00Z"
  }
}
```

### 2. Get All Prescriptions
**Endpoint:** `GET /api/prescriptions`

**Query Parameters:**
- `page` (optional): Page number
- `size` (optional): Page size
- `status` (optional): Filter by status
- `patientId` (optional): Filter by patient
- `doctorId` (optional): Filter by doctor

**Response:**
```json
{
  "success": true,
  "message": "Prescriptions retrieved successfully",
  "data": {
    "content": [
      {
        "prescriptionId": 101,
        "patientId": 1001,
        "patientName": "John Doe",
        "doctorId": 501,
        "doctorName": "Dr. Smith",
        "prescriptionDate": "2026-06-12",
        "medicineCount": 2,
        "status": "PENDING",
        "createdAt": "2026-06-12T10:30:00Z"
      }
    ],
    "totalElements": 1,
    "totalPages": 1,
    "currentPage": 0
  }
}
```

### 3. Get Prescription by ID
**Endpoint:** `GET /api/prescriptions/{prescriptionId}`

**Response:**
```json
{
  "success": true,
  "message": "Prescription retrieved successfully",
  "data": {
    "prescriptionId": 101,
    "patientId": 1001,
    "patientName": "John Doe",
    "patientPhone": "+91XXXXXXXXXX",
    "doctorId": 501,
    "doctorName": "Dr. Smith",
    "specialty": "General Physician",
    "prescriptionDate": "2026-06-12",
    "medicines": [
      {
        "prescriptionMedicineId": 1,
        "medicineId": 1,
        "medicineName": "Paracetamol 500mg",
        "genericName": "Paracetamol",
        "dosage": "1 Tablet",
        "frequency": "Twice Daily",
        "duration": "5 Days",
        "quantity": 10,
        "instructions": "After Food",
        "availableStock": 480
      }
    ],
    "notes": "Patient has mild fever",
    "status": "PENDING",
    "createdAt": "2026-06-12T10:30:00Z",
    "updatedAt": "2026-06-12T10:30:00Z"
  }
}
```

### 4. Update Prescription
**Endpoint:** `PUT /api/prescriptions/{prescriptionId}`

**Request Body:**
```json
{
  "medicines": [
    {
      "medicineId": 1,
      "dosage": "2 Tablets",
      "frequency": "Three Times Daily",
      "duration": "3 Days",
      "quantity": 18,
      "instructions": "After Food with plenty of water"
    }
  ],
  "notes": "Updated dosage as per patient condition"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Prescription updated successfully",
  "data": {
    "prescriptionId": 101,
    "status": "PENDING",
    "updatedAt": "2026-06-12T11:00:00Z"
  }
}
```

### 5. Cancel Prescription
**Endpoint:** `PATCH /api/prescriptions/{prescriptionId}/cancel`

**Request Body:**
```json
{
  "reason": "Patient condition improved"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Prescription cancelled successfully",
  "data": {
    "prescriptionId": 101,
    "status": "CANCELLED",
    "cancelledAt": "2026-06-12T12:00:00Z",
    "cancelReason": "Patient condition improved"
  }
}
```

---

## Supplier APIs

### 1. Create Supplier
**Endpoint:** `POST /api/suppliers`

**Request Body:**
```json
{
  "supplierName": "ABC Pharma",
  "supplierPhone": "+91XXXXXXXXXX",
  "supplierEmail": "supplier@abcpharma.com",
  "location": "Chennai",
  "contactPerson": "John Doe",
  "gstNumber": "33ABCDE1234F1Z5",
  "address": "123 Pharma Street, Chennai - 600001"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Supplier created successfully",
  "data": {
    "supplierId": 1,
    "supplierName": "ABC Pharma",
    "supplierPhone": "+91XXXXXXXXXX",
    "supplierEmail": "supplier@abcpharma.com",
    "location": "Chennai",
    "contactPerson": "John Doe",
    "gstNumber": "33ABCDE1234F1Z5",
    "address": "123 Pharma Street, Chennai - 600001",
    "status": "ACTIVE",
    "createdAt": "2026-06-12T10:00:00Z",
    "updatedAt": "2026-06-12T10:00:00Z"
  }
}
```

### 2. Get All Suppliers
**Endpoint:** `GET /api/suppliers`

**Query Parameters:**
- `page` (optional): Page number
- `size` (optional): Page size
- `search` (optional): Search by name or contact
- `status` (optional): Filter by status

**Response:**
```json
{
  "success": true,
  "message": "Suppliers retrieved successfully",
  "data": {
    "content": [
      {
        "supplierId": 1,
        "supplierName": "ABC Pharma",
        "supplierPhone": "+91XXXXXXXXXX",
        "supplierEmail": "supplier@abcpharma.com",
        "location": "Chennai",
        "contactPerson": "John Doe",
        "status": "ACTIVE"
      }
    ],
    "totalElements": 1,
    "totalPages": 1,
    "currentPage": 0
  }
}
```

### 3. Get Supplier by ID
**Endpoint:** `GET /api/suppliers/{supplierId}`

**Response:**
```json
{
  "success": true,
  "message": "Supplier retrieved successfully",
  "data": {
    "supplierId": 1,
    "supplierName": "ABC Pharma",
    "supplierPhone": "+91XXXXXXXXXX",
    "supplierEmail": "supplier@abcpharma.com",
    "location": "Chennai",
    "contactPerson": "John Doe",
    "gstNumber": "33ABCDE1234F1Z5",
    "address": "123 Pharma Street, Chennai - 600001",
    "status": "ACTIVE",
    "totalMedicinesSupplied": 25,
    "createdAt": "2026-06-12T10:00:00Z",
    "updatedAt": "2026-06-12T10:00:00Z"
  }
}
```

### 4. Update Supplier
**Endpoint:** `PUT /api/suppliers/{supplierId}`

**Request Body:**
```json
{
  "supplierName": "ABC Pharma Ltd",
  "supplierPhone": "+91XXXXXXXXXX",
  "supplierEmail": "contact@abcpharma.com",
  "location": "Chennai",
  "contactPerson": "Jane Smith",
  "gstNumber": "33ABCDE1234F1Z5",
  "address": "123 Pharma Street, Chennai - 600001",
  "status": "ACTIVE"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Supplier updated successfully",
  "data": {
    "supplierId": 1,
    "supplierName": "ABC Pharma Ltd",
    "contactPerson": "Jane Smith",
    "updatedAt": "2026-06-12T11:00:00Z"
  }
}
```

### 5. Delete Supplier
**Endpoint:** `DELETE /api/suppliers/{supplierId}`

**Response:**
```json
{
  "success": true,
  "message": "Supplier deleted successfully"
}
```

---

## Dispensing APIs

### 1. Dispense Medicine (Pharmacist)
**Endpoint:** `POST /api/dispense`

**Request Body:**
```json
{
  "prescriptionId": 101,
  "patientId": 1001,
  "items": [
    {
      "medicineId": 1,
      "prescribedQuantity": 10,
      "dispensedQuantity": 10,
      "remarks": ""
    },
    {
      "medicineId": 2,
      "prescribedQuantity": 42,
      "dispensedQuantity": 40,
      "remarks": "Only 40 available in stock"
    }
  ],
  "pharmacistNotes": "Patient informed about partial dispensing"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Medicines dispensed successfully",
  "data": {
    "dispenseId": 10001,
    "prescriptionId": 101,
    "patientId": 1001,
    "patientName": "John Doe",
    "pharmacistId": 201,
    "pharmacistName": "Pharmacist Kumar",
    "dispensedDate": "2026-06-12T12:00:00Z",
    "items": [
      {
        "medicineId": 1,
        "medicineName": "Paracetamol 500mg",
        "prescribedQuantity": 10,
        "dispensedQuantity": 10,
        "remarks": ""
      },
      {
        "medicineId": 2,
        "medicineName": "Amoxicillin 250mg",
        "prescribedQuantity": 42,
        "dispensedQuantity": 40,
        "remarks": "Only 40 available in stock"
      }
    ],
    "pharmacistNotes": "Patient informed about partial dispensing",
    "status": "PARTIALLY_DISPENSED",
    "totalAmount": 295.00,
    "createdAt": "2026-06-12T12:00:00Z"
  }
}
```

### 2. Get Dispensing History
**Endpoint:** `GET /api/dispense`

**Query Parameters:**
- `page` (optional): Page number
- `size` (optional): Page size
- `patientId` (optional): Filter by patient
- `pharmacistId` (optional): Filter by pharmacist
- `status` (optional): Filter by status
- `fromDate` (optional): Start date
- `toDate` (optional): End date

**Response:**
```json
{
  "success": true,
  "message": "Dispensing records retrieved successfully",
  "data": {
    "content": [
      {
        "dispenseId": 10001,
        "prescriptionId": 101,
        "patientName": "John Doe",
        "pharmacistName": "Pharmacist Kumar",
        "dispensedDate": "2026-06-12T12:00:00Z",
        "itemCount": 2,
        "totalAmount": 295.00,
        "status": "PARTIALLY_DISPENSED"
      }
    ],
    "totalElements": 1,
    "totalPages": 1,
    "currentPage": 0
  }
}
```

### 3. Get Dispensing Record by ID
**Endpoint:** `GET /api/dispense/{dispenseId}`

**Response:**
```json
{
  "success": true,
  "message": "Dispensing record retrieved successfully",
  "data": {
    "dispenseId": 10001,
    "prescriptionId": 101,
    "patientId": 1001,
    "patientName": "John Doe",
    "pharmacistId": 201,
    "pharmacistName": "Pharmacist Kumar",
    "dispensedDate": "2026-06-12T12:00:00Z",
    "items": [
      {
        "medicineId": 1,
        "medicineName": "Paracetamol 500mg",
        "batchNumber": "BATCH12345",
        "prescribedQuantity": 10,
        "dispensedQuantity": 10,
        "unitPrice": 5.00,
        "totalPrice": 50.00,
        "remarks": ""
      },
      {
        "medicineId": 2,
        "medicineName": "Amoxicillin 250mg",
        "batchNumber": "BATCH67890",
        "prescribedQuantity": 42,
        "dispensedQuantity": 40,
        "unitPrice": 6.13,
        "totalPrice": 245.00,
        "remarks": "Only 40 available in stock"
      }
    ],
    "pharmacistNotes": "Patient informed about partial dispensing",
    "subtotal": 295.00,
    "discount": 0.00,
    "tax": 0.00,
    "totalAmount": 295.00,
    "status": "PARTIALLY_DISPENSED",
    "createdAt": "2026-06-12T12:00:00Z"
  }
}
```

---

## Stock Transaction APIs

### 1. Create Stock Transaction
**Endpoint:** `POST /api/stock-transactions`

**Request Body:**
```json
{
  "medicineId": 1,
  "transactionType": "PURCHASE",
  "quantity": 100,
  "remarks": "New stock received from ABC Pharma"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Stock transaction created successfully",
  "data": {
    "transactionId": 1001,
    "medicineId": 1,
    "medicineName": "Paracetamol 500mg",
    "transactionType": "PURCHASE",
    "quantity": 100,
    "previousStock": 500,
    "newStock": 600,
    "transactionDate": "2026-06-12T10:00:00Z",
    "performedBy": "admin",
    "remarks": "New stock received from ABC Pharma"
  }
}
```

### 2. Get Stock Transaction History
**Endpoint:** `GET /api/stock-transactions`

**Query Parameters:**
- `page` (optional): Page number
- `size` (optional): Page size
- `medicineId` (optional): Filter by medicine
- `transactionType` (optional): Filter by type (PURCHASE, DISPENSE, RETURN, DAMAGE, ADJUSTMENT)
- `fromDate` (optional): Start date
- `toDate` (optional): End date

**Response:**
```json
{
  "success": true,
  "message": "Stock transactions retrieved successfully",
  "data": {
    "content": [
      {
        "transactionId": 1001,
        "medicineId": 1,
        "medicineName": "Paracetamol 500mg",
        "transactionType": "PURCHASE",
        "quantity": 100,
        "previousStock": 500,
        "newStock": 600,
        "transactionDate": "2026-06-12T10:00:00Z",
        "performedBy": "admin"
      }
    ],
    "totalElements": 1,
    "totalPages": 1,
    "currentPage": 0
  }
}
```

### 3. Get Medicine Stock History
**Endpoint:** `GET /api/medicines/{medicineId}/stock-history`

**Response:**
```json
{
  "success": true,
  "message": "Medicine stock history retrieved successfully",
  "data": {
    "medicineId": 1,
    "medicineName": "Paracetamol 500mg",
    "currentStock": 600,
    "transactions": [
      {
        "transactionId": 1001,
        "transactionType": "PURCHASE",
        "quantity": 100,
        "previousStock": 500,
        "newStock": 600,
        "transactionDate": "2026-06-12T10:00:00Z",
        "performedBy": "admin",
        "remarks": "New stock received from ABC Pharma"
      },
      {
        "transactionId": 1000,
        "transactionType": "DISPENSE",
        "quantity": -20,
        "previousStock": 520,
        "newStock": 500,
        "transactionDate": "2026-06-11T15:00:00Z",
        "performedBy": "pharmacist",
        "remarks": "Dispensed to patient #1001"
      }
    ]
  }
}
```

---

## Common Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "medicineName",
      "message": "Medicine name is required"
    },
    {
      "field": "stockCount",
      "message": "Stock count must be greater than 0"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Authentication required",
  "error": "Invalid or expired token"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Access denied",
  "error": "You don't have permission to perform this action"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found",
  "error": "Medicine with ID 999 not found"
}
```

### 409 Conflict
```json
{
  "success": false,
  "message": "Conflict detected",
  "error": "Medicine with code MED001 already exists"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error",
  "error": "An unexpected error occurred. Please try again later."
}
```

---

## Status Codes Summary

- `200 OK` - Successful GET request
- `201 Created` - Successful POST request
- `204 No Content` - Successful DELETE request
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Permission denied
- `404 Not Found` - Resource not found
- `409 Conflict` - Resource conflict
- `500 Internal Server Error` - Server error
