import { Request, Response } from 'express';

export const createMeeting = async (req: Request, res: Response) => {
  return res.json({ message: 'Create Meeting' });
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
