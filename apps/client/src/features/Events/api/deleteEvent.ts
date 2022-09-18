import { DeleteEvent } from '@zoom-conference-manager/api-interfaces';
import { useMutation, useQueryClient } from 'react-query';
import { allEventsKey } from './getEvents';
import { axios } from '../../../config/axios';
import fetchFromApi from '../../../util/fetchFromApi';

export const deleteEvent = async (eventId: string) => {
  return fetchFromApi<DeleteEvent>(axios.delete(`/events/${eventId}`));
};

export const useDeleteEvent = (
  onSuccess: () => void,
  onError: (error: unknown, variables: string) => void
) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(deleteEvent, {
    onSuccess,
    onError,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSettled: (_, __, id) => {
      queryClient.invalidateQueries(allEventsKey);
    },
  });

  return { mutate, isLoading };
};
