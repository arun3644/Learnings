package com.hospital.service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.hospital.dto.AdminDashboardStats;
import com.hospital.dto.DoctorDashboardStats;
import com.hospital.dto.PatientDashboardStats;
import com.hospital.model.Appointment;
import com.hospital.model.Doctor;
import com.hospital.model.Nurse;
import com.hospital.model.Patient;
import com.hospital.repository.AdminRepository;
import com.hospital.repository.AppointmentRepository;
import com.hospital.repository.DoctorRepository;
import com.hospital.repository.DoctorTimeSlotRepository;
import com.hospital.repository.NurseRepository;
import com.hospital.repository.PatientRepository;

@Service
public class DashBoardService {
	
	private final DoctorRepository doctorRepository;
	private final AppointmentService appointmentService;
	private final PatientRepository patientRepository;
	private final DoctorTimeSlotRepository doctorTimeSlotRepository;
	private final AppointmentRepository appointmentRepository;
	private final NurseRepository nurseRepository;
	private final AdminRepository adminRepository;
	
	public DashBoardService(
			DoctorRepository doctorRepository, DoctorService doctorService, 
			AppointmentService appointmentService, PatientRepository patientRepository,
			DoctorTimeSlotRepository doctorTimeSlotRepository, AppointmentRepository appointmentRepository,
			NurseRepository nurseRepository, AdminRepository adminRepository) {
		this.doctorRepository = doctorRepository;
		this.appointmentService = appointmentService;
		this.patientRepository = patientRepository;
		this.doctorTimeSlotRepository = doctorTimeSlotRepository;
		this.appointmentRepository = appointmentRepository;
		this.nurseRepository = nurseRepository;
		this.adminRepository = adminRepository;
	}
	
	public DoctorDashboardStats getDoctorDashBaordStats(Long id) {
		Optional<Doctor> doctorOpt = doctorRepository.findById(id);
		if(!doctorOpt.isPresent()) {
			return new DoctorDashboardStats("error", "Doctor not found with ID: "+ id);
		}
		
		Doctor doctor = doctorOpt.get();
		List<Appointment> apts = appointmentService.getAppointmentsByDate(id , new Date());

		List<DoctorDashboardStats.TodaySchedule> todaySchedule = apts.stream()
				.map(apt -> {
					
					Patient patient = patientRepository.findById(apt.getPatientId())
						    .orElseThrow(() -> new RuntimeException("Patient not found with id: " + apt.getPatientId()));
					DoctorDashboardStats.TodaySchedule res = new DoctorDashboardStats.TodaySchedule(
							id,
							apt.getAppointmentId(),
							patient.getName(),
							patient.getPatientId(),
							apt.getAppointmentTime(),
							apt.getDuration(),
							apt.getStatus(),
							apt.getReason()
					);
					return res;
				})
				.collect(Collectors.toList());
		
		List<Appointment> allAppointments = appointmentRepository.findByDoctorId(id);

		Integer totalAppointments = allAppointments.size();

		Calendar cal = Calendar.getInstance();
		cal.set(Calendar.HOUR_OF_DAY, 0);
		cal.set(Calendar.MINUTE, 0);
		cal.set(Calendar.SECOND, 0);
		cal.set(Calendar.MILLISECOND, 0);
		Date today = cal.getTime();

		Integer todayAppointments = (int) allAppointments.stream()
		    .filter(apt -> {
		        Calendar aptCal = Calendar.getInstance();
		        aptCal.setTime(apt.getAppointmentDate());
		        aptCal.set(Calendar.HOUR_OF_DAY, 0);
		        aptCal.set(Calendar.MINUTE, 0);
		        aptCal.set(Calendar.SECOND, 0);
		        aptCal.set(Calendar.MILLISECOND, 0);
		        return aptCal.getTime().equals(today);
		    }).count();
		
		
		Integer upcomingAptCount = (int) allAppointments.stream()
				.filter(apt -> apt.getAppointmentDate().compareTo(today) >= 0 && 
				("Scheduled".equals(apt.getStatus()) || ("Rescheduled".equals(apt.getStatus())))).count();
		
		Integer completedAppointments = (int) allAppointments.stream()
				.filter(apt -> "Completed".equals(apt.getStatus())).count();
		
		Integer cancelledAppointments = (int) allAppointments.stream()
				.filter(apt -> "Cancelled".equals(apt.getStatus())).count();
		
		Integer totalPatients = (int) allAppointments.stream() 
				.map(Appointment::getPatientId).distinct().count();
		
		Integer availableSlots = (int) doctorTimeSlotRepository.findByDoctorIdAndIsAvailable(id, true).stream()
				.filter(slot -> slot.getDate().compareTo(today) >= 0).count();
		
		DoctorDashboardStats.Stats stats = new DoctorDashboardStats.Stats(
				totalAppointments,
				todayAppointments, 
				upcomingAptCount,
				completedAppointments,
				cancelledAppointments,
				totalPatients,
				availableSlots
				);
			
		List<Appointment> upcomingApts = allAppointments.stream()
			    .filter(apt -> apt.getAppointmentDate().compareTo(today) >= 0 
			        && ("Scheduled".equals(apt.getStatus()) || "Rescheduled".equals(apt.getStatus())))
			    .collect(Collectors.toList());
		
		List<DoctorDashboardStats.UpcomingAppointments> upcomingAppointments = upcomingApts.stream() 
				.map( apt -> {
					// Patient patient = patientRepository.findById(apt.getPatientId()).get();
					Patient patient = patientRepository.findById(apt.getPatientId())
						.orElse(null);
					if (patient == null) return null;
					return new DoctorDashboardStats.UpcomingAppointments(
						apt.getId(),
						apt.getAppointmentId(),
						patient.getName(),
						patient.getPatientId(),
						apt.getAppointmentDate().toString(),
						apt.getAppointmentTime(),
						apt.getStatus(),
						apt.getDuration(),
						apt.getReason()
					);
				}).collect(Collectors.toList());

		return new DoctorDashboardStats(
				doctor.getId(),
				doctor.getName(),
				doctor.getSpecialization(),
				stats,
				todaySchedule,
				upcomingAppointments
				);
	}
	
