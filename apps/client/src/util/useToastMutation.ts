/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiError } from '@zoom-conference-manager/errors';
import { useCallback, useRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Id, toast } from 'react-toastify';
import notificationSettings from '../App/notificationSettings';

function useToastMutation<Vars>(
  mutationFn: (variables: Vars) => Promise<unknown>,
  options: {
    queryKey: (variables: Vars) => string | string[];
    onSuccess: () => void;
    onError: (error: unknown, variables: Vars) => void;
    pendingMessage: string;
    successMessage: string;
    errorMessage: string;
  }
) {
  const {
    queryKey,
    onSuccess,
    onError,
    pendingMessage,
    successMessage,
    errorMessage,
  } = options;

  const queryClient = useQueryClient();
  const toastRef = useRef<Id | null>(null);

  const { mutate, isLoading } = useMutation(mutationFn, {
    onSuccess: () => {
      if (toastRef.current) {
        toast.update(toastRef.current, {
          render: successMessage,
          type: toast.TYPE.SUCCESS,
          isLoading: false,
          ...notificationSettings,
        });
      }
      onSuccess();
    },
    onError: (error: unknown, variables: Vars) => {
      let message = errorMessage;

      if (error instanceof ApiError) {
        message = `Error ${error.statusCode}: ${error.message}`;
      }

      if (toastRef.current) {
        toast.update(toastRef.current, {
          render: message,
          type: toast.TYPE.ERROR,
          isLoading: false,
          ...notificationSettings,
        });
      }
      onError(error, variables);
    },
    onSettled: (_, __, variables) => {
      queryClient.invalidateQueries(queryKey(variables));
    },
  });

  const publish = useCallback(
    (variables: Vars) => {
      toastRef.current = toast.loading(pendingMessage, notificationSettings);
      mutate(variables);
    },
    [mutate, pendingMessage]
  );

  return { mutate: publish, isLoading };
}

export default useToastMutation;
