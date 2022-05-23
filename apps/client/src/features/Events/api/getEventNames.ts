import { IEventName } from '@zoom-conference-manager/types';
import { useQuery } from 'react-query';
import { axios } from '../../../config/axios';

export const eventNamesKey = ['events', { type: 'names' }];

export const getEventNames = (): Promise<IEventName[]> => {
  return axios.get('/event');
};

export const useEventNames = () => {
  return useQuery(eventNamesKey, getEventNames);
};
