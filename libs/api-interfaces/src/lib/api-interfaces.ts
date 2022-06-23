import { Request } from 'express';

export interface ApiResponse<T> {
  status: number;
  message: string;
  data?: T;
  error?: unknown;
}

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
  duration: number;
  eventId: string;
}

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
}

export type CreateEvent = (req: Request) => Promise<ApiResponse<IEvent>>;
export type GetEvent = (req: Request) => Promise<ApiResponse<IEvent>>;
export type GetAllEvents = (req: Request) => Promise<ApiResponse<IEvent[]>>;
export type GetEventNames = (
  req: Request
) => Promise<ApiResponse<IEventName[]>>;
export type UpdateEvent = (req: Request) => Promise<ApiResponse<IEvent>>;
export type DeleteEvent = (req: Request) => Promise<ApiResponse<void>>;

export type CreateMeeting = (req: Request) => Promise<ApiResponse<IMeeting>>;
export type GetMeeting = (req: Request) => Promise<ApiResponse<IMeeting>>;
export type GetAllMeetings = (req: Request) => Promise<ApiResponse<IMeeting[]>>;
