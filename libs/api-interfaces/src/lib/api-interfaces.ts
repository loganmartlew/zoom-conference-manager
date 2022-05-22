export interface EventDTO {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}

export interface MeetingDTO {
  ubid: string;
  name: string;
  startDateTime: Date;
  duration: number;
  eventId: string;
}
