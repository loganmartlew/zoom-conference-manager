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
  return res.json({ message: 'Delete Event' });
};
