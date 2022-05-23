import { Request, Response } from 'express';
import MeetingService from '../services/MeetingService';

export const createMeeting = async (req: Request, res: Response) => {
  const { meetingData } = req.body;

  try {
    const newMeeting = await MeetingService.create(meetingData);
    return res
      .status(201)
      .json({ message: 'Create Meeting', meeting: newMeeting });
  } catch (error) {
    return res.status(500).json({ message: 'Fail to create Meeting', error });
  }
};

export const getAllMeeting = async (req: Request, res: Response) => {
  const meetings = await MeetingService.getAll();
  return res.status(200).json(meetings);
};

export const getMeeting = async (req: Request, res: Response) => {
  return res.json({ message: 'Get Meeting' });
};

export const updateMeeting = async (req: Request, res: Response) => {
  return res.json({ message: 'Update Meeting' });
};

export const deleteMeeting = async (req: Request, res: Response) => {
  return res.json({ message: 'Delete Meeting' });
};
