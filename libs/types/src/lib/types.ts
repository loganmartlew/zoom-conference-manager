export interface IEvent {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  meetings: IMeeting[];
}

export interface IEventName {
  id: string;
  name: string;
}

export interface IMeeting {
  ubid: string;
  name: string;
  startDateTime: Date;
  duration: number;
  event: IEvent;
}
