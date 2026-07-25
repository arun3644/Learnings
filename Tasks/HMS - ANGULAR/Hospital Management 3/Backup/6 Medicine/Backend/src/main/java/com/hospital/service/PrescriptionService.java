package com.hospital.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.hospital.dto.PrescriptionMedicineRequest;
import com.hospital.dto.PrescriptionRequest;
import com.hospital.dto.PrescriptionResponse;
import com.hospital.model.Doctor;
import com.hospital.model.Medicine;
import com.hospital.model.Patient;
import com.hospital.model.Prescription;
import com.hospital.model.PrescriptionMedicines;
import com.hospital.repository.DoctorRepository;
import com.hospital.repository.MedicineRepository;
import com.hospital.repository.PatientRepository;
import com.hospital.repository.PrescriptionRepository;

import jakarta.transaction.Transactional;

@Service
public class PrescriptionService {
	   private final PrescriptionRepository prescriptionRepository;
	   private final PatientRepository patientRepository;
	   private final DoctorRepository doctorRepository;
	   private final MedicineRepository medicineRepository;
	   
	   public PrescriptionService(
			   PrescriptionRepository prescriptionRepository,
			   PatientRepository patientRepository,
			   DoctorRepository doctorRepository,
			   MedicineRepository medicineRepository) {
		   this.prescriptionRepository = prescriptionRepository;
		   this.patientRepository = patientRepository;
		   this.doctorRepository = doctorRepository;
		   this.medicineRepository = medicineRepository;
	   }
	   
	   @Transactional
	   public PrescriptionResponse createPrescription(PrescriptionRequest request) {
		    Prescription prescription = new Prescription();
		    prescription.setDoctorId(request.getDoctorId());
		    prescription.setPatientId(request.getPatientId());
		    prescription.setPrescriptionDate(request.getPrescriptionDate());
		    prescription.setNotes(request.getNotes());
		    prescription.setStatus(request.getStatus());

		    List<PrescriptionMedicines> medicineList = new ArrayList<>();

		    for (PrescriptionMedicineRequest med : request.getMedicines()) {
		        PrescriptionMedicines medicine = new PrescriptionMedicines();
		        Medicine medi = medicineRepository.findByMedicineCode(med.getMedicineCode())
		                .orElseThrow(() -> new RuntimeException("Medicine not found with code: " + med.getMedicineCode()));

		        medicine.setDuration(med.getDuration());
		        medicine.setDosage(med.getDosage());
		        medicine.setFrequency(med.getFrequency());
		        medicine.setInstructions(med.getInstructions());
		        medicine.setMedicineCode(med.getMedicineCode());
		        medicine.setMedicineName(medi.getMedicineName());
		        medicine.setQuantity(med.getQuantity());
		        
		        medicine.setMorning(med.getMorning());
		        medicine.setMorningAfterFood(med.getMorningAfterFood());

		        medicine.setNoon(med.getNoon());
		        medicine.setNoonAfterFood(med.getNoonAfterFood());

		        medicine.setNight(med.getNight());
		        medicine.setNightAfterFood(med.getNightAfterFood());
		        
		        medicine.setPrescription(prescription);

		        medicineList.add(medicine);
		    }

		    prescription.setMedicines(medicineList);

		    Prescription savedPrescription = prescriptionRepository.save(prescription);
		    return convertToResponse(savedPrescription);
		}


