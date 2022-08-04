import { Request } from 'express';
import { EventStatus } from '@zoom-conference-manager/types';

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
  endDateTime: string;
  eventId: string;
}

export interface ZoomUserDTO {
  name: string;
  email: string;
}

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
}

export interface IZoomUser {
  id: string;
  name: string;
  email: string;
}

export interface MulterRequest extends Request {
  file: any;
}

export type Controller<T> = (req: Request) => Promise<ApiResponse<T>>;
export type ExtractControllerData<T> = T extends Controller<infer U>
  ? U
  : never;

export type CreateEvent = Controller<IEvent>;
export type GetEvent = Controller<IEvent>;
export type GetAllEvents = Controller<IEvent[]>;
export type GetEventNames = Controller<IEventName[]>;
export type UpdateEvent = Controller<IEvent>;
export type PublishEvent = Controller<IEvent>;
export type UnpublishEvent = Controller<IEvent>;
export type DeleteEvent = Controller<void>;
export type UploadFile = Controller<void>;

export type CreateMeeting = Controller<IMeeting>;
export type GetMeeting = Controller<IMeeting>;
export type GetAllMeetings = Controller<IMeeting[]>;
export type UpdateMeeting = Controller<IMeeting>;
export type DeleteMeeting = Controller<void>;

export type CreateZoomUser = Controller<IZoomUser>;
export type GetAllZoomUsers = Controller<IZoomUser[]>;
export type DeleteZoomUser = Controller<void>;
