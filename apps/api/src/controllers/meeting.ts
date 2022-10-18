import {
  CreateMeeting,
  DeleteMeeting,
  GetAllMeetings,
  GetMeeting,
  UpdateMeeting,
} from '@zoom-conference-manager/api-interfaces';
import { ApiError } from '@zoom-conference-manager/errors';
import { Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import MeetingService from '../services/MeetingService';

export const createMeeting: CreateMeeting = async (req: Request) => {
  const { meetingData } = req.body;

  const newMeeting = await MeetingService.create(meetingData);
  return {
    status: StatusCodes.CREATED,
    message: 'Create Meeting',
    data: newMeeting,
  };
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

export const updateMeeting: UpdateMeeting = async (req: Request) => {
  // ZoomID
  const { id } = req.params;
  const meetingData = req.body;
  const updatedMeeting = await MeetingService.update(id, meetingData);
  return {
    status: StatusCodes.OK,
    message: 'Update Meeting',
    data: updatedMeeting,
  };
};

export const deleteMeeting: DeleteMeeting = async (req: Request) => {
  const { id } = req.params;

  const deleted = await MeetingService.delete(id);

  if (!deleted) {
    throw new ApiError(null, 3005, 'Unable to delete meeting');
  }

  return { status: StatusCodes.OK, message: 'Meeting deleted' };
};
