package com.hospital.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;


@JsonInclude(JsonInclude.Include.NON_NULL)
public class DoctorDashboardStats {
	private Long doctorId;
	private String doctorName;
	private String specialization;
	private Stats stats;
	private List<TodaySchedule> todaySchedule;
	private List<UpcomingAppointments> upcomingAppointments;
	
	private String error;
	private String message;
	
	
	public DoctorDashboardStats(String error, String message) {
		super();
		this.error = error;
		this.message = message;
	}

	public DoctorDashboardStats(Long doctorId, String doctorName, String specialization, Stats stats,
			List<TodaySchedule> todaySchedule, List<UpcomingAppointments> upcomingAppointments) {
		super();
		this.doctorId = doctorId;
		this.doctorName = doctorName;
		this.specialization = specialization;
		this.stats = stats;
		this.todaySchedule = todaySchedule;
		this.upcomingAppointments = upcomingAppointments;
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

	public String getSpecialization() {
		return specialization;
	}

	public void setSpecialization(String specialization) {
		this.specialization = specialization;
	}

	public Stats getStats() {
		return stats;
	}

	public void setStats(Stats stats) {
		this.stats = stats;
	}

	public List<TodaySchedule> getTodaySchedule() {
		return todaySchedule;
	}

	public void setTodaySchedule(List<TodaySchedule> todaySchedule) {
		this.todaySchedule = todaySchedule;
	}

	public List<UpcomingAppointments> getUpcomingAppointments() {
		return upcomingAppointments;
	}

	public void setUpcomingAppointments(List<UpcomingAppointments> upcomingAppointments) {
		this.upcomingAppointments = upcomingAppointments;
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



	public static class Stats{
		private Integer  totalAppointments;
		private Integer  todayAppointments;
		private Integer  upcomingAppointments;
		private Integer  completedAppointments ;
		private Integer  cancelledAppointments;
		private Integer  totalPatients;
		private Integer  availableSlots;
		
		public Stats(Integer totalAppointments, Integer todayAppointments, Integer upcomingAppointments,
				Integer completedAppointments, Integer cancelledAppointments, Integer totalPatients,
				Integer availableSlots) {
			super();
			this.totalAppointments = totalAppointments;
			this.todayAppointments = todayAppointments;
			this.upcomingAppointments = upcomingAppointments;
			this.completedAppointments = completedAppointments;
			this.cancelledAppointments = cancelledAppointments;
			this.totalPatients = totalPatients;
			this.availableSlots = availableSlots;
		}
		public Integer getTotalAppointments() {
			return totalAppointments;
		}
		public void setTotalAppointments(Integer totalAppointments) {
			this.totalAppointments = totalAppointments;
		}
		public Integer getTodayAppointments() {
			return todayAppointments;
		}
		public void setTodayAppointments(Integer todayAppointments) {
			this.todayAppointments = todayAppointments;
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
		public Integer getTotalPatients() {
			return totalPatients;
		}
		public void setTotalPatients(Integer totalPatients) {
			this.totalPatients = totalPatients;
		}
		public Integer getAvailableSlots() {
			return availableSlots;
		}
		public void setAvailableSlots(Integer availableSlots) {
			this.availableSlots = availableSlots;
		}
		
	}
	
	public static class TodaySchedule{
		private Long id;
		private String appointmentId;
		private String patientName;
		private String patientId;
		private String time;
		private Integer duration;
		private String status;
		private String reason;
		
		public TodaySchedule(Long id, String appointmentId, String patientName, String patientId, String time, Integer duration,
				String status, String reason) {
			super();
			this.id = id;
			this.appointmentId = appointmentId;
			this.patientName = patientName;
			this.patientId = patientId;
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

		public String getPatientName() {
			return patientName;
		}

		public void setPatientName(String patientName) {
			this.patientName = patientName;
		}

		public String getPatientId() {
			return patientId;
		}

		public void setPatientId(String patientId) {
			this.patientId = patientId;
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
	
	public static class UpcomingAppointments{
		 private Long id;
		 private String appointmentId;
		 private String patientName;
		 private String patientId;
		 private String appointmentDate;
		 private String time;
		 private String status;
		 private Integer duration;
		 private String reason;
		
		 public UpcomingAppointments(Long id, String appointmentId, String patientName, String patientId,
				String appointmentDate, String time, String status, Integer duration, String reason) {
			super();
			this.id = id;
			this.appointmentId = appointmentId;
			this.patientName = patientName;
			this.patientId = patientId;
			this.appointmentDate = appointmentDate;
			this.time = time;
			this.status = status;
			this.duration = duration;
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

		 public String getPatientName() {
			 return patientName;
		 }

		 public void setPatientName(String patientName) {
			 this.patientName = patientName;
		 }

		 public String getPatientId() {
			 return patientId;
		 }

		 public void setPatientId(String patientId) {
			 this.patientId = patientId;
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

		 public Integer getDuration() {
			 return duration;
		 }

		 public void setDuration(Integer duration) {
			 this.duration = duration;
		 }

		 public String getReason() {
			 return reason;
		 }

		 public void setReason(String reason) {
			 this.reason = reason;
		 }
		 
	}
}
