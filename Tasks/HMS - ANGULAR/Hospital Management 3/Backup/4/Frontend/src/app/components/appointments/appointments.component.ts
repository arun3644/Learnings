import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

interface CalendarDay {
  date: number;
  fullDate: Date;
  isOtherMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isDisabled: boolean;
}

interface TimeSlot {
  time: string;
  isBooked: boolean;
  isSelected: boolean;
  isPastTime: boolean;
}

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './appointments.component.html'
})
export class AppointmentsComponent implements OnInit {
  meta: any = null;

  currentMonth = '';
  currentYear = new Date().getFullYear();
  currentMonthIndex = new Date().getMonth();
  calendarDays: CalendarDay[] = [];
  selectedDate = new Date();

  timeSlots: TimeSlot[] = [];
  selectedSlot: TimeSlot | null = null;

  allDoctors: any[] = [];
  allPatients: any[] = [];
  filteredDoctors: any[] = [];
  specializations: string[] = [];
  selectedSpecialization = '';
  isPatientRole = false;

  bookingForm!: FormGroup;
  allAppointments: any[] = [];
  selectedDateAppointments: any[] = [];

  readonly months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  readonly dayHead = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  constructor(
    private api: ApiService,
    private authService: AuthService,
    private fb: FormBuilder,
    private toastService: ToastService
  ) {
    this.selectedDate.setHours(0, 0, 0, 0);
  }

  ngOnInit() {
    this.initializeForm();
    this.loadData();
    this.initializeCalendar();
  }

  private initializeForm() {
    const currentUser = this.authService.getCurrentUser();
    this.isPatientRole = currentUser?.role === 'Patient';
    this.bookingForm = this.fb.group({
      patient: [this.isPatientRole ? currentUser!.name : '', Validators.required],
      specialization: ['', Validators.required],
      doctor: ['', Validators.required],
      reason: ['', Validators.required]
    });
  }

  private loadData() {
    this.api.getMetadata<any>('appointments').subscribe({
      next: m => this.meta = m,
      error: err => {}
    });

    this.api.getAll<any[]>('doctors').subscribe({
      next: (doctors: any[]) => {
        this.allDoctors = doctors || [];
        this.specializations = [...new Set(this.allDoctors.map((d: any) => d.specialization))];
        this.filteredDoctors = this.allDoctors;
      },
      error: err => {}
    });

    if (!this.isPatientRole) {
      this.api.getAll<any[]>('patients').subscribe({
        next: (patients: any[]) => this.allPatients = patients || [],
        error: err => {}
      });
    }

    const currentUser = this.authService.getCurrentUser();
    const appointmentsRequest = currentUser?.role === 'Doctor' && currentUser.id
      ? this.api.http.get<any[]>(`${this.api.getApiBase()}/doctors/${currentUser.id}/appointments`)
      : this.api.getAll<any[]>('appointments');

    appointmentsRequest.subscribe({
      next: (appointments: any[]) => {
        this.allAppointments = appointments || [];
        this.buildTimeSlotsFromAppointments();
        this.updateDayAppointments();
      },
      error: err => {}
    });
  }

  initializeCalendar() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    this.updateMonthDisplay();

    const firstDay = new Date(this.currentYear, this.currentMonthIndex, 1);
    const lastDay = new Date(this.currentYear, this.currentMonthIndex + 1, 0);
    const prevMonthLastDay = new Date(this.currentYear, this.currentMonthIndex, 0);

    const maxDate = new Date(today);
    maxDate.setDate(maxDate.getDate() + 7);

    this.calendarDays = [];

    const startDayOfWeek = firstDay.getDay();
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(this.currentYear, this.currentMonthIndex - 1, prevMonthLastDay.getDate() - i);
      date.setHours(0, 0, 0, 0);
      this.calendarDays.push({
        date: prevMonthLastDay.getDate() - i,
        fullDate: date,
        isOtherMonth: true,
        isToday: false,
        isSelected: false,
        isDisabled: true
      });
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(this.currentYear, this.currentMonthIndex, i);
      date.setHours(0, 0, 0, 0);
      const isToday = date.getTime() === today.getTime();
      const isDisabled = date < today || date > maxDate;

