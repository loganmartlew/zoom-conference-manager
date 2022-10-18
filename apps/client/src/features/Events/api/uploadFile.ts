import { UploadFile } from '@zoom-conference-manager/api-interfaces';
import { axios } from '../../../config/axios';
import { eventKey } from './getEvent';
import fetchFromApi from '../../../util/fetchFromApi';
import useToastMutation from '../../../util/useToastMutation';

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
  return useToastMutation<FileUploadData>(uploadFile, {
    queryKey: (vars) => [...eventKey, vars.eventId],
    onSuccess,
    onError,
    pendingMessage: 'Uploading file...',
    successMessage: 'File uploaded!',
    errorMessage: 'Failed to upload file',
  });
};
