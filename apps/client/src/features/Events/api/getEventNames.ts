import { IEventName } from '@zoom-conference-manager/types';
import { useQuery } from 'react-query';
import { axios } from '../../../config/axios';

export const eventNamesKey = ['events', 'names'];

export const getEventNames = (): Promise<IEventName[]> => {
  return axios.get('/event');
};

export const useAllEvents = () => {
  return useQuery(eventNamesKey, getEventNames);
};