	public PatientDashboardStats getPatientDashBoardStats(Long id) {
		Optional<Patient> patientOpt = patientRepository.findById(id);
		if(!patientOpt.isPresent()) {
			return new PatientDashboardStats("error", "Patient not found with ID: "+ id);
		}
		
		Patient patient = patientOpt.get();
		List<Appointment> allAppointments = appointmentRepository.findByPatientId(id);

		Integer totalAppointments = allAppointments.size();

		Calendar cal = Calendar.getInstance();
		cal.set(Calendar.HOUR_OF_DAY, 0);
		cal.set(Calendar.MINUTE, 0);
		cal.set(Calendar.SECOND, 0);
		cal.set(Calendar.MILLISECOND, 0);
		Date today = cal.getTime();

		Integer upcomingAptCount = (int) allAppointments.stream()
				.filter(apt -> apt.getAppointmentDate().compareTo(today) >= 0 && 
				("Scheduled".equals(apt.getStatus()) || ("Rescheduled".equals(apt.getStatus())))).count();
		
		Integer completedAppointments = (int) allAppointments.stream()
				.filter(apt -> "Completed".equals(apt.getStatus())).count();
		
		Integer cancelledAppointments = (int) allAppointments.stream()
				.filter(apt -> "Cancelled".equals(apt.getStatus())).count();
		
		String nextAppointmentDate = allAppointments.stream()
				.filter(apt -> apt.getAppointmentDate().compareTo(today) >= 0 && 
				("Scheduled".equals(apt.getStatus()) || "Rescheduled".equals(apt.getStatus())))
				.min((a1, a2) -> a1.getAppointmentDate().compareTo(a2.getAppointmentDate()))
				.map(apt -> apt.getAppointmentDate().toString())
				.orElse(null);
		
		String lastVisitDate = allAppointments.stream()
				.filter(apt -> "Completed".equals(apt.getStatus()))
				.max((a1, a2) -> a1.getAppointmentDate().compareTo(a2.getAppointmentDate()))
				.map(apt -> apt.getAppointmentDate().toString())
				.orElse(null);
		
		PatientDashboardStats.Stats stats = new PatientDashboardStats.Stats(
				totalAppointments,
				upcomingAptCount,
				completedAppointments,
				cancelledAppointments,
				nextAppointmentDate,
				lastVisitDate
				);
			
		List<Appointment> upcomingApts = allAppointments.stream()
			    .filter(apt -> apt.getAppointmentDate().compareTo(today) >= 0 
			        && ("Scheduled".equals(apt.getStatus()) || "Rescheduled".equals(apt.getStatus())))
			    .collect(Collectors.toList());
		
		List<PatientDashboardStats.UpcomingAppointments> upcomingAppointments = upcomingApts.stream() 
				.map( apt -> {
					// Doctor doctor = doctorRepository.findById(apt.getDoctorId()).get();
					Doctor doctor = doctorRepository.findById(apt.getDoctorId())
						.orElse(null);
					if (doctor == null) return null;
					return new PatientDashboardStats.UpcomingAppointments(
						apt.getId(),
						apt.getAppointmentId(),
						doctor.getName(),
						doctor.getSpecialization(),
						apt.getAppointmentDate().toString(),
						apt.getAppointmentTime(),
						apt.getDuration(),
						apt.getStatus(),
						apt.getReason()
					);
				}).collect(Collectors.toList());
		
		List<Appointment> recentApts = allAppointments.stream()
			    .filter(apt -> "Completed".equals(apt.getStatus()))
			    .sorted((a1, a2) -> a2.getAppointmentDate().compareTo(a1.getAppointmentDate()))
			    .limit(5)
			    .collect(Collectors.toList());
		
		List<PatientDashboardStats.RecentAppointments> recentAppointments = recentApts.stream()
				.map(apt -> {
					// Doctor doctor = doctorRepository.findById(apt.getDoctorId()).get();
					Doctor doctor = doctorRepository.findById(apt.getDoctorId())
						.orElse(null);
					if (doctor == null) return null;
					return new PatientDashboardStats.RecentAppointments(
						apt.getId(),
						apt.getAppointmentId(),
						doctor.getName(),
						apt.getAppointmentDate().toString(),
						apt.getAppointmentTime(),
						apt.getStatus()
					);
				}).collect(Collectors.toList());

		return new PatientDashboardStats(
				patient.getId(),
				patient.getPatientId(),
				patient.getName(),
				patient.getAge(),
				patient.getBloodGroup(),
				stats,
				upcomingAppointments,
				recentAppointments
				);
	}
	
