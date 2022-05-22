export interface EventDTO {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}

export interface MeetingDTO {
  event: string;
  name: string;
  description: string;
  meetingDate: string;
  meetingDuration: number;
}
