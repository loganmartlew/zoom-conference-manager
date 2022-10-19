import { ZoomUserDTO } from '@zoom-conference-manager/api-interfaces';
import { ApiError } from '@zoom-conference-manager/errors';
import ZoomUser from '../entities/ZoomUser';

export default class ZoomUserService {
  static async getAll(): Promise<ZoomUser[]> {
    const zoomUsers = await ZoomUser.find();
    return zoomUsers;
  }

  static async create(zoomUserData: ZoomUserDTO): Promise<ZoomUser> {
    const zoomUserStub = await ZoomUser.create();

    if (!zoomUserStub)
      throw new ApiError(null, 3004, 'Unable to create zoom user');

    zoomUserStub.name = zoomUserData.name;
    zoomUserStub.email = zoomUserData.email;

    try {
      const zoomUser = await zoomUserStub.save();
      return zoomUser;
    } catch (error) {
      throw new ApiError(error, 3003, 'Unable to save zoom user');
    }
  }

  static async delete(id: string): Promise<boolean> {
    const result = await ZoomUser.delete(id);
    if (!result.affected) return false;
    return result.affected > 0;
  }
}
