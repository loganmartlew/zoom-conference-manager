import { PublishEvent } from '@zoom-conference-manager/api-interfaces';
import { axios } from '../../../config/axios';
import { eventKey } from './getEvent';
import fetchFromApi from '../../../util/fetchFromApi';
import useToastMutation from '../../../util/useToastMutation';

export const publishEvent = async (eventId: string) => {
  return fetchFromApi<PublishEvent>(axios.patch(`/events/${eventId}/publish`));
};

export const usePublishEvent = (
  onSuccess: () => void,
  onError: (error: unknown, variables: string) => void
) => {
  return useToastMutation<string>(publishEvent, {
    queryKey: (vars) => [...eventKey, vars],
    onSuccess,
    onError,
    pendingMessage: 'Publishing event...',
    successMessage: 'Event published!',
    errorMessage: 'Failed to publish event',
  });
};
