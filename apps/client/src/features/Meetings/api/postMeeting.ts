import {
  CreateMeeting,
  MeetingDTO,
} from '@zoom-conference-manager/api-interfaces';
import { useMutation, useQueryClient } from 'react-query';
import { axios } from '../../../config/axios';
import { allEventsKey } from '../../Events/api/getEvents';

export const postMeeting = async (meetingData: MeetingDTO) => {
  return (
    axios.post('/meetings', { meetingData }) as ReturnType<CreateMeeting>
  ).then((res) => {
    if (!res.data) {
      throw new Error();
    }

    return res.data;
  });
};

export const usePostMeeting = (
  onSuccess: () => void,
  onError: (error: unknown, variables: MeetingDTO) => void
) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(postMeeting, {
    onSuccess,
    onError,
    onSettled: () => {
      queryClient.invalidateQueries(allEventsKey);
    },
  });

  return { mutate, isLoading };
};
