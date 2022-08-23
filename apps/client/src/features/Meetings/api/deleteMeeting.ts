import { DeleteMeeting } from '@zoom-conference-manager/api-interfaces';
import { useMutation, useQueryClient } from 'react-query';
import { eventKey } from '../../Events/api/getEvent';
import { axios } from '../../../config/axios';
import fetchFromApi from '../../../util/fetchFromApi';

export const deleteMeeting = async (meetingId: string) => {
  return fetchFromApi<DeleteMeeting>(axios.delete(`/meetings/${meetingId}`));
};

export const useDeleteMeeting = (
  onSuccess: () => void,
  onError: (error: unknown, variables: string) => void
) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(deleteMeeting, {
    onSuccess,
    onError,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSettled: (_, __, id) => {
      queryClient.invalidateQueries([...eventKey, id]);
    },
  });

  return { mutate, isLoading };
};
