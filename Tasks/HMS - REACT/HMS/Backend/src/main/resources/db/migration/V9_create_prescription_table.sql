CREATE TABLE IF NOT EXISTS prescriptions (
    prescriptionId BIGINT PRIMARY KEY,
    patientId BIGINT NOT NULL,
    doctorId BIGINT NOT NULL,
    prescriptionDate DATE,
    notes TEXT,
    status VARCHAR(50),
    created_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS prescription_medicines (
    prescriptionMedicineId BIGINT PRIMARY KEY,
    prescriptionId BIGINT NOT NULL,
    medicineCode BIGINT,
    medicineName VARCHAR(255),
    dosage VARCHAR(100),
    frequency VARCHAR(100),
    duration VARCHAR(100),
    quantity INTEGER,
    instructions TEXT,

    CONSTRAINT fk_prescription
        FOREIGN KEY (prescriptionId)
        REFERENCES prescriptions(prescriptionId)
        ON DELETE CASCADE
);

CREATE TABLE role_page_permissions (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    role VARCHAR(50) NOT NULL,
    page VARCHAR(50) NOT NULL,
    allowed BOOLEAN NOT NULL DEFAULT FALSE,
    UNIQUE (role, page)
);

ALTER TABLE prescription 
    ALTER COLUMN created_at TYPE timestamp(6) without time zone 
    USING created_at::timestamp(6) without time zone;
    

ALTER TABLE prescription_medicines
ADD COLUMN IF NOT EXISTS morning BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS morning_after_food BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS noon BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS noon_after_food BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS night BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS night_after_food BOOLEAN DEFAULT FALSE;

ALTER TABLE prescription
ADD COLUMN IF NOT EXISTS cancellationReason VARCHAR(200) DEFAULT '';
	