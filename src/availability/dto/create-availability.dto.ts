export class TimeSlotDto {
  startTime: string;
  endTime: string;
}

export class CreateAvailabilityDto {
  sessionName: string;
  userId: number;
  dates: string[];
  timeSlots: TimeSlotDto[];
}