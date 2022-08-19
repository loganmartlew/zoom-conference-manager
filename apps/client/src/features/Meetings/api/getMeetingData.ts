import { MeetingDTO } from '@zoom-conference-manager/api-interfaces';
import { axios } from '../../../config/axios';

export const getMeetingData = async (id: string): Promise<MeetingDTO> => {
  const data: MeetingDTO = await axios.get(`/meetings/${id}`);
  return data;
};
