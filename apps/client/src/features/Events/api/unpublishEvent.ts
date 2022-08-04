import { UnpublishEvent } from '@zoom-conference-manager/api-interfaces';
import { useMutation, useQueryClient } from 'react-query';
import { axios } from '../../../config/axios';
import { eventKey } from './getEvent';
import fetchFromApi from '../../../util/fetchFromApi';

export const publishEvent = async (eventId: string) => {
  return fetchFromApi<UnpublishEvent>(
    axios.patch(`/events/${eventId}/unpublish`)
  );
};

export const useUnpublishEvent = (
  onSuccess: () => void,
  onError: (error: unknown, variables: string) => void
) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(publishEvent, {
    onSuccess,
    onError,
    onSettled: (_, __, id) => {
      queryClient.invalidateQueries([...eventKey, id]);
    },
  });

  return { mutate, isLoading };
};