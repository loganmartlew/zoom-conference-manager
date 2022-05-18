export interface IEvent {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  meetings: IMeeting[];
}

export interface IMeeting {
  ubid: string;
  name: string;
  description: string;
  meetingDate: Date;
  meetingDuration: number;
  event: IEvent;
}
