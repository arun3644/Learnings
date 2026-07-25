package com.hospital.dto;

import java.util.List;

public class PatientDashboardStats {
	private Long patientId;
	private String patientIdNumber;
	private String patientName;
	private Integer age;
	private String bloodGroup;
	private Stats stats;
	private List<UpcomingAppointments> upcomingAppointments;
	private List<RecentAppointments> recentAppointments;
	
	private String error;
	private String message;
	
	public PatientDashboardStats(String error, String message) {
		this.error = error;
		this.message = message;
	}

	public PatientDashboardStats(Long patientId, String patientIdNumber, String patientName, Integer age,
			String bloodGroup, Stats stats, List<UpcomingAppointments> upcomingAppointments,
			List<RecentAppointments> recentAppointments) {
		this.patientId = patientId;
		this.patientIdNumber = patientIdNumber;
		this.patientName = patientName;
		this.age = age;
		this.bloodGroup = bloodGroup;
		this.stats = stats;
		this.upcomingAppointments = upcomingAppointments;
		this.recentAppointments = recentAppointments;
	}

	public Long getPatientId() {
		return patientId;
	}

	public void setPatientId(Long patientId) {
		this.patientId = patientId;
	}

	public String getPatientIdNumber() {
		return patientIdNumber;
	}

	public void setPatientIdNumber(String patientIdNumber) {
		this.patientIdNumber = patientIdNumber;
	}

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public Integer getAge() {
		return age;
	}

	public void setAge(Integer age) {
		this.age = age;
	}

	public String getBloodGroup() {
		return bloodGroup;
	}

	public void setBloodGroup(String bloodGroup) {
		this.bloodGroup = bloodGroup;
	}

	public Stats getStats() {
		return stats;
	}

	public void setStats(Stats stats) {
		this.stats = stats;
	}

	public List<UpcomingAppointments> getUpcomingAppointments() {
		return upcomingAppointments;
	}

	public void setUpcomingAppointments(List<UpcomingAppointments> upcomingAppointments) {
		this.upcomingAppointments = upcomingAppointments;
	}

	public List<RecentAppointments> getRecentAppointments() {
		return recentAppointments;
	}

	public void setRecentAppointments(List<RecentAppointments> recentAppointments) {
		this.recentAppointments = recentAppointments;
	}

	public String getError() {
		return error;
	}

	public void setError(String error) {
		this.error = error;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public static class Stats {
		private Integer totalAppointments;
		private Integer upcomingAppointments;
		private Integer completedAppointments;
		private Integer cancelledAppointments;
		private String nextAppointmentDate;
		private String lastVisitDate;
		
		public Stats(Integer totalAppointments, Integer upcomingAppointments, Integer completedAppointments,
				Integer cancelledAppointments, String nextAppointmentDate, String lastVisitDate) {
			this.totalAppointments = totalAppointments;
			this.upcomingAppointments = upcomingAppointments;
			this.completedAppointments = completedAppointments;
			this.cancelledAppointments = cancelledAppointments;
			this.nextAppointmentDate = nextAppointmentDate;
			this.lastVisitDate = lastVisitDate;
		}

		public Integer getTotalAppointments() {
			return totalAppointments;
		}

		public void setTotalAppointments(Integer totalAppointments) {
			this.totalAppointments = totalAppointments;
		}

		public Integer getUpcomingAppointments() {
			return upcomingAppointments;
		}

		public void setUpcomingAppointments(Integer upcomingAppointments) {
			this.upcomingAppointments = upcomingAppointments;
		}

		public Integer getCompletedAppointments() {
			return completedAppointments;
		}

		public void setCompletedAppointments(Integer completedAppointments) {
			this.completedAppointments = completedAppointments;
		}

		public Integer getCancelledAppointments() {
			return cancelledAppointments;
		}

		public void setCancelledAppointments(Integer cancelledAppointments) {
			this.cancelledAppointments = cancelledAppointments;
		}

		public String getNextAppointmentDate() {
			return nextAppointmentDate;
		}

		public void setNextAppointmentDate(String nextAppointmentDate) {
			this.nextAppointmentDate = nextAppointmentDate;
		}

		public String getLastVisitDate() {
			return lastVisitDate;
		}

		public void setLastVisitDate(String lastVisitDate) {
			this.lastVisitDate = lastVisitDate;
		}
	}
	
	public static class UpcomingAppointments {
		private Long id;
		private String appointmentId;
		private String doctorName;
		private String specialization;
		private String appointmentDate;
		private String time;
		private Integer duration;
		private String status;
		private String reason;
		
		public UpcomingAppointments(Long id, String appointmentId, String doctorName, String specialization,
				String appointmentDate, String time, Integer duration, String status, String reason) {
			this.id = id;
			this.appointmentId = appointmentId;
			this.doctorName = doctorName;
			this.specialization = specialization;
			this.appointmentDate = appointmentDate;
			this.time = time;
			this.duration = duration;
			this.status = status;
			this.reason = reason;
		}

		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public String getAppointmentId() {
			return appointmentId;
		}

		public void setAppointmentId(String appointmentId) {
			this.appointmentId = appointmentId;
		}

		public String getDoctorName() {
			return doctorName;
		}

		public void setDoctorName(String doctorName) {
			this.doctorName = doctorName;
		}

		public String getSpecialization() {
			return specialization;
		}

		public void setSpecialization(String specialization) {
			this.specialization = specialization;
		}

		public String getAppointmentDate() {
			return appointmentDate;
		}

		public void setAppointmentDate(String appointmentDate) {
			this.appointmentDate = appointmentDate;
		}

		public String getTime() {
			return time;
		}

		public void setTime(String time) {
			this.time = time;
		}

		public Integer getDuration() {
			return duration;
		}

		public void setDuration(Integer duration) {
			this.duration = duration;
		}

		public String getStatus() {
			return status;
		}

		public void setStatus(String status) {
			this.status = status;
		}

		public String getReason() {
			return reason;
		}

		public void setReason(String reason) {
			this.reason = reason;
		}
	}
	
	public static class RecentAppointments {
		private Long id;
		private String appointmentId;
		private String doctorName;
		private String appointmentDate;
		private String time;
		private String status;
		
		public RecentAppointments(Long id, String appointmentId, String doctorName, String appointmentDate,
				String time, String status) {
			this.id = id;
			this.appointmentId = appointmentId;
			this.doctorName = doctorName;
			this.appointmentDate = appointmentDate;
			this.time = time;
			this.status = status;
		}

		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public String getAppointmentId() {
			return appointmentId;
		}

		public void setAppointmentId(String appointmentId) {
			this.appointmentId = appointmentId;
		}

		public String getDoctorName() {
			return doctorName;
		}

		public void setDoctorName(String doctorName) {
			this.doctorName = doctorName;
		}

		public String getAppointmentDate() {
			return appointmentDate;
		}

		public void setAppointmentDate(String appointmentDate) {
			this.appointmentDate = appointmentDate;
		}

		public String getTime() {
			return time;
		}

		public void setTime(String time) {
			this.time = time;
		}

		public String getStatus() {
			return status;
		}

		public void setStatus(String status) {
			this.status = status;
		}
	}
}
