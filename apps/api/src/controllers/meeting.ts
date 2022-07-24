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
  const { id } = req.params;
  const meeting = await MeetingService.getOne(id);
  return res.status(200).json(meeting);
};

export const updateMeeting = async (req: Request, res: Response) => {
  const { meetingData } = req.body;
  const { id } = req.params;
  try {
    const updatedMeeting = await MeetingService.update(id, meetingData);
    return res
      .status(200)
      .json({ message: 'Updated Meeting', meeting: updatedMeeting });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Failed to update Meeting ', error });
  }
};

export const deleteMeeting = async (req: Request, res: Response) => {
  return res.json({ message: 'Delete Meeting' });
};
