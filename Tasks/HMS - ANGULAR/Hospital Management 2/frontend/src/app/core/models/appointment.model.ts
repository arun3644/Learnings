export interface Appointment {
  id: number;
  appointmentId?: string;
  patientId: number;
  patientName?: string;
  doctorId: number;
  doctorName?: string;
  date: Date;
  appointmentDate?: string;
  time: string;
  timeSlot?: string;
  duration?: number;
  reason: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled' | 'Rescheduled';
  notes?: string;
  createdAt?: Date;
}
