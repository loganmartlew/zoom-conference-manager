import { MeetingData } from '../MeetingTypes/UpdateMeetingTypes';
import { axios } from '../../../config/axios';

export const updateMeetingData = (
  id: string,
  meetingData: MeetingData
): Promise<MeetingData> => {
  return axios.put(`meetings/${id}`, { meetingData });
};
