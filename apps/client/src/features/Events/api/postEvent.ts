import { CreateEvent, EventDTO } from '@zoom-conference-manager/api-interfaces';
import { useMutation, useQueryClient } from 'react-query';
import { axios } from '../../../config/axios';
import { allEventsKey } from './getEvents';
import fetchFromApi from '../../../util/fetchFromApi';

export const postEvent = async (eventData: EventDTO) => {
  return fetchFromApi<CreateEvent>(axios.post('/events', { eventData }));
};

export const usePostEvent = (
  onSuccess: () => void,
  onError: (error: unknown, variables: EventDTO) => void
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
