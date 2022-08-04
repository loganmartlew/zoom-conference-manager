export interface EventDTO {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}

export interface MeetingDTO {
  ubid: string;
  name: string;
  startDateTime: string;
  endDateTime: string;
  eventId: string;
}

export interface ZoomUserDTO {
  name: string;
  email: string;
}
