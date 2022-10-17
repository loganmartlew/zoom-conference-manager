import { DeleteZoomUser } from '@zoom-conference-manager/api-interfaces';
import { axios } from '../../../config/axios';
import { allZoomUsersKey } from './getZoomUsers';
import fetchFromApi from '../../../util/fetchFromApi';
import useToastMutation from '../../../util/useToastMutation';

export const deleteZoomUser = async (userId: string) => {
  return fetchFromApi<DeleteZoomUser>(axios.delete(`/zoom-users/${userId}`));
};

export const useDeleteZoomUser = (
  onSuccess: () => void,
  onError: (error: unknown, variables: string) => void
) => {
  return useToastMutation<string>(deleteZoomUser, {
    queryKey: () => allZoomUsersKey,
    onSuccess,
    onError,
    pendingMessage: 'Deleting Zoom user...',
    successMessage: 'Zoom user deleted!',
    errorMessage: 'Failed to delete Zoom user',
  });
};
