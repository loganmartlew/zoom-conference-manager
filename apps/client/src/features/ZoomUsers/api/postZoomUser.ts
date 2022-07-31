import {
  CreateZoomUser,
  ZoomUserDTO,
} from '@zoom-conference-manager/api-interfaces';
import { useMutation, useQueryClient } from 'react-query';
import { axios } from '../../../config/axios';
import { allZoomUsersKey } from './getZoomUsers';
import fetchFromApi from '../../../util/fetchFromApi';

export const postZoomUser = async (zoomUserData: ZoomUserDTO) => {
  return fetchFromApi<CreateZoomUser>(
    axios.post(`/zoom-users/`, { zoomUserData })
  );
};

export const usePostZoomUser = (
  onSuccess: () => void,
  onError: (error: unknown, variables: ZoomUserDTO) => void
) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(postZoomUser, {
    onSuccess,
    onError,
    onSettled: () => {
      queryClient.invalidateQueries(allZoomUsersKey);
    },
  });

  return { mutate, isLoading };
};
