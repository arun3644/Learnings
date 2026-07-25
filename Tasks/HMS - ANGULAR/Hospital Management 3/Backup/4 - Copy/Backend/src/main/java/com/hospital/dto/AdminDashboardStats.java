package com.hospital.dto;

import java.util.List;

public class AdminDashboardStats {
	private Boolean success;
	private Stats stats;
	private List<RecentActivity> recentActivity;
	private List<UpcomingAppointments> upcomingAppointments;
	private List<CriticalPatients> criticalPatients;
	
	private String error;
	private String message;
	
	public AdminDashboardStats(String error, String message) {
		this.success = false;
		this.error = error;
		this.message = message;
	}

	public AdminDashboardStats(Boolean success, Stats stats, List<RecentActivity> recentActivity,
			List<UpcomingAppointments> upcomingAppointments, List<CriticalPatients> criticalPatients) {
		this.success = success;
		this.stats = stats;
		this.recentActivity = recentActivity;
		this.upcomingAppointments = upcomingAppointments;
		this.criticalPatients = criticalPatients;
	}

	public Boolean getSuccess() {
		return success;
	}

	public void setSuccess(Boolean success) {
		this.success = success;
	}

	public Stats getStats() {
		return stats;
	}

	public void setStats(Stats stats) {
		this.stats = stats;
	}

	public List<RecentActivity> getRecentActivity() {
		return recentActivity;
	}

	public void setRecentActivity(List<RecentActivity> recentActivity) {
		this.recentActivity = recentActivity;
	}

	public List<UpcomingAppointments> getUpcomingAppointments() {
		return upcomingAppointments;
	}

	public void setUpcomingAppointments(List<UpcomingAppointments> upcomingAppointments) {
		this.upcomingAppointments = upcomingAppointments;
	}

	public List<CriticalPatients> getCriticalPatients() {
		return criticalPatients;
	}

	public void setCriticalPatients(List<CriticalPatients> criticalPatients) {
		this.criticalPatients = criticalPatients;
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
		private Integer totalPatients;
		private Integer totalDoctors;
		private Integer totalStaff;
		private Integer appointments;
		private Integer totalNurse;
		private Integer todayAppointments;
		
		public Stats(Integer totalPatients, Integer totalDoctors, Integer totalStaff, Integer appointments,
				Integer totalNurse, Integer todayAppointments) {
			this.totalPatients = totalPatients;
			this.totalDoctors = totalDoctors;
			this.totalStaff = totalStaff;
			this.appointments = appointments;
			this.totalNurse = totalNurse;
			this.todayAppointments = todayAppointments;
		}

		public Integer getTotalPatients() {
			return totalPatients;
		}

		public void setTotalPatients(Integer totalPatients) {
			this.totalPatients = totalPatients;
		}

		public Integer getTotalDoctors() {
			return totalDoctors;
		}

		public void setTotalDoctors(Integer totalDoctors) {
			this.totalDoctors = totalDoctors;
		}

		public Integer getTotalStaff() {
			return totalStaff;
		}

		public void setTotalStaff(Integer totalStaff) {
			this.totalStaff = totalStaff;
		}

		public Integer getAppointments() {
			return appointments;
		}

		public void setAppointments(Integer appointments) {
			this.appointments = appointments;
		}

		public Integer getTotalNurse() {
			return totalNurse;
		}

		public void setTotalNurse(Integer totalNurse) {
			this.totalNurse = totalNurse;
		}

		public Integer getTodayAppointments() {
			return todayAppointments;
		}

		public void setTodayAppointments(Integer todayAppointments) {
			this.todayAppointments = todayAppointments;
		}
	}
	
	public static class RecentActivity {
		private Long id;
		private String type;
		private String message;
		private String timestamp;
		private String user;
		
		public RecentActivity(Long id, String type, String message, String timestamp, String user) {
			this.id = id;
			this.type = type;
			this.message = message;
			this.timestamp = timestamp;
			this.user = user;
		}

		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public String getType() {
			return type;
		}

		public void setType(String type) {
			this.type = type;
		}

		public String getMessage() {
			return message;
		}

		public void setMessage(String message) {
			this.message = message;
		}

		public String getTimestamp() {
			return timestamp;
		}

		public void setTimestamp(String timestamp) {
			this.timestamp = timestamp;
		}

		public String getUser() {
			return user;
		}

		public void setUser(String user) {
			this.user = user;
		}
	}
	
	public static class UpcomingAppointments {
		private Long id;
		private String patientName;
		private String doctorName;
		private String date;
		private String time;
		private String status;
		
		public UpcomingAppointments(Long id, String patientName, String doctorName, String date, String time,
				String status) {
			this.id = id;
			this.patientName = patientName;
			this.doctorName = doctorName;
			this.date = date;
			this.time = time;
			this.status = status;
		}

		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public String getPatientName() {
			return patientName;
		}

		public void setPatientName(String patientName) {
			this.patientName = patientName;
		}

		public String getDoctorName() {
			return doctorName;
		}

		public void setDoctorName(String doctorName) {
			this.doctorName = doctorName;
		}

		public String getDate() {
			return date;
		}

		public void setDate(String date) {
			this.date = date;
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
	
	public static class CriticalPatients {
		private Long id;
		private String name;
		private String condition;
		private String ward;
		
		public CriticalPatients(Long id, String name, String condition, String ward) {
			this.id = id;
			this.name = name;
			this.condition = condition;
			this.ward = ward;
		}

		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		public String getCondition() {
			return condition;
		}

		public void setCondition(String condition) {
			this.condition = condition;
		}

		public String getWard() {
			return ward;
		}

		public void setWard(String ward) {
			this.ward = ward;
		}
	}
}
