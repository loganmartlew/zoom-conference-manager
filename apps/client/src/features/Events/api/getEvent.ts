import { IEvent } from '@zoom-conference-manager/types';
import { useQuery } from 'react-query';
import { axios } from '../../../config/axios';

export const allEventsKey = ['events'];

export const getEvent = (id: string): Promise<{ event: IEvent }> => {
  return axios.get(`/event/${id}`);
};

export const useEvent = (id: string) => {
  return useQuery(allEventsKey, () => getEvent(id));
};
