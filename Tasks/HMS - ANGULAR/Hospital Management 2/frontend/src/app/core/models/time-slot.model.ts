export interface TimeSlot {
  id: number;
  doctorId: number;
  date: Date;
  time: string;
  isAvailable: boolean;
}
