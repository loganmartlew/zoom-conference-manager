import { GetMeetingRecording } from '@zoom-conference-manager/api-interfaces';
import { axios } from '../../../config/axios';
import fetchFromApi from '../../../util/fetchFromApi';

export const getMeetingRecording = (id: string) => {
  return fetchFromApi<GetMeetingRecording>(
    axios.get(`/meetings/${id}/recording`)
  );
};
