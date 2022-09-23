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

export interface ZoomMeetingResponseDTO {
  uuid: string;
  id: number;
  host_id: string;
  topic: string;
  type: number;
  start_time: string;
  duration: number;
  timezone: string;
  created_at: string;
  join_url: string;
}
