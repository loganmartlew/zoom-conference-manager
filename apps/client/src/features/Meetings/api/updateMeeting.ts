import { MeetingDTO } from '@zoom-conference-manager/api-interfaces';
import { axios } from '../../../config/axios';

export const testUpdateMeeting = (
  ubid: string,
  meetingData: MeetingDTO
): Promise<MeetingDTO> => {
  return axios.patch(`/meeting/${ubid}`, { meetingData });
};
