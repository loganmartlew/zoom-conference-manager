import {
  GetEvent,
  IEvent,
  IMeeting,
} from '@zoom-conference-manager/api-interfaces';
import { useQuery } from 'react-query';
import { axios } from '../../../config/axios';
import fetchFromApi from '../../../util/fetchFromApi';

export const eventKey = ['event'];

export const getEvent = (id: string) => {
  return fetchFromApi<GetEvent>(axios.get(`/events/${id}`)).then(
    (event): IEvent => {
      const parsedMeetings: IMeeting[] = event.meetings.map(
        (meeting: IMeeting) => ({
          ...meeting,
          startDateTime: new Date(meeting.startDateTime),
        })
      );

      return { ...event, meetings: parsedMeetings };
    }
  );
};

export const useEvent = (id: string) => {
  return useQuery([...eventKey, id], () => getEvent(id));
};
