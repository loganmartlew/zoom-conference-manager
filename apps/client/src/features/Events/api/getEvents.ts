import { GetAllEvents } from '@zoom-conference-manager/api-interfaces';
import { useQuery } from 'react-query';
import { axios } from '../../../config/axios';

export const allEventsKey = ['events'];

export const getAllEvents = () => {
  return (axios.get('/events') as ReturnType<GetAllEvents>).then((res) => {
    if (!res.data) {
      throw new Error();
    }

    return res.data;
  });
};

export const useAllEvents = () => {
  return useQuery(allEventsKey, getAllEvents);
};
