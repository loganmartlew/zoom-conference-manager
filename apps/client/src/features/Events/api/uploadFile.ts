import { UploadFile } from '@zoom-conference-manager/api-interfaces';
import { useMutation, useQueryClient } from 'react-query';
import { axios } from '../../../config/axios';
import { eventKey } from './getEvent';
import fetchFromApi from '../../../util/fetchFromApi';

export interface FileUploadData {
  file: File;
  eventId: string;
}

export const uploadFile = async (data: FileUploadData) => {
  const formData = new FormData();
  formData.append('excelFile', data.file);
  return fetchFromApi<UploadFile>(
    axios.post(`/events/${data.eventId}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  );
};

export const useUploadFile = (
  onSuccess: () => void,
  onError: (error: unknown, variables: FileUploadData) => void
) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(uploadFile, {
    onSuccess,
    onError,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSettled: (_: any, __: any, data: FileUploadData) => {
      queryClient.invalidateQueries([...eventKey, data.eventId]);
    },
  });

  return { mutate, isLoading };
};
