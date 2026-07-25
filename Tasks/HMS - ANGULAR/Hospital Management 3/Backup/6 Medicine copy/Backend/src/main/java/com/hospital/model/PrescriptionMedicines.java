package com.hospital.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "prescription_medicines")
public class PrescriptionMedicines {
	
	@Id
	@GeneratedValue( strategy=GenerationType.IDENTITY)
	@Column(name="prescriptionMedicineId" ,nullable = false)
	private int prescriptionMedicineId;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "prescription_id")
	@JsonBackReference
	private Prescription prescription;
	
	@Column(nullable = false)
	private String medicineCode;
	
	@Column(nullable = false)
	private String medicineName;
	
	@Column(nullable = false)
	private String dosage;
	
	@Column(nullable = false)
	private String frequency;
	
	@Column(nullable = false)
	private String duration;
	
	@Column(nullable = false)
	private int quantity;
	
	@Column(nullable = false)
	private String instructions;
	
	private Boolean morning;

	private Boolean morningAfterFood;

	private Boolean noon;

	private Boolean noonAfterFood;

	private Boolean night;

	private Boolean nightAfterFood;

	public int getPrescriptionMedicineId() {
		return prescriptionMedicineId;
	}

	public void setPrescriptionMedicineId(int prescriptionMedicineId) {
		this.prescriptionMedicineId = prescriptionMedicineId;
	}

	public Prescription getPrescription() {
		return prescription;
	}

	public void setPrescription(Prescription prescription) {
		this.prescription = prescription;
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

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
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
