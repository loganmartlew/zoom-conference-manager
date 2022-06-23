import { GetEventNames } from '@zoom-conference-manager/api-interfaces';
import { useQuery } from 'react-query';
import { axios } from '../../../config/axios';
import fetchFromApi from '../../../util/fetchFromApi';

export const eventNamesKey = ['events', { type: 'names' }];

export const getEventNames = () => {
  return fetchFromApi<GetEventNames>(axios.get('/events'));
};

export const useEventNames = () => {
  return useQuery(eventNamesKey, getEventNames);
};
