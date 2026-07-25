import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as TimeSlotActions from '../../../../store/time-slot/time-slot.actions';
import { selectAllTimeSlots, selectTimeSlotLoading } from '../../../../store/time-slot/time-slot.selectors';
import { CardComponent } from '../../../../shared/components/card/card.component';

@Component({
  selector: 'app-time-slots',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './time-slots.component.html'
})
export class TimeSlotsComponent implements OnInit {
  timeSlots$!: Observable<any[]>;
  loading$!: Observable<boolean>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.timeSlots$ = this.store.select(selectAllTimeSlots);
    this.loading$ = this.store.select(selectTimeSlotLoading);
    const today = new Date().toISOString().split('T')[0];
    this.store.dispatch(TimeSlotActions.loadTimeSlots({ doctorId: 1, date: today }));
  }

  addTimeSlot(): void {
    console.log('Add time slot');
  }

  deleteTimeSlot(id: number): void {
    // Time slot deletion would need to be implemented in actions
    console.log('Delete time slot:', id);
  }
}
