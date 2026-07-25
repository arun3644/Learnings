package com.hospital.dto;


public class PrescriptionMedicineResponse {
	
    private Long prescriptionMedicineId;

    private String medicineCode;

    private String medicineName;

    private String dosage;

    private String frequency;

    private String duration;

    private Integer quantity;

    private String instructions;
    
    private Boolean morning;

    private Boolean morning_after_food;

    private Boolean noon;

    private Boolean noon_after_food;

    private Boolean night;

    private Boolean night_after_food;

	public PrescriptionMedicineResponse(Long prescriptionMedicineId, String medicineCode, String medicineName,
			String dosage, String frequency, String duration, Integer quantity, String instructions) {
		super();
		this.prescriptionMedicineId = prescriptionMedicineId;
		this.medicineCode = medicineCode;
		this.medicineName = medicineName;
		this.dosage = dosage;
		this.frequency = frequency;
		this.duration = duration;
		this.quantity = quantity;
		this.instructions = instructions;
	}
	
	public PrescriptionMedicineResponse(Long prescriptionMedicineId, String medicineCode, String medicineName,
			String dosage, String frequency, String duration, Integer quantity, String instructions, Boolean morning,
			Boolean morning_after_food, Boolean noon, Boolean noon_after_food, Boolean night,
			Boolean night_after_food) {
		super();
		this.prescriptionMedicineId = prescriptionMedicineId;
		this.medicineCode = medicineCode;
		this.medicineName = medicineName;
		this.dosage = dosage;
		this.frequency = frequency;
		this.duration = duration;
		this.quantity = quantity;
		this.instructions = instructions;
		this.morning = morning;
		this.morning_after_food = morning_after_food;
		this.noon = noon;
		this.noon_after_food = noon_after_food;
		this.night = night;
		this.night_after_food = night_after_food;
	}


	public Long getPrescriptionMedicineId() {
		return prescriptionMedicineId;
	}

	public void setPrescriptionMedicineId(Long prescriptionMedicineId) {
		this.prescriptionMedicineId = prescriptionMedicineId;
	}

	public String medicineCode() {
		return medicineCode;
	}

	public void setMedicineId(String medicineCode) {
		this.medicineCode = medicineCode;
	}

	public String getMedicineName() {
		return medicineName;
	}

	public void setMedicineName(String medicineName) {
		this.medicineName = medicineName;
	}

	public String getDosage() {
		return dosage;
	}

	public void setDosage(String dosage) {
		this.dosage = dosage;
	}

	public String getFrequency() {
		return frequency;
	}

	public void setFrequency(String frequency) {
		this.frequency = frequency;
	}

	public String getDuration() {
		return duration;
	}

	public void setDuration(String duration) {
		this.duration = duration;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public String getInstructions() {
		return instructions;
	}

	public void setInstructions(String instructions) {
		this.instructions = instructions;
	}

	public String getMedicineCode() {
		return medicineCode;
	}

	public void setMedicineCode(String medicineCode) {
		this.medicineCode = medicineCode;
	}

	public Boolean getMorning() {
		return morning;
	}

	public void setMorning(Boolean morning) {
		this.morning = morning;
	}

	public Boolean getMorning_after_food() {
		return morning_after_food;
	}

	public void setMorning_after_food(Boolean morning_after_food) {
		this.morning_after_food = morning_after_food;
	}

	public Boolean getNoon() {
		return noon;
	}

	public void setNoon(Boolean noon) {
		this.noon = noon;
	}

	public Boolean getNoon_after_food() {
		return noon_after_food;
	}

	public void setNoon_after_food(Boolean noon_after_food) {
		this.noon_after_food = noon_after_food;
	}

	public Boolean getNight() {
		return night;
	}

	public void setNight(Boolean night) {
		this.night = night;
	}

	public Boolean getNight_after_food() {
		return night_after_food;
	}

	public void setNight_after_food(Boolean night_after_food) {
		this.night_after_food = night_after_food;
	}  
}