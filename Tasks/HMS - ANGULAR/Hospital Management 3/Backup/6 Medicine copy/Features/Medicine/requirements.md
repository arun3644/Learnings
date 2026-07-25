# Pharmacy Inventory Management - Requirements

## Overview
Complete pharmacy and medicine management system with digital prescription workflow, inventory tracking, and supplier management.

---

## Database Models

### 1. Medicine Inventory

```json
{
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
```

### 2. Supplier

```json
{
  "supplierId": 1,
  "supplierName": "ABC Pharma",
  "supplierPhone": "+91XXXXXXXXXX",
  "supplierEmail": "supplier@example.com",
  "location": "Chennai",
  "contactPerson": "John Doe",
  "gstNumber": "33ABCDE1234F1Z5",
  "status": "ACTIVE",
  "createdAt": "2026-06-12T10:00:00Z",
  "updatedAt": "2026-06-12T10:00:00Z"
}
```

### 3. Recommended Additional Tables

1. Medicine Purchase Orders

   * purchaseOrderId
   * supplierId
   * orderDate
   * expectedDeliveryDate
   * totalAmount
   * status

2. Prescription Requests

   * prescriptionId
   * patientId
   * doctorId
   * prescriptionDate
   * status

3. Prescription Medicines

   * prescriptionMedicineId
   * prescriptionId
   * medicineId
   * dosage
   * frequency
   * duration
   * quantity
   * instructions

4. Dispensing Records

   * dispenseId
   * prescriptionId
   * pharmacistId
   * dispensedDate
   * status

5. Stock Transactions

   * transactionId
   * medicineId
   * transactionType (PURCHASE, DISPENSE, RETURN, DAMAGE, ADJUSTMENT)
   * quantity
   * transactionDate
   * remarks

6. Medicine Returns

   * returnId
   * medicineId
   * quantity
   * reason
   * returnDate
   * returnedBy

### 4. Future Enhancements

* Drug interaction alerts
* Allergy warnings
* Prescription refill requests
* Barcode/QR code scanning
* Auto stock deduction on dispensing
* Expiry notifications dashboard
* Low stock notifications
* Multi-branch inventory management
* Home delivery support
* Insurance claim integration
* Audit logs for all stock movements
* Medicine sales and usage reports

---

## Core Models

### Prescription Request Model (Doctor → Pharmacy)

```json
{
  "prescriptionId": 101,
  "patientId": 1001,
  "doctorId": 501,
  "prescriptionDate": "2026-06-12",

  "medicines": [
    {
      "medicineId": 1,
      "medicineName": "Paracetamol 500mg",
      "dosage": "1 Tablet",
      "frequency": "Twice Daily",
      "duration": "5 Days",
      "quantity": 10,
      "instructions": "After Food"
    }
  ],

  "status": "PENDING"
}
```



### Dispensing Record Model (Pharmacist)

```json
{
  "dispenseId": 10001,
  "prescriptionId": 101,
  "patientId": 1001,
  "pharmacistId": 201,

  "dispensedDate": "2026-06-12T12:00:00Z",

  "items": [
    {
      "medicineId": 1,
      "prescribedQuantity": 10,
      "dispensedQuantity": 8,
      "remarks": "Only 8 available in stock"
    }
  ],

  "status": "PARTIALLY_DISPENSED"
}
```

---

## 6. Pharmacy Inventory Management
### Core Features
- Medicine stock tracking
- Expiry date alerts
- Low-stock and reorder notifications
- Supplier management
- Medicine dispensing records
- Digital prescription management

---

## Digital Prescription Workflow
### Doctor Module
1. Search and select a patient
2. Create or select a prescription
3. View all available medicines in a card/list view
4. Select medicines and specify:
   - Dosage
   - Frequency
   - Duration
   - Quantity
   - Special instructions
5. Submit the prescription electronically to the pharmacy
6. Track prescription status (Pending, Processing, Dispensed, Delivered)

### Pharmacist Module
1. View incoming prescription requests
2. Verify medicine availability
3. Modify dispensed quantity when necessary (subject to approval rules)
4. Add pharmacist notes/comments
5. Dispense medicines to the patient
6. Mark prescription status as:
   - Pending
   - In Progress
   - Partially Dispensed
   - Dispensed
   - Cancelled
7. Generate dispensing records and invoices

---

## Additional Features to Consider
### Inventory Management
- Batch/Lot number tracking
- Automatic stock deduction after dispensing
- Multiple warehouse/store locations
- Stock transfer between branches
- Damaged/expired medicine management
- Stock adjustment history
- Physical stock audit support

### Prescription Management
- Prescription refill requests
- Prescription history for each patient
- Duplicate prescription detection
- Drug interaction warnings
- Allergy alerts
- Generic medicine substitution suggestions
- Prescription templates for common treatments

### Alerts & Notifications
- Medicine expiry notifications
- Low-stock alerts
- Reorder reminders
- Prescription ready notifications for patients
- Supplier delivery notifications

### Supplier Management
- Supplier database
- Purchase order creation
- Purchase order approval workflow
- Supplier performance tracking
- Delivery tracking
- Invoice management

### Billing & Payments
- Pharmacy billing
- Insurance claim integration
- Discount management
- GST/Tax calculation
- Payment receipts

### Reports & Analytics
- Daily medicine sales report
- Stock movement report
- Expiry report
- Fast-moving and slow-moving medicines
- Prescription trends
- Revenue reports
- Supplier purchase reports

### Security & Audit
- Role-based access control
- Prescription approval workflow
- Audit logs for medicine dispensing
- Controlled drug tracking
- Electronic signature support

### Patient Features
- View prescription history
- Download digital prescriptions
- Refill requests
- Medicine reminders
- Home delivery request tracking

### Advanced Features
- Barcode/QR code scanning for medicines
- AI-based stock forecasting
- Drug interaction checker
- Integration with laboratory and EMR modules
- Mobile app for pharmacists
- Home delivery management
- Multi-branch pharmacy support

---

These additions would make the pharmacy module much closer to what is found in a full-scale hospital management system rather than just a basic inventory feature.

