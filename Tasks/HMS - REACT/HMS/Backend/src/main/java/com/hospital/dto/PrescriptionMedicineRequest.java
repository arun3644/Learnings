package com.hospital.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class PrescriptionMedicineRequest {

    @NotBlank(message = "medicineCode is required")
    private String medicineCode;
    
    @NotBlank(message = "dosage is required")
    private String dosage;

    @NotBlank(message = "frequency is required")
    private String frequency;

    @NotBlank(message = "duration is required")
    private String duration;

    @NotNull(message = "quantity is required")
    @Min(value = 1, message = "quantity must be greater than 0")
    private Integer quantity;

    @NotBlank(message = "instructions is required")
    private String instructions;
    
    private Boolean morning;

    private Boolean morningAfterFood;

    private Boolean noon;

    private Boolean noonAfterFood;

    private Boolean night;

    private Boolean nightAfterFood;

	public PrescriptionMedicineRequest(String medicineCode, String dosage, String frequency,
			String duration, Integer quantity, String instructions) {
		super();
		this.medicineCode = medicineCode;
		this.dosage = dosage;
		this.frequency = frequency;
		this.duration = duration;
		this.quantity = quantity;
		this.instructions = instructions;
	}

    public PrescriptionMedicineRequest() {
    }

	public PrescriptionMedicineRequest(@NotBlank(message = "medicineCode is required") String medicineCode,
			@NotBlank(message = "dosage is required") String dosage,
			@NotBlank(message = "frequency is required") String frequency,
			@NotBlank(message = "duration is required") String duration,
			@NotNull(message = "quantity is required") @Min(value = 1, message = "quantity must be greater than 0") Integer quantity,
			@NotBlank(message = "instructions is required") String instructions, Boolean morning,
			Boolean morningAfterFood, Boolean noon, Boolean noonAfterFood, Boolean night, Boolean nightAfterFood) {
		super();
		this.medicineCode = medicineCode;
		this.dosage = dosage;
		this.frequency = frequency;
		this.duration = duration;
		this.quantity = quantity;
		this.instructions = instructions;
		this.morning = morning;
		this.morningAfterFood = morningAfterFood;
		this.noon = noon;
		this.noonAfterFood = noonAfterFood;
		this.night = night;
		this.nightAfterFood = nightAfterFood;
	}



	public String getMedicineCode() {
		return medicineCode;
	}

	public void setMedicineCode(String medicineCode) {
		this.medicineCode = medicineCode;
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

	public Boolean getMorning() {
		return morning;
	}

	public void setMorning(Boolean morning) {
		this.morning = morning;
	}

	public Boolean getMorningAfterFood() {
		return morningAfterFood;
	}

	public void setMorningAfterFood(Boolean morningAfterFood) {
		this.morningAfterFood = morningAfterFood;
	}

	public Boolean getNoon() {
		return noon;
	}

	public void setNoon(Boolean noon) {
		this.noon = noon;
	}

	public Boolean getNoonAfterFood() {
		return noonAfterFood;
	}

	public void setNoonAfterFood(Boolean noonAfterFood) {
		this.noonAfterFood = noonAfterFood;
	}

	public Boolean getNight() {
		return night;
	}

	public void setNight(Boolean night) {
		this.night = night;
	}

	public Boolean getNightAfterFood() {
		return nightAfterFood;
	}

	public void setNightAfterFood(Boolean nightAfterFood) {
		this.nightAfterFood = nightAfterFood;
	}
	
}