import { DeleteZoomUser } from '@zoom-conference-manager/api-interfaces';
import { useMutation, useQueryClient } from 'react-query';
import { axios } from '../../../config/axios';
import { allZoomUsersKey } from './getZoomUsers';
import fetchFromApi from '../../../util/fetchFromApi';

export const deleteZoomUser = async (userId: string) => {
  return fetchFromApi<DeleteZoomUser>(axios.delete(`/zoom-users/${userId}`));
};

export const useDeleteZoomUser = (
  onSuccess: () => void,
  onError: (error: unknown, variables: string) => void
) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(deleteZoomUser, {
    onSuccess,
    onError,
    onSettled: () => {
      queryClient.invalidateQueries(allZoomUsersKey);
    },
  });

  return { mutate, isLoading };
};
