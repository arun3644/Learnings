package com.hospital.dto;
import java.util.Date;
import java.util.List;

import com.hospital.model.PrescriptionMedicines;

public class PrescriptionResponse {

    private int prescriptionId;

    private String patientId;

    private String patientName;

    private Long doctorId;

    private String doctorName;

    private Date prescriptionDate;

    private List<PrescriptionMedicines> medicines;

    private String notes;

    private String status;

    private Date createdAt;
    
    private Date updatedAt;

	public PrescriptionResponse(int i, String patientId, String patientName, Long doctorId,
			String doctorName, Date date, List<PrescriptionMedicines> list, String notes,
			String status, Date createdAt, Date updatedAt) {
		super();
		this.prescriptionId = i;
		this.patientId = patientId;
		this.patientName = patientName;
		this.doctorId = doctorId;
		this.doctorName = doctorName;
		this.prescriptionDate = date;
		this.medicines = list;
		this.notes = notes;
		this.status = status;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

	public int getPrescriptionId() {
		return prescriptionId;
	}

	public void setPrescriptionId(int prescriptionId) {
		this.prescriptionId = prescriptionId;
	}

	public String getPatientId() {
		return patientId;
	}

	public void setPatientId(String patientId) {
		this.patientId = patientId;
	}

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public Long getDoctorId() {
		return doctorId;
	}

	public void setDoctorId(Long doctorId) {
		this.doctorId = doctorId;
	}

	public String getDoctorName() {
		return doctorName;
	}

	public void setDoctorName(String doctorName) {
		this.doctorName = doctorName;
	}

	public Date getPrescriptionDate() {
		return prescriptionDate;
	}

	public void setPrescriptionDate(Date prescriptionDate) {
		this.prescriptionDate = prescriptionDate;
	}

	public List<PrescriptionMedicines> getMedicines() {
		return medicines;
	}

	public void setMedicines(List<PrescriptionMedicines> medicines) {
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

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

	public static class CancelPrescriptionResponse{
		
		private int presctiption_id;
		private String status;
		private String cancellationReason;

		private boolean success;
		private String message;
		
		public CancelPrescriptionResponse(int presctiption_id, String status, String cancellationReason) {
			super();
			this.presctiption_id = presctiption_id;
			this.status = status;
			this.cancellationReason = cancellationReason;
		}
		
		public CancelPrescriptionResponse(boolean success, String message) {
			this.success = success; 
			this.message = message;
		}

		public int getPresctiption_id() {
			return presctiption_id;
		}

		public void setPresctiption_id(int presctiption_id) {
			this.presctiption_id = presctiption_id;
		}

		public String getStatus() {
			return status;
		}

		public void setStatus(String status) {
			this.status = status;
		}

		public String getCancellationReason() {
			return cancellationReason;
		}

		public void setCancellationReason(String cancellationReason) {
			this.cancellationReason = cancellationReason;
		}

		
		public boolean getSuccess() {
			return success;
		}

		public void setSuccess(boolean success) {
			this.success = success;
		}

		public String getError() {
			return message;
		}

		public void setError(String message) {
			this.message = message;
		}
		
		
	}
}