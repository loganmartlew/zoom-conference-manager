import { DeleteMeeting } from '@zoom-conference-manager/api-interfaces';
import { eventKey } from '../../Events/api/getEvent';
import { axios } from '../../../config/axios';
import fetchFromApi from '../../../util/fetchFromApi';
import useToastMutation from '../../../util/useToastMutation';

export const deleteMeeting = async (meetingId: string) => {
  return fetchFromApi<DeleteMeeting>(axios.delete(`/meetings/${meetingId}`));
};

export const useDeleteMeeting = (
  onSuccess: () => void,
  onError: (error: unknown, variables: string) => void
) => {
  return useToastMutation<string>(deleteMeeting, {
    queryKey: () => [...eventKey],
    onSuccess,
    onError,
    pendingMessage: 'Deleting meeting...',
    successMessage: 'Meeting deleted!',
    errorMessage: 'Failed to delete meeting',
  });
};
