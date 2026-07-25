
ALTER TABLE patients ADD COLUMN IF NOT EXISTS patient_id VARCHAR(50) UNIQUE;
ALTER TABLE patients ADD COLUMN IF NOT EXISTS status VARCHAR(50) NOT NULL DEFAULT 'Active';

CREATE INDEX IF NOT EXISTS idx_patients_patient_id ON patients(patient_id);
