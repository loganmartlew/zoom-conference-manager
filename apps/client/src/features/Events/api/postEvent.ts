import { CreateEvent, EventDTO } from '@zoom-conference-manager/api-interfaces';
import { axios } from '../../../config/axios';
import { allEventsKey } from './getEvents';
import fetchFromApi from '../../../util/fetchFromApi';
import useToastMutation from '../../../util/useToastMutation';

export const postEvent = async (eventData: EventDTO) => {
  return fetchFromApi<CreateEvent>(axios.post('/events', { eventData }));
};

export const usePostEvent = (
  onSuccess: () => void,
  onError: (error: unknown, variables: EventDTO) => void
) => {
  return useToastMutation<EventDTO>(postEvent, {
    queryKey: () => allEventsKey,
    onSuccess,
    onError,
    pendingMessage: 'Creating event...',
    successMessage: 'Event created!',
    errorMessage: 'Failed to create event',
  });
};
