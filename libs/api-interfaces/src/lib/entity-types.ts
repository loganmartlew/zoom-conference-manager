import { EventStatus } from '@zoom-conference-manager/types';

export interface IEvent {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: EventStatus;
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
  endDateTime: Date;
  zoomId: string;
}

export interface IZoomUser {
  id: string;
  name: string;
  email: string;
}
