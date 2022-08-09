import { GetAllZoomUsers } from '@zoom-conference-manager/api-interfaces';
import { useQuery } from 'react-query';
import { axios } from '../../../config/axios';
import fetchFromApi from '../../../util/fetchFromApi';

export const allZoomUsersKey = ['zoomUsers'];

export const getAllZoomUsers = () => {
  return fetchFromApi<GetAllZoomUsers>(axios.get('/zoom-users'));
};

export const useAllZoomUsers = () => {
  return useQuery(allZoomUsersKey, getAllZoomUsers);
};
