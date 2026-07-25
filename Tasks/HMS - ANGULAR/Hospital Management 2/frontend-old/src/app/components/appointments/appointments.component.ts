import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription, filter, take } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { AppointmentsActions } from '../../store/appointments/appointments.actions';
import { selectAllAppointments, selectAppointmentsLoading, selectAppointmentsSuccessMessage } from '../../store/appointments/appointments.selectors';
import * as DoctorsActions from '../../store/doctors/doctors.actions';
import { selectAllDoctors } from '../../store/doctors/doctors.selectors';

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
}

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit, OnDestroy {
  meta: any = null;
  
  appointments$ = this.store.select(selectAllAppointments);
  doctors$ = this.store.select(selectAllDoctors);
  loading$ = this.store.select(selectAppointmentsLoading);

  currentMonth = '';
  currentYear = new Date().getFullYear();
  currentMonthIndex = new Date().getMonth();
  calendarDays: CalendarDay[] = [];
  selectedDate = new Date();

  timeSlots: TimeSlot[] = [];
  selectedSlot: TimeSlot | null = null;

  allDoctors: any[] = [];
  filteredDoctors: any[] = [];
  specializations: string[] = [];
  selectedSpecialization = '';
  selectedDoctorId: number | null = null;

  bookingForm!: FormGroup;
  allAppointments: any[] = [];
  selectedDateAppointments: any[] = [];

  readonly months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  readonly dayHead = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  private subscriptions = new Subscription();

  constructor(
    private store: Store,
    private api: ApiService,
    private authService: AuthService,
    private fb: FormBuilder,
    private toastService: ToastService
  ) {
    this.selectedDate.setHours(0, 0, 0, 0);
  }

  ngOnInit() {
    this.initializeForm();
    this.initializeCalendar();
    
    this.store.dispatch(DoctorsActions.loadDoctors());
    
    this.store.dispatch(AppointmentsActions.loadAppointments());
    
    this.api.getMetadata<any>('appointments').subscribe({
      next: m => this.meta = m,
      error: err => console.error('Failed to load metadata:', err)
    });

    const doctorsSub = this.doctors$.subscribe(doctors => {
      this.allDoctors = doctors;
      this.specializations = [...new Set(doctors.map((d: any) => d.specialization))];
      this.filteredDoctors = doctors;
    });
    this.subscriptions.add(doctorsSub);

    const appointmentsSub = this.appointments$.subscribe(appointments => {
      this.allAppointments = appointments;
      this.updateTimeSlots();
      this.updateDayAppointments();
    });
    this.subscriptions.add(appointmentsSub);

    const successSub = this.store.select(selectAppointmentsSuccessMessage)
      .pipe(filter(msg => !!msg))
      .subscribe(message => {
        this.toastService.success(message || 'Appointment booked successfully!');
        this.bookingForm.patchValue({ reason: '' });
        this.selectedSlot = null;
        this.store.dispatch(AppointmentsActions.loadAppointments());
      });
    this.subscriptions.add(successSub);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private initializeForm() {
    const currentUser = this.authService.getCurrentUser();
    this.bookingForm = this.fb.group({
      patient: [currentUser?.role === 'Patient' ? currentUser.name : '', Validators.required],
      specialization: ['', Validators.required],
      doctor: ['', Validators.required],
      reason: ['', Validators.required]
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
    maxDate.setDate(maxDate.getDate() + 30); // Allow booking 30 days ahead

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
    const startHour = this.meta?.timeSlotConfig?.startHour || 9;
    const endHour = this.meta?.timeSlotConfig?.endHour || 12;
    const intervalMinutes = this.meta?.timeSlotConfig?.intervalMinutes || 30;

    this.timeSlots = [];
    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute = 0; minute < 60; minute += intervalMinutes) {
        if (hour === endHour && minute > 0) break;
        this.timeSlots.push({
          time: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
          isBooked: false,
          isSelected: false
        });
      }
    }

    const selectedDateStr = this.formatDateForComparison(this.selectedDate);
    const selectedDoctorName = this.bookingForm.get('doctor')?.value;

    this.allAppointments.forEach(appt => {
      const apptDateStr = this.formatDateForComparison(new Date(appt.date));
      const doctorMatch = !selectedDoctorName || appt.doctor?.name === selectedDoctorName;
      
      if (apptDateStr === selectedDateStr && doctorMatch) {
        const apptTime = appt.time;
        const slot = this.timeSlots.find(s => s.time === apptTime);
        if (slot) slot.isBooked = true;
      }
    });

    if (this.selectedSlot?.isBooked) {
      this.selectedSlot = null;
    }
  }

  private formatDate(date: Date): string {
    return date.toISOString();
  }

  private formatDateForComparison(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private updateDayAppointments() {
    const selectedDateStr = this.formatDateForComparison(this.selectedDate);

    this.selectedDateAppointments = this.allAppointments
      .filter(appt => {
        const apptDateStr = this.formatDateForComparison(new Date(appt.date));
        return apptDateStr === selectedDateStr;
      })
      .map(appt => ({
        time: appt.time,
        period: parseInt(appt.time.split(':')[0]) < 12 ? 'AM' : 'PM',
        patient: appt.patient?.name || 'Unknown',
        doctor: appt.doctor?.name?.split(' ').slice(0, 2).join(' ') || 'Unknown',
        dept: appt.doctor?.specialization?.substring(0, 6) || 'General',
        status: appt.status?.toLowerCase() || 'scheduled',
        statusLabel: this.getStatusLabel(appt.status)
      }));
  }

  private getStatusLabel(status: string): string {
    const statusMap: any = {
      'Scheduled': 'Sched',
      'Confirmed': 'Conf',
      'Completed': 'Done',
      'Cancelled': 'Cancel',
      'Rescheduled': 'Resch'
    };
    return statusMap[status] || 'Sched';
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
    if (slot.isBooked) return;
    this.timeSlots.forEach(s => s.isSelected = false);
    slot.isSelected = true;
    this.selectedSlot = slot;
  }

  onSpecializationChange(event: Event) {
    this.selectedSpecialization = (event.target as HTMLSelectElement).value;
    this.filteredDoctors = this.selectedSpecialization
      ? this.allDoctors.filter(d => d.specialization === this.selectedSpecialization)
      : this.allDoctors;
    this.bookingForm.patchValue({ doctor: '' });
    this.selectedDoctorId = null;
    this.updateTimeSlots();
  }

  onDoctorChange(event: Event) {
    const doctorName = (event.target as HTMLSelectElement).value;
    this.bookingForm.patchValue({ doctor: doctorName });
    
    const doctor = this.allDoctors.find(d => d.name === doctorName);
    this.selectedDoctorId = doctor?.id || null;
    
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
    if (!this.bookingForm.valid || !this.selectedSlot || !this.selectedDoctorId) {
      this.toastService.error('Please fill all required fields and select a time slot');
      return;
    }

    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      this.toastService.error('Please login to book an appointment');
      return;
    }

    this.store.dispatch(AppointmentsActions.bookAppointment({
      data: {
        patientId: currentUser.id,
        doctorId: this.selectedDoctorId,
        date: this.formatDate(this.selectedDate),
        time: this.selectedSlot.time,
        duration: 30,
        reason: this.bookingForm.value.reason,
        notes: ''
      }
    }));
  }

  getAvailableSlotsCount(): number {
    return this.timeSlots.filter(s => !s.isBooked).length;
  }

  getFormattedDate(): string {
    return `${this.months[this.selectedDate.getMonth()]} ${this.selectedDate.getDate()}`;
  }
}
