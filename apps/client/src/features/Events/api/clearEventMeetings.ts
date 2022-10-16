import { ClearEventMeetings } from '@zoom-conference-manager/api-interfaces';
import { eventKey } from './getEvent';
import { axios } from '../../../config/axios';
import fetchFromApi from '../../../util/fetchFromApi';
import useToastMutation from '../../../util/useToastMutation';

export const clearEventMeetings = async (eventId: string) => {
  return fetchFromApi<ClearEventMeetings>(
    axios.delete(`/events/${eventId}/meetings`)
  );
};

export const useClearEventMeetings = (
  onSuccess: () => void,
  onError: (error: unknown, variables: string) => void
) => {
  return useToastMutation<string>(clearEventMeetings, {
    queryKey: (id) => [...eventKey, id],
    onSuccess,
    onError,
    pendingMessage: 'Clearing meetings...',
    successMessage: 'Meetings cleared!',
    errorMessage: 'Failed to clear meetings',
  });
};
