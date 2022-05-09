import { IEvent } from '@zoom-conference-manager/types';
import { useQuery } from 'react-query';
import { axios } from '../../../config/axios';

export const getAllEvents = (): Promise<IEvent[]> => {
  return axios.get('/event');
};

export const useAllEvents = () => {
  return useQuery(['events'], getAllEvents);
};
