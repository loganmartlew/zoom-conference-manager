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
import { Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import EventService from '../services/EventService';
import { Logger } from '../loaders/logger';

export const createEvent: CreateEvent = async (req: Request) => {
  const { eventData } = req.body;

  try {
    const newEvent = await EventService.create(eventData);
    return {
      status: StatusCodes.CREATED,
      message: 'Created Event',
      data: newEvent,
    };
  } catch (error) {
    Logger.error(error);

    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Failed to create Event',
      error,
    };
  }
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
  try {
    const updatedEvent = await EventService.update(id, eventData);
    return {
      status: StatusCodes.OK,
      message: 'Updated Event',
      data: updatedEvent,
    };
  } catch (error) {
    Logger.error(error);

    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Failed to update Event ',
      error,
    };
  }
};

export const publishEvent: PublishEvent = async (req: Request) => {
  const { id } = req.params;

  try {
    const publishedEvent = await EventService.publish(id);
    return {
      status: StatusCodes.OK,
      message: 'Published Event',
      data: publishedEvent,
    };
  } catch (error) {
    Logger.error(error);

    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Failed to publish Event ',
      error,
    };
  }
};

export const unpublishEvent: UnpublishEvent = async (req: Request) => {
  const { id } = req.params;

  try {
    const unpublishedEvent = await EventService.unpublish(id);
    return {
      status: StatusCodes.OK,
      message: 'Unpublished Event',
      data: unpublishedEvent,
    };
  } catch (error) {
    Logger.error(error);

    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Failed to unpublish Event ',
      error,
    };
  }
};

export const deleteEvent: DeleteEvent = async (req: Request) => {
  const { id } = req.params;

  if (!id) {
    return { status: StatusCodes.BAD_REQUEST, message: 'ID Must be provided' };
  }

  const deleted = await EventService.delete(id);

  if (!deleted) {
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Failed to delete Event',
    };
  }
  return { status: StatusCodes.OK, message: 'Event deleted' };
};

export const clearEventMeetings: ClearEventMeetings = async (req: Request) => {
  const { id } = req.params;

  if (!id) {
    return { status: StatusCodes.BAD_REQUEST, message: 'ID Must be provided' };
  }

  const cleared = await EventService.clearMeetings(id);

  if (!cleared) {
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Failed to clear Event meetings',
    };
  }
  return { status: StatusCodes.OK, message: 'Event meetings cleared' };
};

export const uploadFile: UploadFile = async (req: Request) => {
  /// Add [file] into [req], happens in Runtime
  // eslint-disable-next-line prefer-destructuring
  const file = (req as MulterRequest).file;
  const { id } = req.params;

  try {
    await EventService.uploadFile(id, file);
    return { status: StatusCodes.OK, message: 'File uploaded' };
  } catch (error) {
    Logger.error(error);

    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: `Fail to extract datas from excel; ${error}`,
    };
  }
};
