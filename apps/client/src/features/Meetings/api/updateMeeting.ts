import { MeetingDTO } from '@zoom-conference-manager/api-interfaces';
import { axios } from '../../../config/axios';
import { MeetingData } from '../MeetingTypes/UpdateMeetingTypes';

export const updateMeetingData = async (
  id: string,
  meetingData: MeetingData
): Promise<MeetingDTO> => {
  const meeting: MeetingDTO = {
    name: meetingData.name,
    startDateTime: meetingData.startDateTime,
    endDateTime: meetingData.endDateTime,
    eventId: meetingData.id,
  };
  return axios.put(`/meetings/${id}`, meeting);
};
