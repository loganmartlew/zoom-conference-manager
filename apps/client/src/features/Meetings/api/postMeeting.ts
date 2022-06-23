import {
  CreateMeeting,
  MeetingDTO,
} from '@zoom-conference-manager/api-interfaces';
import { useMutation, useQueryClient } from 'react-query';
import { axios } from '../../../config/axios';
import { allEventsKey } from '../../Events/api/getEvents';
import fetchFromApi from '../../../util/fetchFromApi';

export const postMeeting = async (meetingData: MeetingDTO) => {
  return fetchFromApi<CreateMeeting>(axios.post('/meetings', { meetingData }));
};

export const usePostMeeting = (
  onSuccess: () => void,
  onError: (error: unknown, variables: MeetingDTO) => void
) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(postMeeting, {
    onSuccess,
    onError,
    onSettled: () => {
      queryClient.invalidateQueries(allEventsKey);
    },
  });

  return { mutate, isLoading };
};
