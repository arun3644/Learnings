
CREATE TABLE  IF NOT EXISTS doctor_time_slots (
    id BIGSERIAL PRIMARY KEY,
    doctorId BIGINT NOT NULL,
    date DATE NOT NULL,
    timeSlot VARCHAR(10) NOT NULL,
    isAvailable BOOLEAN DEFAULT TRUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_doctor FOREIGN KEY (doctorId) REFERENCES doctors(id) ON DELETE CASCADE,
    CONSTRAINT unique_doctor_date_time UNIQUE (doctorId, date, timeSlot)
);

CREATE INDEX idx_doctor_time_slots_doctor_id ON doctor_time_slots(doctor_id);
CREATE INDEX idx_doctor_time_slots_date ON doctor_time_slots(date);
CREATE INDEX idx_doctor_time_slots_is_available ON doctor_time_slots(is_available);
CREATE INDEX idx_doctor_time_slots_doctor_date ON doctor_time_slots(doctor_id, date);
