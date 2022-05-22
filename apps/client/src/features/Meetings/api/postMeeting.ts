import { MeetingDTO } from '@zoom-conference-manager/api-interfaces';
import { useMutation, useQueryClient } from 'react-query';
import { axios } from '../../../config/axios';
import { allEventsKey } from '../../Events/api/getEvents';

export const postEvent = async (eventData: MeetingDTO) => {
  return axios.post('/meeting', { eventData });
};

export const usePostEvent = (
  onSuccess: () => void,
  onError: (error: unknown, variables: MeetingDTO) => void
) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(postEvent, {
    onSuccess,
    onError,
    onSettled: () => {
      queryClient.invalidateQueries(allEventsKey);
    },
  });

  return { mutate, isLoading };
};