	    @Transactional
		public PrescriptionResponse updatePrescription( int prescriptionId, PrescriptionRequest request) {
		
		    Prescription prescription = prescriptionRepository.findByPrescriptionId(prescriptionId)
		                    .orElseThrow(() ->  new RuntimeException("Prescription not found with id: " + prescriptionId));
		
		    prescription.setDoctorId(request.getDoctorId());
		    prescription.setPatientId(request.getPatientId());
		    prescription.setPrescriptionDate(request.getPrescriptionDate());
		    prescription.setNotes(request.getNotes());
		    prescription.setStatus(request.getStatus());
		
		    prescription.getMedicines().clear();
		    for (PrescriptionMedicineRequest med : request.getMedicines()) {
		
		        PrescriptionMedicines medicine = new PrescriptionMedicines();
		
		        Medicine medi = medicineRepository.findByMedicineCode(med.getMedicineCode())
		                .orElseThrow(() ->   new RuntimeException("Medicine not found with code: " + med.getMedicineCode()));
		
		        medicine.setMedicineCode(med.getMedicineCode());
		        medicine.setMedicineName(medi.getMedicineName());
		
		        medicine.setDosage(med.getDosage());
		        medicine.setFrequency(med.getFrequency());
		        medicine.setDuration(med.getDuration());
		        medicine.setInstructions(med.getInstructions());
		        medicine.setQuantity(med.getQuantity());
		
		        medicine.setMorning(med.getMorning());
		        medicine.setMorningAfterFood(med.getMorningAfterFood());
		
		        medicine.setNoon(med.getNoon());
		        medicine.setNoonAfterFood(med.getNoonAfterFood());
		
		        medicine.setNight(med.getNight());
		        medicine.setNightAfterFood(med.getNightAfterFood());
		
		        medicine.setPrescription(prescription);
		
		        prescription.getMedicines().add(medicine);
		    }
		    
		    Prescription updatedPescription = prescriptionRepository.save(prescription);
		    return convertToResponse(updatedPescription);
		}

	    public PrescriptionResponse.CancelPrescriptionResponse cancelPrescription(int prescriptionId, PrescriptionRequest.CancelPrescriptionRequest request) {
	    	Prescription prescription = prescriptionRepository.findByPrescriptionId(prescriptionId)
	    			.orElseThrow(() -> new RuntimeException("Prescription not found with id: "+ prescriptionId));
	    		
	    	if(prescription.getStatus().equals("cancelled")) {
	    		return new PrescriptionResponse.CancelPrescriptionResponse(false, "Prescription already cancelled");
	    	}
	    	
	    	prescription.setStatus("cancelled");
	    	prescription.setCancellationReason(request.getCancellationReason());
	    	Prescription updatedPrescription = prescriptionRepository.save(prescription);
	    	
	    	return new PrescriptionResponse.CancelPrescriptionResponse(
	    	        updatedPrescription.getPrescriptionId(),
	    	        updatedPrescription.getStatus(),
	    	        updatedPrescription.getCancellationReason());
	    }

	    public PrescriptionResponse getPrescriptionById( int prescriptionId ) {
	    	Prescription prescription = prescriptionRepository.findByPrescriptionId(prescriptionId)
	    			.orElseThrow(() -> new RuntimeException("Prescription not found with id: "+ prescriptionId));
	    	return convertToResponse(prescription);
	    }

	    public List<PrescriptionResponse> getAllPrescriptions(){
	    	return  prescriptionRepository.findAll().stream()
	    			.filter(med -> med.getStatus() != "cancelled")
	    			.map(this::convertToResponse).collect(Collectors.toList());
	    }
	   
	   private PrescriptionResponse convertToResponse(Prescription prescription) {
		 
		  Patient patient = patientRepository.findByPatientId(prescription.getPatientId())
				  .orElseThrow(() -> new RuntimeException("Doctor not found"));
			    
		  
		  Doctor doctor  = doctorRepository.findById(prescription.getDoctorId())
		   		.orElseThrow(() -> new RuntimeException("Doctor not found"));
		  
		  return new PrescriptionResponse(
				    prescription.getPrescriptionId(),

				    prescription.getPatientId(),

				    patient.getUsername(),
				    
				    prescription.getDoctorId(),

				    doctor.getUsername(),

				    prescription.getPrescriptionDate(),

				    prescription.getMedicines(),

				    prescription.getNotes(),
				    
				    prescription.getStatus(),

				    prescription.getCreatedAt(),
				    
				    prescription.getUpdatedAt()
				  );
	   }
}
