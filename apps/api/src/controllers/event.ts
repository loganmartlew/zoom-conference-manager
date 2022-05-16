import { Request, Response } from 'express';
import EventService from '../services/EventService';

export const createEvent = async (req: Request, res: Response) => {
  const { eventData } = req.body;

  try {
    const newEvent = await EventService.create(eventData);
    return res.status(201).json({ message: 'Created Event', event: newEvent });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create Event', error });
  }
};

export const getEvent = async (req: Request, res: Response) => {
  return res.json({ message: 'Get Event' });
};

export const getAllEvents = async (req: Request, res: Response) => {
  const events = await EventService.getAll();
  return res.status(200).json(events);
};

export const updateEvent = async (req: Request, res: Response) => {
  return res.json({ message: 'Update Event' });
};

export const deleteEvent = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.json({ message: 'ID Must be provided' });
  }

  const deleted = await EventService.delete(id);

  if (!deleted) {
    return res.json({ message: 'Failed to delete Event' });
  }
  return res.json({ message: 'Event deleted' });
};

export const addMeetingToEvent = async (req: Request, res: Response) => {
  const { id: eventID } = req.params;
  const { ubid: meetingID } = req.body;

  if (!eventID || !meetingID) {
    return res.status(400).json({ message: 'EventID and MeetingID Must be provided' });
  }

  try {
    const updatedEvent = EventService.addMeeting(eventID, meetingID);
    return res.status(200).json({ message: 'Added Meeting to Event completed', event: updatedEvent })
  } catch (error) {
    return res.status(500).json({ message: `Fail to add Meeting ID: ${meetingID} to Event ID: ${eventID}` });
  }
}