import {
  CreateMeeting,
  MeetingDTO,
} from '@zoom-conference-manager/api-interfaces';
import { axios } from '../../../config/axios';
import { allEventsKey } from '../../Events/api/getEvents';
import fetchFromApi from '../../../util/fetchFromApi';
import useToastMutation from '../../../util/useToastMutation';

export const postMeeting = async (meetingData: MeetingDTO) => {
  return fetchFromApi<CreateMeeting>(axios.post('/meetings', { meetingData }));
};

export const usePostMeeting = (
  onSuccess: () => void,
  onError: (error: unknown, variables: MeetingDTO) => void
) => {
  return useToastMutation<MeetingDTO>(postMeeting, {
    queryKey: () => allEventsKey,
    onSuccess,
    onError,
    pendingMessage: 'Creating meeting...',
    successMessage: 'Meeting created!',
    errorMessage: 'Failed to create meeting',
  });
};
