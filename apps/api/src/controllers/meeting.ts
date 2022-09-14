import {
  CreateMeeting,
  DeleteMeeting,
  GetAllMeetings,
  GetMeeting,
  UpdateMeeting,
} from '@zoom-conference-manager/api-interfaces';
import { Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Logger } from '../loaders/logger';
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
    Logger.error(error);

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

export const updateMeeting: UpdateMeeting = async (req: Request) => {
  const { id } = req.params;
  const { meetingData } = req.body;
  try {
    const updatedMeeting = await MeetingService.update(id, meetingData);
    return {
      status: StatusCodes.CREATED,
      message: 'Update Meeting',
      data: updatedMeeting,
    };
  } catch (error) {
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Fail to update Meeting',
      error,
    };
  }
};

export const deleteMeeting: DeleteMeeting = async (req: Request) => {
  const { id } = req.params;

  if (!id) {
    return { status: StatusCodes.BAD_REQUEST, message: 'ID Must be provided' };
  }

  const deleted = await MeetingService.delete(id);

  if (!deleted) {
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Failed to delete Event',
    };
  }
  return { status: StatusCodes.OK, message: 'Meeting deleted' };
};
