import { useCallback, useRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Id, toast } from 'react-toastify';

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
          autoClose: 5000,
        });
      }
      onSuccess();
    },
    onError: (error: unknown, variables: Vars) => {
      if (toastRef.current) {
        toast.update(toastRef.current, {
          render: errorMessage,
          type: toast.TYPE.ERROR,
          isLoading: false,
          autoClose: 5000,
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
      toastRef.current = toast.loading(pendingMessage);
      mutate(variables);
    },
    [mutate, pendingMessage]
  );

  return { mutate: publish, isLoading };
}

export default useToastMutation;
