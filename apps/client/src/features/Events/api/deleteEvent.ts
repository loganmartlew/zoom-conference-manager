import { DeleteEvent } from '@zoom-conference-manager/api-interfaces';
import { allEventsKey } from './getEvents';
import { axios } from '../../../config/axios';
import fetchFromApi from '../../../util/fetchFromApi';
import useToastMutation from '../../../util/useToastMutation';

export const deleteEvent = async (eventId: string) => {
  return fetchFromApi<DeleteEvent>(axios.delete(`/events/${eventId}`));
};

export const useDeleteEvent = (
  onSuccess: () => void,
  onError: (error: unknown, variables: string) => void
) => {
  return useToastMutation<string>(deleteEvent, {
    queryKey: () => allEventsKey,
    onSuccess,
    onError,
    pendingMessage: 'Deleting event...',
    successMessage: 'Event deleted!',
    errorMessage: 'Failed to delete event',
  });
};
