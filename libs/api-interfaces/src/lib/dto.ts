export interface EventDTO {
  ubid: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}

export interface MeetingDTO {
  name: string;
  startDateTime: string;
  endDateTime: string;
  eventId: string;
}

export interface ZoomUserDTO {
  name: string;
  email: string;
}
