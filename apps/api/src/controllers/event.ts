import { Request, Response } from 'express';
import EventService from '../services/EventService';

export const createEvent = async (req: Request, res: Response) => {
  return res.json({ message: 'Create Event' });
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
