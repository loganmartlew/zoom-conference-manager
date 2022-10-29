import {
  CreateZoomUser,
  ZoomUserDTO,
} from '@zoom-conference-manager/api-interfaces';
import { axios } from '../../../config/axios';
import { allZoomUsersKey } from './getZoomUsers';
import fetchFromApi from '../../../util/fetchFromApi';
import useToastMutation from '../../../util/useToastMutation';

export const postZoomUser = async (zoomUserData: ZoomUserDTO) => {
  return fetchFromApi<CreateZoomUser>(
    axios.post(`/zoom-users/`, { zoomUserData })
  );
};

export const usePostZoomUser = (
  onSuccess: () => void,
  onError: (error: unknown, variables: ZoomUserDTO) => void
) => {
  return useToastMutation<ZoomUserDTO>(postZoomUser, {
    queryKey: () => allZoomUsersKey,
    onSuccess,
    onError,
    pendingMessage: 'Adding Zoom user...',
    successMessage: 'Zoom user added!',
    errorMessage: 'Failed to add Zoom user',
  });
};
