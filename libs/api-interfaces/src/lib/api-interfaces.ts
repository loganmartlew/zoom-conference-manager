import { ApiError } from '@zoom-conference-manager/errors';
import { Request } from 'express';
import { IEvent, IEventName, IMeeting, IZoomUser } from './entity-types';

export type ApiResponse<T> =
  | {
      status: number;
      message: string;
      data?: T;
      error?: never;
    }
  | {
      status: number;
      message: string;
      data?: never;
      error: ApiError;
    };

export interface MulterRequest extends Request {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
export type ClearEventMeetings = Controller<void>;

export type CreateMeeting = Controller<IMeeting>;
export type GetMeeting = Controller<IMeeting>;
export type GetAllMeetings = Controller<IMeeting[]>;
export type UpdateMeeting = Controller<IMeeting>;
export type DeleteMeeting = Controller<void>;

export type CreateZoomUser = Controller<IZoomUser>;
export type GetAllZoomUsers = Controller<IZoomUser[]>;
export type DeleteZoomUser = Controller<void>;
