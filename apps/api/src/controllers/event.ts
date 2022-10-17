import {
  CreateEvent,
  GetAllEvents,
  GetEvent,
  GetEventNames,
  UpdateEvent,
  DeleteEvent,
  PublishEvent,
  UnpublishEvent,
  UploadFile,
  MulterRequest,
  ClearEventMeetings,
} from '@zoom-conference-manager/api-interfaces';
import { ApiError } from '@zoom-conference-manager/errors';
import { Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import EventService from '../services/EventService';

export const createEvent: CreateEvent = async (req: Request) => {
  const { eventData } = req.body;

  const newEvent = await EventService.create(eventData);
  return {
    status: StatusCodes.CREATED,
    message: 'Created Event',
    data: newEvent,
  };
};

export const getEvent: GetEvent = async (req: Request) => {
  const { id } = req.params;
  const event = await EventService.getOne(id);

  return { status: StatusCodes.OK, message: 'Found Event', data: event };
};

export const getAllEvents: GetAllEvents = async () => {
  const events = await EventService.getAll();
  return {
    status: StatusCodes.OK,
    message: 'Retrieved all events',
    data: events,
  };
};

export const getEventNames: GetEventNames = async () => {
  const eventNames = await EventService.getNames();
  return {
    status: StatusCodes.OK,
    message: 'Retrieved event names',
    data: eventNames,
  };
};

export const updateEvent: UpdateEvent = async (req: Request) => {
  const { eventData } = req.body;
  const { id } = req.params;

  const updatedEvent = await EventService.update(id, eventData);
  return {
    status: StatusCodes.OK,
    message: 'Updated Event',
    data: updatedEvent,
  };
};

export const publishEvent: PublishEvent = async (req: Request) => {
  const { id } = req.params;

  const publishedEvent = await EventService.publish(id);
  return {
    status: StatusCodes.OK,
    message: 'Published Event',
    data: publishedEvent,
  };
};

export const unpublishEvent: UnpublishEvent = async (req: Request) => {
  const { id } = req.params;

  const unpublishedEvent = await EventService.unpublish(id);
  return {
    status: StatusCodes.OK,
    message: 'Unpublished Event',
    data: unpublishedEvent,
  };
};

export const deleteEvent: DeleteEvent = async (req: Request) => {
  const { id } = req.params;

  const deleted = await EventService.delete(id);

  if (!deleted) {
    throw new ApiError(null, 3005, 'Unable to delete event');
  }
  return { status: StatusCodes.OK, message: 'Event deleted' };
};

export const clearEventMeetings: ClearEventMeetings = async (req: Request) => {
  const { id } = req.params;

  const cleared = await EventService.clearMeetings(id);

  if (!cleared) {
    throw new ApiError(null, 3005, 'Unable to clear event meetings');
  }
  return { status: StatusCodes.OK, message: 'Event meetings cleared' };
};

export const uploadFile: UploadFile = async (req: Request) => {
  /// Add [file] into [req], happens in Runtime
  // eslint-disable-next-line prefer-destructuring
  const file = (req as MulterRequest).file;
  const { id } = req.params;

  await EventService.uploadFile(id, file);
  return { status: StatusCodes.OK, message: 'File uploaded' };
};
