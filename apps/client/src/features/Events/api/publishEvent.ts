import { PublishEvent } from '@zoom-conference-manager/api-interfaces';
import { useCallback, useRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Id, toast } from 'react-toastify';
import { axios } from '../../../config/axios';
import { eventKey } from './getEvent';
import fetchFromApi from '../../../util/fetchFromApi';

export const publishEvent = async (eventId: string) => {
  return fetchFromApi<PublishEvent>(axios.patch(`/events/${eventId}/publish`));
};

export const usePublishEvent = (
  onSuccess: () => void,
  onError: (error: unknown, variables: string) => void
) => {
  const queryClient = useQueryClient();
  const toastRef = useRef<Id | null>(null);

  const { mutate, isLoading } = useMutation(publishEvent, {
    onSuccess: () => {
      if (toastRef.current) {
        toast.update(toastRef.current, {
          render: 'Event published',
          type: toast.TYPE.SUCCESS,
          isLoading: false,
          autoClose: 5000,
        });
      }
      onSuccess();
    },
    onError: (error: unknown, variables: string) => {
      if (toastRef.current) {
        toast.update(toastRef.current, {
          render: 'Failed to publish event',
          type: toast.TYPE.ERROR,
          isLoading: false,
          autoClose: 5000,
        });
      }
      onError(error, variables);
    },
    onSettled: (_, __, id) => {
      queryClient.invalidateQueries([...eventKey, id]);
    },
  });

  const publish = useCallback(
    (eventId: string) => {
      toastRef.current = toast.loading('Publishing event...');
      mutate(eventId);
    },
    [mutate]
  );

  return { mutate: publish, isLoading };
};
