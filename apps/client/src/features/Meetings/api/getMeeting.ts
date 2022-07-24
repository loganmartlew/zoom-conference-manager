import { MeetingDTO } from '@zoom-conference-manager/api-interfaces';
import { axios } from '../../../config/axios';

export const testMeeting = (ubid: string): Promise<MeetingDTO> => {
  return axios.get(`/meeting/${ubid}`);
};
