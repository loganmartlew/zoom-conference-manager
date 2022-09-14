import { ClearEventMeetings } from '@zoom-conference-manager/api-interfaces';
import { useMutation, useQueryClient } from 'react-query';
import { eventKey } from './getEvent';
import { axios } from '../../../config/axios';
import fetchFromApi from '../../../util/fetchFromApi';

export const clearEventMeetings = async (eventId: string) => {
  return fetchFromApi<ClearEventMeetings>(
    axios.delete(`/events/${eventId}/meetings`)
  );
};

export const useClearEventMeetings = (
  onSuccess: () => void,
  onError: (error: unknown, variables: string) => void
) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(clearEventMeetings, {
    onSuccess,
    onError,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSettled: (_, __, id) => {
      queryClient.invalidateQueries([...eventKey, id]);
    },
  });

  return { mutate, isLoading };
};
