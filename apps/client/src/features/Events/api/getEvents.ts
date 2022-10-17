import { GetAllEvents } from '@zoom-conference-manager/api-interfaces';
import { useQuery } from 'react-query';
import { axios } from '../../../config/axios';
import fetchFromApi from '../../../util/fetchFromApi';

export const allEventsKey = ['events'];

export const getAllEvents = () => {
  return fetchFromApi<GetAllEvents>(axios.get('/events'));
};

export const useAllEvents = () => {
  return useQuery(allEventsKey, getAllEvents);
};
