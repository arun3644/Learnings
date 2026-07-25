package com.hospital.dto;

import java.util.Date;
import java.util.List;

import jakarta.validation.constraints.NotBlank;


public class PrescriptionRequest {
	@NotBlank(message = "patientId is required")
    private String patientId;

	@NotBlank(message = "doctorId is required")
    private Long doctorId;

	@NotBlank(message = "prescriptionDate is required")
    private Date prescriptionDate;
	
    private List<PrescriptionMedicineRequest> medicines;

	@NotBlank(message = "notes is required")
    private String notes;
	
	@NotBlank(message = "status is required")
	private String status;

	public PrescriptionRequest(String patientId, Long doctorId, Date prescriptionDate,
			List<PrescriptionMedicineRequest> medicines, String notes, String status) {
		super();
		this.patientId = patientId;
		this.doctorId = doctorId;
		this.prescriptionDate = prescriptionDate;
		this.medicines = medicines;
		this.notes = notes;
		this.status = status;
	}

	public String getPatientId() {
		return patientId;
	}

	public void setPatientId(String patientId) {
		this.patientId = patientId;
	}

	public Long getDoctorId() {
		return doctorId;
	}

	public void setDoctorId(Long doctorId) {
		this.doctorId = doctorId;
	}

	public Date getPrescriptionDate() {
		return prescriptionDate;
	}

	public void setPrescriptionDate(Date prescriptionDate) {
		this.prescriptionDate = prescriptionDate;
	}

	public List<PrescriptionMedicineRequest> getMedicines() {
		return medicines;
	}

	public void setMedicines(List<PrescriptionMedicineRequest> medicines) {
		this.medicines = medicines;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	public static class CancelPrescriptionRequest{
		
		@NotBlank(message = "cancellationReason is required")
		private String cancellationReason;

		public CancelPrescriptionRequest() {}

		public CancelPrescriptionRequest(
				@NotBlank(message = "cancellationReason is required") String cancellationReason) {
			super();
			this.cancellationReason = cancellationReason;
		}

		public String getCancellationReason() {
			return cancellationReason;
		}

		public void setCancellationReason(String cancellationReason) {
			this.cancellationReason = cancellationReason;
		}

	}
	
}