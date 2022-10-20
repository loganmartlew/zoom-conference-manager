import {
  CreateZoomUser,
  DeleteZoomUser,
  GetAllZoomUsers,
} from '@zoom-conference-manager/api-interfaces';
import { Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Logger } from '../loaders/logger';
import ZoomUserService from '../services/ZoomUserService';

export const createZoomUser: CreateZoomUser = async (req: Request) => {
  const { zoomUserData } = req.body;

  try {
    const newZoomUser = await ZoomUserService.create(zoomUserData);
    return {
      status: StatusCodes.CREATED,
      message: 'Created Zoom User',
      data: newZoomUser,
    };
  } catch (error) {
    Logger.error(error);

    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Failed to create Zoom User',
      error,
    };
  }
};

export const getAllZoomUsers: GetAllZoomUsers = async () => {
  const zoomUsers = await ZoomUserService.getAll();
  return {
    status: StatusCodes.OK,
    message: 'Retrieved all Zoom Users',
    data: zoomUsers,
  };
};

export const deleteZoomUser: DeleteZoomUser = async (req: Request) => {
  const { id } = req.params;

  if (!id) {
    return { status: StatusCodes.BAD_REQUEST, message: 'ID Must be provided' };
  }

  const deleted = await ZoomUserService.delete(id);

  if (!deleted) {
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Failed to delete Zoom User',
    };
  }
  return { status: StatusCodes.OK, message: 'Zoom User deleted' };
};
