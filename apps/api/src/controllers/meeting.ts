import {
  CreateMeeting,
  GetAllMeetings,
  GetMeeting,
} from '@zoom-conference-manager/api-interfaces';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import MeetingService from '../services/MeetingService';

export const createMeeting: CreateMeeting = async (req: Request) => {
  const { meetingData } = req.body;

  try {
    const newMeeting = await MeetingService.create(meetingData);
    return {
      status: StatusCodes.CREATED,
      message: 'Create Meeting',
      data: newMeeting,
    };
  } catch (error) {
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Fail to create Meeting',
      error,
    };
  }
};

export const getAllMeeting: GetAllMeetings = async () => {
  const meetings = await MeetingService.getAll();
  return {
    status: StatusCodes.OK,
    message: 'Retrieved all meetings',
    data: meetings,
  };
};

export const getMeeting: GetMeeting = async (req: Request) => {
  const { id } = req.params;
  const meeting = await MeetingService.getOne(id);
  return { status: StatusCodes.OK, message: 'Get Meeting', data: meeting };
};

export const updateMeeting = async (req: Request, res: Response) => {
  return res.json({ message: 'Update Meeting' });
};

export const deleteMeeting = async (req: Request, res: Response) => {
  return res.json({ message: 'Delete Meeting' });
};
