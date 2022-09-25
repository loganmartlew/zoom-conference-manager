import { axios } from '../../../config/axios';
import { MeetingData } from '../MeetingTypes/UpdateMeetingTypes';

export const updateMeetingData = async (
  id: string,
  meetingData: MeetingData
): Promise<MeetingData> => {
  return axios.put(`/meetings/${id}`, meetingData);
};