	public AdminDashboardStats getAdminDashBoardStats() {
		try{
			List<Patient> allPatients = patientRepository.findAll();
		List<Doctor> allDoctors = doctorRepository.findAll();
		List<Nurse> allNurses = nurseRepository.findAll();
		List<Appointment> allAppointments = appointmentRepository.findAll();

		Integer totalPatients = allPatients.size();
		Integer totalDoctors = allDoctors.size();
		Integer totalNurse = allNurses.size();
		Integer totalStaff = totalDoctors + totalNurse;
		Integer appointments = allAppointments.size();

		Calendar cal = Calendar.getInstance();
		cal.set(Calendar.HOUR_OF_DAY, 0);
		cal.set(Calendar.MINUTE, 0);
		cal.set(Calendar.SECOND, 0);
		cal.set(Calendar.MILLISECOND, 0);
		Date today = cal.getTime();

		Integer todayAppointments = (int) allAppointments.stream()
		    .filter(apt -> {
		        Calendar aptCal = Calendar.getInstance();
		        aptCal.setTime(apt.getAppointmentDate());
		        aptCal.set(Calendar.HOUR_OF_DAY, 0);
		        aptCal.set(Calendar.MINUTE, 0);
		        aptCal.set(Calendar.SECOND, 0);
		        aptCal.set(Calendar.MILLISECOND, 0);
		        return aptCal.getTime().equals(today);
		    }).count();
		
		AdminDashboardStats.Stats stats = new AdminDashboardStats.Stats(
				totalPatients,
				totalDoctors,
				totalStaff,
				appointments,
				totalNurse,
				todayAppointments
				);
		
		final List<AdminDashboardStats.RecentActivity> recentActivity = new java.util.ArrayList<>();
		
		allAppointments.forEach(apt -> {
			Patient patient = patientRepository.findById(apt.getPatientId()).orElse(null);
			Doctor doctor = doctorRepository.findById(apt.getDoctorId()).orElse(null);
			
			if (patient != null && doctor != null) {
				String message = "";
				String type = "";
				
				if ("Scheduled".equals(apt.getStatus())) {
					message = "New appointment scheduled with " + doctor.getName();
					type = "Scheduled";
				} else if ("Rescheduled".equals(apt.getStatus())) {
					message = "Appointment rescheduled with " + doctor.getName();
					type = "Rescheduled";
				} else if ("Cancelled".equals(apt.getStatus())) {
					message = "Appointment cancelled with " + doctor.getName();
					type = "Cancelled";
				} else if ("Completed".equals(apt.getStatus())) {
					message = "Appointment completed with " + doctor.getName();
					type = "Completed";
				}
				
				recentActivity.add(new AdminDashboardStats.RecentActivity(
					apt.getId(),
					type,
					message,
					apt.getCreatedAt().toString(),
					patient.getName()
				));
			}
		});
		
		allPatients.forEach(patient -> {
			recentActivity.add(new AdminDashboardStats.RecentActivity(
				patient.getId(),
				"Registered",
				"New patient registered: " + patient.getName(),
				patient.getCreatedAt().toString(),
				"Admin"
			));
		});
		
		allDoctors.forEach(doctor -> {
			recentActivity.add(new AdminDashboardStats.RecentActivity(
				doctor.getId(),
				"Registered",
				"New doctor registered: " + doctor.getName() + " (" + doctor.getSpecialization() + ")",
				doctor.getCreatedAt().toString(),
				"Admin"
			));
		});
		
		allNurses.forEach(nurse -> {
			recentActivity.add(new AdminDashboardStats.RecentActivity(
				nurse.getId(),
				"Registered",
				"New nurse registered: " + nurse.getName(),
				nurse.getCreatedAt().toString(),
				"Admin"
			));
		});
		
		List<AdminDashboardStats.RecentActivity> sortedRecentActivity = recentActivity.stream()
			.sorted((a1, a2) -> {
				try {
					return a2.getTimestamp().compareTo(a1.getTimestamp());
				} catch (Exception e) {
					return 0;
				}
			})
			.limit(10)
			.collect(Collectors.toList());
		
		List<Appointment> upcomingApts = allAppointments.stream()
			    .filter(apt -> apt.getAppointmentDate().compareTo(today) >= 0 
			        && ("Scheduled".equals(apt.getStatus()) || "Rescheduled".equals(apt.getStatus())))
			    .sorted((a1, a2) -> a1.getAppointmentDate().compareTo(a2.getAppointmentDate()))
			    .limit(10)
			    .collect(Collectors.toList());
		
		List<AdminDashboardStats.UpcomingAppointments> upcomingAppointments = upcomingApts.stream()
				.map(apt -> {
					// Patient patient = patientRepository.findById(apt.getPatientId()).get();
					// Doctor doctor = doctorRepository.findById(apt.getDoctorId()).get();
					Patient patient = patientRepository.findById(apt.getPatientId())
						.orElse(null);
					Doctor doctor = doctorRepository.findById(apt.getDoctorId())
						.orElse(null);
					if (patient == null || doctor == null) return null;
					return new AdminDashboardStats.UpcomingAppointments(
						apt.getId(),
						patient.getName(),
						doctor.getName(),
						apt.getAppointmentDate().toString(),
						apt.getAppointmentTime(),
						apt.getStatus()
					);
				}).collect(Collectors.toList());
		
		List<Patient> criticalPatientsData = allPatients.stream()
			    .filter(patient -> "Critical".equalsIgnoreCase(patient.getCondition()))
			    .limit(10)
			    .collect(Collectors.toList());
		
		List<AdminDashboardStats.CriticalPatients> criticalPatients = criticalPatientsData.stream()
				.map(patient -> new AdminDashboardStats.CriticalPatients(
					patient.getId(),
					patient.getName(),
					patient.getCondition(),
					"ICU-" + patient.getId()
				)).collect(Collectors.toList());

		return new AdminDashboardStats(
				true,
				stats,
				sortedRecentActivity,
				upcomingAppointments,
				criticalPatients
				);
		}catch (Exception e) {
        System.err.println("Error in getAdminDashBoardStats: " + e.getMessage());
        e.printStackTrace();
        return new AdminDashboardStats(false, null, null, null, null);
   	   }
		
	}
}
