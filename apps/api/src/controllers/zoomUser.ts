import {
  CreateZoomUser,
  DeleteZoomUser,
  GetAllZoomUsers,
} from '@zoom-conference-manager/api-interfaces';
import { ApiError } from '@zoom-conference-manager/errors';
import { Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import ZoomUserService from '../services/ZoomUserService';

export const createZoomUser: CreateZoomUser = async (req: Request) => {
  const { zoomUserData } = req.body;

  const newZoomUser = await ZoomUserService.create(zoomUserData);
  return {
    status: StatusCodes.CREATED,
    message: 'Created Zoom User',
    data: newZoomUser,
  };
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

  const deleted = await ZoomUserService.delete(id);

  if (!deleted) {
    throw new ApiError(null, 3005, 'Unable to delete zoom user');
  }
  return { status: StatusCodes.OK, message: 'Zoom User deleted' };
};
