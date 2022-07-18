import {
  CreateEvent,
  GetAllEvents,
  GetEvent,
  GetEventNames,
  UpdateEvent,
  DeleteEvent,
  UploadFile,
  MulterRequest,
} from '@zoom-conference-manager/api-interfaces';
import { Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import EventService from '../services/EventService';

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
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Failed to update Event ',
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

export const uploadFile: UploadFile = async (req: Request) => {
  /// Adjust the [req] Request obj in Runtime
  // eslint-disable-next-line prefer-destructuring
  const file = (req as MulterRequest).file;

  EventService.uploadFile(file);

  return { status: StatusCodes.OK, message: 'File uploaded' };
};
