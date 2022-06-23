import { IEvent } from '@zoom-conference-manager/api-interfaces';
import { useQuery } from 'react-query';
import { axios } from '../../../config/axios';

export const allEventsKey = ['events'];

export const getAllEvents = (): Promise<IEvent[]> => {
  return axios.get('/event');
};

export const useAllEvents = () => {
  return useQuery(allEventsKey, getAllEvents);
};
