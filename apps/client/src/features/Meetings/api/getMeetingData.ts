import { MeetingDTO } from '@zoom-conference-manager/api-interfaces';
import { axios } from '../../../config/axios';

export const getMeetingData = async (ubid: string): Promise<MeetingDTO> => {
  const data: MeetingDTO = await axios.get(`/meeting/${ubid}`);
  return data;
};
