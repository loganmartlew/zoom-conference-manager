import { UnpublishEvent } from '@zoom-conference-manager/api-interfaces';
import { axios } from '../../../config/axios';
import { eventKey } from './getEvent';
import fetchFromApi from '../../../util/fetchFromApi';
import useToastMutation from '../../../util/useToastMutation';

export const unpublishEvent = async (eventId: string) => {
  return fetchFromApi<UnpublishEvent>(
    axios.patch(`/events/${eventId}/unpublish`)
  );
};

export const useUnpublishEvent = (
  onSuccess: () => void,
  onError: (error: unknown, variables: string) => void
) => {
  return useToastMutation<string>(unpublishEvent, {
    queryKey: (vars) => [...eventKey, vars],
    onSuccess,
    onError,
    pendingMessage: 'Unpublishing event...',
    successMessage: 'Event unpublished!',
    errorMessage: 'Failed to unpublish event',
  });
};