      this.calendarDays.push({
        date: i,
        fullDate: date,
        isOtherMonth: false,
        isToday,
        isSelected: date.getTime() === this.selectedDate.getTime(),
        isDisabled
      });
    }

    const remainingDays = 42 - this.calendarDays.length;
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(this.currentYear, this.currentMonthIndex + 1, i);
      date.setHours(0, 0, 0, 0);
      this.calendarDays.push({
        date: i,
        fullDate: date,
        isOtherMonth: true,
        isToday: false,
        isSelected: false,
        isDisabled: true
      });
    }
  }

  updateMonthDisplay() {
    this.currentMonth = `${this.months[this.currentMonthIndex]} ${this.currentYear}`;
  }

  private updateTimeSlots() {
    const selectedDoctorName = this.bookingForm.get('doctor')?.value;
    const selectedDoctor = this.allDoctors.find(d => d.name === selectedDoctorName);

    if (selectedDoctor?.id) {
      const dateStr = this.formatDate(this.selectedDate);
      const base = `${this.api.getApiBase()}/doctors/${selectedDoctor.id}`;
      const available$ = this.api.http.get<any[]>(`${base}/available-slots?date=${dateStr}`);
      const booked$ = this.api.http.get<any[]>(`${base}/booked-slots?date=${dateStr}`);

      available$.subscribe({
        next: (availableSlots) => {
          const available = (availableSlots || []).map(s => ({ 
            time: s.timeSlot, 
            isBooked: false, 
            isSelected: false,
            isPastTime: this.isTimeSlotInPast(s.timeSlot)
          }));
          booked$.subscribe({
            next: (bookedSlots) => {
              const booked = (bookedSlots || []).map(s => ({ 
                time: s.timeSlot, 
                isBooked: true, 
                isSelected: false,
                isPastTime: this.isTimeSlotInPast(s.timeSlot)
              }));
              this.timeSlots = [...available, ...booked].sort((a, b) => a.time.localeCompare(b.time));
              if (this.selectedSlot?.isBooked || this.selectedSlot?.isPastTime) this.selectedSlot = null;
            },
            error: () => {
              this.timeSlots = available;
            }
          });
        },
        error: () => this.buildTimeSlotsFromAppointments()
      });
    } else {
      this.buildTimeSlotsFromAppointments();
    }
  }

  private buildTimeSlotsFromAppointments() {
    const startHour = this.meta?.timeSlotConfig?.startHour || 9;
    const endHour = this.meta?.timeSlotConfig?.endHour || 12;
    const intervalMinutes = this.meta?.timeSlotConfig?.intervalMinutes || 30;

    this.timeSlots = [];
    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute = 0; minute < 60; minute += intervalMinutes) {
        const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        this.timeSlots.push({
          time: timeStr,
          isBooked: false,
          isSelected: false,
          isPastTime: this.isTimeSlotInPast(timeStr)
        });
      }
    }

    const selectedDateStr = this.formatDate(this.selectedDate);
    const selectedDoctorName = this.bookingForm.get('doctor')?.value;

    this.allAppointments.forEach(appt => {
      const apptDate = appt.date ? new Date(appt.date).toISOString().split('T')[0] : '';
      const apptDoctorName = appt.doctor?.name || appt.doctorName || '';
      if (apptDate === selectedDateStr && (!selectedDoctorName || apptDoctorName === selectedDoctorName)) {
        const slot = this.timeSlots.find(s => s.time === appt.time);
        if (slot) slot.isBooked = true;
      }
    });

    if (this.selectedSlot?.isBooked || this.selectedSlot?.isPastTime) this.selectedSlot = null;
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  private updateDayAppointments() {
    const selectedDateStr = this.formatDate(this.selectedDate);
    const now = new Date();
    const currentTimeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const isToday = selectedDateStr === this.formatDate(new Date());

    this.selectedDateAppointments = this.allAppointments
      .filter(appt => {
        const apptDate = appt.date ? new Date(appt.date).toISOString().split('T')[0] : '';
        if (apptDate !== selectedDateStr) return false;
        if (isToday && appt.time <= currentTimeStr) return false;
        return true;
      })
      .map(appt => {
        const doctorName = appt.doctor?.name || appt.doctorName || 'Unknown Doctor';
        const patientName = appt.patient?.name || appt.patientName || 'Unknown Patient';
        const time = appt.time || '';
        return {
          time,
          period: parseInt(time.split(':')[0]) < 12 ? 'AM' : 'PM',
          patient: patientName,
          doctor: doctorName,
          dept: this.allDoctors.find(d => d.name === doctorName)?.specialization?.substring(0, 6) || 'General',
          status: appt.status?.toLowerCase() || 'scheduled',
          statusLabel: this.getStatusLabel(appt.status)
        };
      })
      .sort((a, b) => a.time.localeCompare(b.time));
  }

  private getStatusLabel(status: string): string {
    const statusMap: any = {
      'scheduled': 'Sched',
      'completed': 'Done',
      'cancelled': 'Cancel',
      'rescheduled': 'Resched'
    };
    return statusMap[status?.toLowerCase()] || 'Sched';
  }

  selectDay(day: CalendarDay) {
    if (day.isOtherMonth || day.isDisabled) return;

    this.calendarDays.forEach(d => d.isSelected = false);
    day.isSelected = true;
    this.selectedDate = day.fullDate;
    this.selectedSlot = null;
    this.updateTimeSlots();
    this.updateDayAppointments();
  }

  selectTimeSlot(slot: TimeSlot) {
    if (slot.isBooked || slot.isPastTime) return;
    
    this.timeSlots.forEach(s => s.isSelected = false);
    slot.isSelected = true;
    this.selectedSlot = slot;
  }

 
  private isTimeSlotInPast(timeSlot: string): boolean {
    const now = new Date();
    const selectedDateStr = this.formatDate(this.selectedDate);
    const todayStr = this.formatDate(now);
    
   
    if (selectedDateStr !== todayStr) {
      return false;
    }
    
     const [hourStr, minuteStr] = timeSlot.split(':');
    const slotHour = parseInt(hourStr, 10);
    const slotMinute = parseInt(minuteStr, 10);
    
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
   
    if (slotHour < currentHour) return true;
    if (slotHour === currentHour && slotMinute <= currentMinute) return true;
    
    return false;
  }

  onSpecializationChange(event: Event) {
    this.selectedSpecialization = (event.target as HTMLSelectElement).value;
    this.filteredDoctors = this.selectedSpecialization
      ? this.allDoctors.filter(d => d.specialization === this.selectedSpecialization)
      : this.allDoctors;
    this.bookingForm.patchValue({ doctor: '' });
    this.updateTimeSlots();
    console.log("----->", this.bookingForm);
  }

  onDoctorChange(event: Event) {
    this.bookingForm.patchValue({ doctor: (event.target as HTMLSelectElement).value });
    this.updateTimeSlots();
  }

  previousMonth() {
    this.currentMonthIndex = this.currentMonthIndex === 0 ? 11 : this.currentMonthIndex - 1;
    if (this.currentMonthIndex === 11) this.currentYear--;
    this.updateMonthDisplay();
    this.initializeCalendar();
  }

  nextMonth() {
    this.currentMonthIndex = this.currentMonthIndex === 11 ? 0 : this.currentMonthIndex + 1;
    if (this.currentMonthIndex === 0) this.currentYear++;
    this.updateMonthDisplay();
    this.initializeCalendar();
  }

  confirmBooking() {
    if (!this.bookingForm.valid || !this.selectedSlot) return;

    const currentUser = this.authService.getCurrentUser();
    const selectedDoctorName = this.bookingForm.value.doctor;
    const selectedDoctor = this.allDoctors.find(d => d.name === selectedDoctorName);

    if (!selectedDoctor) {
      this.toastService.error('Please select a valid doctor.');
      return;
    }

    const patientName = this.bookingForm.value.patient;
    const patientId = this.isPatientRole
      ? this.authService.getCurrentUser()?.id
      : patientName;

    const booking = {
      patientId,
      doctorId: selectedDoctor.id,
      date: `${this.formatDate(this.selectedDate)}T00:00:00.000Z`,
      time: this.selectedSlot.time,
      duration: 30,
      reason: this.bookingForm.value.reason,
      notes: ''
    };

    this.api.http.post<any>(`${this.api.getApiBase()}/appointments`, booking).subscribe({
      next: (res) => {
        if (res?.success) {
          this.toastService.success('Appointment booked successfully!');
          this.allAppointments.push(res.appointment || res);
          this.updateTimeSlots();
          this.updateDayAppointments();
          this.bookingForm.patchValue({ reason: '' });
          this.selectedSlot = null;
        } else {
          this.toastService.error(res?.message || 'Failed to book appointment.');
        }
      },
      error: (err) => {
        const msg = err?.error?.message || 'Failed to book appointment. Please try again.';
        this.toastService.error(msg);
      }
    });
  }

  getAvailableSlotsCount(): number {
    return this.timeSlots.filter(s => !s.isBooked && !s.isPastTime).length;
  }

  getFormattedDate(): string {
    return `${this.months[this.selectedDate.getMonth()]} ${this.selectedDate.getDate()}`;
  }
}
