import {
  ApiResponse,
  IEvent,
  IEventName,
} from '@zoom-conference-manager/api-interfaces';
import { Request } from 'express';
import EventService from '../services/EventService';

export const createEvent = async (
  req: Request
): Promise<ApiResponse<IEvent>> => {
  const { eventData } = req.body;

  try {
    const newEvent = await EventService.create(eventData);
    return { status: 201, message: 'Created Event', data: newEvent };
  } catch (error) {
    return { status: 500, message: 'Failed to create Event', error };
  }
};

export const getEvent = async (req: Request): Promise<ApiResponse<IEvent>> => {
  const { id } = req.params;
  const event = await EventService.getOne(id);

  return { status: 200, message: 'Found Event', data: event };
};

export const getAllEvents = async (): Promise<ApiResponse<IEvent[]>> => {
  const events = await EventService.getAll();
  return { status: 200, message: 'Retrieved all events', data: events };
};

export const getEventNames = async (): Promise<ApiResponse<IEventName[]>> => {
  const eventNames = await EventService.getNames();
  return { status: 200, message: 'Retrieved event names', data: eventNames };
};

export const updateEvent = async (
  req: Request
): Promise<ApiResponse<IEvent>> => {
  const { eventData } = req.body;
  const { id } = req.params;
  try {
    const updatedEvent = await EventService.update(id, eventData);
    return { status: 200, message: 'Updated Event', data: updatedEvent };
  } catch (error) {
    return { status: 500, message: 'Failed to update Event ', error };
  }
};

export const deleteEvent = async (req: Request): Promise<ApiResponse<void>> => {
  const { id } = req.params;

  if (!id) {
    return { status: 400, message: 'ID Must be provided' };
  }

  const deleted = await EventService.delete(id);

  if (!deleted) {
    return { status: 500, message: 'Failed to delete Event' };
  }
  return { status: 200, message: 'Event deleted' };
};
