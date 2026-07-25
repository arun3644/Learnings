package com.hospital.service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.hospital.dto.AppointmentResponse;
import com.hospital.model.Appointment;
import com.hospital.model.Doctor;
import com.hospital.model.Patient;
import com.hospital.repository.AppointmentRepository;
import com.hospital.repository.DoctorRepository;
import com.hospital.repository.PatientRepository;

@Service
public class StatisticsService {
	
	private final PatientRepository patientRepository;
	private final DoctorRepository doctorRepository;
	private final AppointmentRepository appointmentRepository;
	
	public StatisticsService(PatientRepository patientRepository, DoctorRepository doctorRepository,
			AppointmentRepository appointmentRepository) {
		this.patientRepository = patientRepository;
		this.doctorRepository = doctorRepository;
		this.appointmentRepository = appointmentRepository;
	}
	
	public Integer getTotalPatientsCount() {
		return (int) patientRepository.count();
	}
	
	public Integer getTotalDoctorsCount() {
		return (int) doctorRepository.count();
	}
	
	public Integer getTotalAppointmentsCount() {
		return (int) appointmentRepository.count();
	}
	
	public List<AppointmentResponse.AppointmentData> getAppointmentsByStatus(String status) {
		List<Appointment> appointments = appointmentRepository.findByStatus(status);
		return appointments.stream()
			.map(this::buildAppointmentData)
			.collect(Collectors.toList());
	}
	
	public List<AppointmentResponse.AppointmentData> getTodayAppointments() {
		Calendar cal = Calendar.getInstance();
		cal.set(Calendar.HOUR_OF_DAY, 0);
		cal.set(Calendar.MINUTE, 0);
		cal.set(Calendar.SECOND, 0);
		cal.set(Calendar.MILLISECOND, 0);
		Date today = cal.getTime();
		
		List<Appointment> allAppointments = appointmentRepository.findAll();
		
		List<Appointment> todayAppointments = allAppointments.stream()
			.filter(apt -> {
				Calendar aptCal = Calendar.getInstance();
				aptCal.setTime(apt.getAppointmentDate());
				aptCal.set(Calendar.HOUR_OF_DAY, 0);
				aptCal.set(Calendar.MINUTE, 0);
				aptCal.set(Calendar.SECOND, 0);
				aptCal.set(Calendar.MILLISECOND, 0);
				return aptCal.getTime().equals(today);
			})
			.collect(Collectors.toList());
		
		return todayAppointments.stream()
			.map(this::buildAppointmentData)
			.collect(Collectors.toList());
	}
	
	public List<AppointmentResponse.AppointmentData> getUpcomingAppointments() {
		Calendar cal = Calendar.getInstance();
		cal.set(Calendar.HOUR_OF_DAY, 0);
		cal.set(Calendar.MINUTE, 0);
		cal.set(Calendar.SECOND, 0);
		cal.set(Calendar.MILLISECOND, 0);
		Date today = cal.getTime();
		
		List<Appointment> allAppointments = appointmentRepository.findAll();
		
		List<Appointment> upcomingAppointments = allAppointments.stream()
			.filter(apt -> apt.getAppointmentDate().compareTo(today) >= 0 
				&& ("Scheduled".equals(apt.getStatus()) || "Rescheduled".equals(apt.getStatus())))
			.collect(Collectors.toList());
		
		return upcomingAppointments.stream()
			.map(this::buildAppointmentData)
			.collect(Collectors.toList());
	}
	
	private AppointmentResponse.AppointmentData buildAppointmentData(Appointment appointment) {
		Patient patient = patientRepository.findById(appointment.getPatientId()).orElse(null);
		Doctor doctor = doctorRepository.findById(appointment.getDoctorId()).orElse(null);
		
		if (patient == null || doctor == null) {
			return null;
		}
		
		AppointmentResponse.PatientBasicInfo patientInfo = new AppointmentResponse.PatientBasicInfo(
			patient.getId(),
			patient.getName(),
			patient.getPatientId()
		);
		
		AppointmentResponse.DoctorBasicInfo doctorInfo = new AppointmentResponse.DoctorBasicInfo(
			doctor.getId(),
			doctor.getName(),
			doctor.getSpecialization()
		);
		
		return new AppointmentResponse.AppointmentData(
			appointment.getId(),
			appointment.getAppointmentId(),
			patientInfo,
			doctorInfo,
			appointment.getAppointmentDate(),
			appointment.getAppointmentTime(),
			appointment.getDuration(),
			appointment.getReason(),
			appointment.getStatus(),
			appointment.getCreatedAt()
		);
	}
}
