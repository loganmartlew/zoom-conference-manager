import { GetEventNames } from '@zoom-conference-manager/api-interfaces';
import { useQuery } from 'react-query';
import { axios } from '../../../config/axios';

export const eventNamesKey = ['events', { type: 'names' }];

export const getEventNames = () => {
  return (axios.get('/events') as ReturnType<GetEventNames>).then((res) => {
    if (!res.data) {
      throw new Error();
    }

    return res.data;
  });
};

export const useEventNames = () => {
  return useQuery(eventNamesKey, getEventNames);
};
