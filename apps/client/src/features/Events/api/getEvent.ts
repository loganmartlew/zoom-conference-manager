import { IEvent, IMeeting } from '@zoom-conference-manager/types';
import { useQuery } from 'react-query';
import { axios } from '../../../config/axios';

export const eventKey = ['event'];

export const getEvent = (id: string): Promise<{ event: IEvent }> => {
  return axios.get<{ event: IEvent }>(`/event/${id}`).then((res) => {
    const data = res as unknown as { event: IEvent };
    const parsedMeetings: IMeeting[] = data.event.meetings.map(
      (meeting: IMeeting) => ({
        ...meeting,
        startDateTime: new Date(meeting.startDateTime),
      })
    );

    return { event: { ...data.event, meetings: parsedMeetings } };
  });
};

export const useEvent = (id: string) => {
  return useQuery([...eventKey, id], () => getEvent(id));
};
